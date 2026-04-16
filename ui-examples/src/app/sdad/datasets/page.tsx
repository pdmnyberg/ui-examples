"use client"

import { ColumnSpec, Table } from "@/components/Table";
import React, { useState } from "react";
import { useData } from "../contexts";
import { Pagination, usePagination } from "@/components/Pagination";
import Link from "next/link";
import { toLocalDate } from "@/app/common";
import { Dataset } from "../types";
import { TypedSearchableItem, useFilter } from "@/app/hooks";
import { CardList } from "@/components/CardList";

function getDatasetHref(id: string) {
  return `/sdad/datasets/entry/?entryId=${id}`;
}

type ViewMode = "grid" | "list";

export default function Datasets() {
  const {datasets} = useData();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const viewModes: {mode: ViewMode, icon: string}[]  = [
    {
      mode: "grid",
      icon: "grid",
    },
    {
      mode: "list",
      icon: "list-ul"
    }
  ]
  const datasetItems = datasets.all().map<TypedSearchableItem<Dataset & {datasetId: string}> & {href: string}>(dataset => ({
    id: dataset.id,
    href: getDatasetHref(dataset.id),
    properties: {
      datasetId: {
        term: dataset.id,
        component: <Link href={getDatasetHref(dataset.id)}>{dataset.id}</Link>,
      },
      date: {
        term: toLocalDate(new Date(dataset.date)),
        component: toLocalDate(new Date(dataset.date)),
      },
      files: {
        term: String(dataset.files),
        component: String(dataset.files),
      },
      size: {
        term: String(dataset.size),
        component: String(dataset.size),
      }
    }
  }));

  const datasetColumns: ColumnSpec<Dataset & {datasetId: string}> = {
    datasetId: "Dataset ID",
    date: "Date",
    files: "Number of files",
    size: "Dataset size",
  };
  const {filter, setFilter, filteredItems} = useFilter(datasetItems)
  const datasetPagination = usePagination(filteredItems, 30)
  return (
    <>
      <h2>Datasets</h2>
      <div className="input-group mb-3">
        <span className="input-group-text">Filter</span>
        <input
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="form-control"
          placeholder={Object.values(datasetColumns).filter(c => !!c).join(", ")}
          aria-label="Filter for actor table"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text flex-grow-1" >Viewing {filteredItems.length} of {datasetItems.length}</span>
      </div>
      <div className="btn-group mb-3">
        {viewModes.map(vm => (
          <a key={vm.mode} onClick={() => setViewMode(vm.mode)} className={`btn btn-primary ${vm.mode === viewMode ? "active" : ""}`} aria-current="page"><i className={`bi bi-${vm.icon}`}></i></a>
        ))}
      </div>
      <Pagination pages={datasetPagination.pages} currentPage={datasetPagination.currentPage}/>
      {viewMode === "grid" ? <CardList items={datasetPagination.items} rows={datasetColumns} labelKey="id" /> : <Table items={datasetPagination.items} columns={datasetColumns} />}
      <Pagination pages={datasetPagination.pages} currentPage={datasetPagination.currentPage}/>
    </>
  )
}