"use client"

import { ColumnSpec, Table } from "@/components/Table";
import React from "react";
import { useData } from "../contexts";
import { Pagination, usePagination } from "@/components/Pagination";
import Link from "next/link";
import { toLocalDate } from "@/app/common";
import { Dataset } from "../types";
import { TypedSearchableItem, useFilter } from "@/app/hooks";


export default function Datasets() {
  const {datasets} = useData();
  const datasetItems = datasets.all().map<TypedSearchableItem<Dataset & {datasetId: string}>>(dataset => ({
    id: dataset.id,
    properties: {
      datasetId: {
        term: dataset.id,
        component: <Link href={`/sdad/datasets/entry/?entryId=${dataset.id}`}>{dataset.id}</Link>,
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
      <Pagination pages={datasetPagination.pages} currentPage={datasetPagination.currentPage}/>
      <Table items={datasetPagination.items} columns={datasetColumns} />
      <Pagination pages={datasetPagination.pages} currentPage={datasetPagination.currentPage}/>
    </>
  )
}