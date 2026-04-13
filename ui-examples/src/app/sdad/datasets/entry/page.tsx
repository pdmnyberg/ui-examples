"use client"

import { useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useData } from "../../contexts";
import { EntityRef } from "@/app/common";
import { Pagination, usePagination } from "@/components/Pagination";
import { ColumnSpec, DataSpec, Table } from "@/components/Table";
import { DatasetFile } from "../../types";

type DatasetFileTable = DataSpec<DatasetFile>;

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

  const filesPagination = usePagination(datasetFiles, 30);
  const datasetColumns: ColumnSpec<DatasetFile> = {
    filePath: "File path",
    decryptedSize: "Decrypted size",
    downloadUrl: "Download",
    checksums: "Checksums"
  };
  
  return (
    <div className="container">
      <h2>Dataset {dataset.id}</h2>
      <h3>Properties</h3>
      <h3>Files</h3>
      <Pagination pages={filesPagination.pages} currentPage={filesPagination.currentPage}/>
      <Table items={filesPagination.items} columns={datasetColumns} />
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
