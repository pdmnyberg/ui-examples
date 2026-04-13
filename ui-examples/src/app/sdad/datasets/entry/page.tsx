"use client"

import { useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useData } from "../../contexts";
import { EntityRef, toLocalDate } from "@/app/common";
import { Pagination, usePagination } from "@/components/Pagination";
import { ColumnSpec, DataSpec, Table, VerticalTable } from "@/components/Table";
import { Dataset, DatasetFile } from "../../types";

type DatasetFileTable = DataSpec<DatasetFile>;
type DatasetTable = DataSpec<Dataset & {datasetId: string}>;

function EntryViewBase() {
  const searchParams = useSearchParams();
  const {datasets, files} = useData();
  const datasetId = searchParams.get("entryId")
  if (!datasetId) {
    notFound();
  }
  const datasetRef: EntityRef<"dataset"> = {id: datasetId, type: "dataset"};
  const dataset = datasets.get(datasetRef);
  const datasetFiles = files.find({properties: {dataset: datasetRef}}).map<DatasetFileTable>((f) => ({
    id: f.id,
    filePath: f.filePath,
    decryptedSize: `${f.decryptedSize} bytes`,
    downloadUrl: <Link href={f.downloadUrl}>Download</Link>,
    checksums: f.checksums.join(", ")
  }));
  const datasetEntry: DatasetTable = {
    id: dataset.id,
    datasetId: <Link href={`/sdad/datasets/entry/?entryId=${dataset.id}`}>{dataset.id}</Link>,
    date: toLocalDate(new Date(dataset.date)),
    files: String(dataset.files),
    size: String(dataset.size),
  }

  const filesPagination = usePagination(datasetFiles, 30);
  const datasetFileColumns: ColumnSpec<DatasetFile> = {
    filePath: "File path",
    decryptedSize: "Decrypted size",
    downloadUrl: "Download",
    checksums: "Checksums"
  };
  const datasetColumns: ColumnSpec<Dataset & {datasetId: string}> = {
    datasetId: "Dataset ID",
    date: "Date",
    files: "Number of files",
    size: "Dataset size",
  };
  
  return (
    <div className="container">
      <h2>Dataset {dataset.id}</h2>
      <h3>Properties</h3>
      <VerticalTable items={[datasetEntry]} columns={datasetColumns} param="Param"/>
      <h3>Files</h3>
      <Pagination pages={filesPagination.pages} currentPage={filesPagination.currentPage}/>
      <Table items={filesPagination.items} columns={datasetFileColumns} />
      <Pagination pages={filesPagination.pages} currentPage={filesPagination.currentPage}/>
    </div>
  )
}

export default function EntryView() {
  return (
    <Suspense fallback={<span />}>
      <EntryViewBase />
    </Suspense>
  )
}
