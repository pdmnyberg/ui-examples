"use client"

import { ColumnSpec, DataSpec, Table } from "@/components/Table";
import React from "react";
import { useData } from "../contexts";
import { Pagination, usePagination } from "@/components/Pagination";
import Link from "next/link";
import { toLocalDate } from "@/app/common";
import { Dataset } from "../types";

type DatasetTable = DataSpec<Dataset & {datasetId: string}>;

export default function Datasets() {
  const {datasets} = useData();
  const datasetItems = datasets.all().map<DatasetTable>(dataset => ({
    id: dataset.id,
    datasetId: <Link href={`/sdad/datasets/entry/?entryId=${dataset.id}`}>{dataset.id}</Link>,
    date: toLocalDate(new Date(dataset.date)),
    files: String(dataset.files),
    size: String(dataset.size),
  }));

  const datasetColumns: ColumnSpec<Dataset & {datasetId: string}> = {
    datasetId: "Dataset ID",
    date: "Date",
    files: "Number of files",
    size: "Dataset size",
  };
  const datasetPagination = usePagination(datasetItems, 30)
  return (
    <>
      <h2>Datasets</h2>
      <Pagination pages={datasetPagination.pages} currentPage={datasetPagination.currentPage}/>
      <Table items={datasetPagination.items} columns={datasetColumns} />
      <Pagination pages={datasetPagination.pages} currentPage={datasetPagination.currentPage}/>
    </>
  )
}