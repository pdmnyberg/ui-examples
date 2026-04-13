"use client"

import { useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useData } from "../../contexts";
import { EntityRef } from "@/app/common";
import { ColumnSpec, DataSpec, VerticalTable } from "@/components/Table";
import { DatasetFile } from "../../types";
import { ActionDropDown } from "@/components/ActionDropDown";
import Alert from "@/components/Alert";

type DatasetFileTable = DataSpec<DatasetFile & {datasetId: string}>;

function EntryViewBase() {
  const searchParams = useSearchParams();
  const {files} = useData();
  const fileId = searchParams.get("entryId")
  if (!fileId) {
    notFound();
  }
  const fileRef: EntityRef<"dataset-file"> = {id: fileId, type: "dataset-file"};
  const file = files.get(fileRef);
  const fileEntry: DatasetFileTable = {
    id: file.id,
    datasetId: <Link href={`/sdad/datasets/entry/?entryId=${file.dataset.id}`}>{file.dataset.id}</Link>,
    checksums: file.checksums.join(", "),
    filePath: file.filePath,
    downloadUrl: <Link href={file.downloadUrl}>Download</Link>,
    decryptedSize: `${file.decryptedSize} bytes`,
  }

  const datasetFileColumns: ColumnSpec<DatasetFile & {datasetId: string}> = {
    id: "File",
    filePath: "File path",
    decryptedSize: "Decrypted size",
    downloadUrl: "Download",
    checksums: "Checksums",
    datasetId: "Dataset",
  };

  return (
    <div className="container">
      <h2>File {file.id}</h2>
      <h3>Properties</h3>
      <div className="input-group mb-3">
        <span className="input-group-text flex-grow-1" >Get file {file.id}</span>
        <ActionDropDown label="File actions" items={[{label: "Download file", action: () => {}}, {label: "Download checksums", action: () => {}}]}/>
      </div>
      <VerticalTable items={[fileEntry]} columns={datasetFileColumns} param="Param"/>
      <h3>Partial download</h3>
      <Alert type="warning">TODO: Allow selecting a subset of a file.</Alert>
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
