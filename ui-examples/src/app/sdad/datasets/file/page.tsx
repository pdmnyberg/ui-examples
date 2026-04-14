"use client"

import { useSearchParams, notFound } from "next/navigation";
import { Suspense, useId } from "react";
import Link from "next/link";
import { useData } from "../../contexts";
import { EntityRef } from "@/app/common";
import { ColumnSpec, DataSpec, VerticalTable } from "@/components/Table";
import { DatasetFile } from "../../types";
import { ActionDropDown } from "@/components/ActionDropDown";

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
  const startId = useId();
  const endId = useId()

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
      <form>
        <label htmlFor={startId}>Select a range for a partial download:</label>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor={startId}>Start position</label>
          <input type="number" className="form-control" id={startId} placeholder="0" aria-label="Start" />
          <label className="input-group-text" htmlFor={endId}>End position</label>
          <input type="number" className="form-control" id={endId} placeholder={String(file.decryptedSize)} aria-label="End" />
        </div>
        <button type="submit" className="btn btn-primary">Download</button>
      </form>
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
