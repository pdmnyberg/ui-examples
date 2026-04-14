"use client"

import { useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useData } from "../../contexts";
import { EntityRef, toLocalDate } from "@/app/common";
import { Pagination, usePagination } from "@/components/Pagination";
import { ColumnSpec, DataSpec, Table, VerticalTable } from "@/components/Table";
import { Dataset, DatasetFile } from "../../types";
import { TypedSearchableItem, useFilter, useItemSelections } from "@/app/hooks";
import { ActionDropDown } from "@/components/ActionDropDown";

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
  const datasetFiles = files.find({properties: {dataset: datasetRef}}).map<TypedSearchableItem<DatasetFile>>((f) => ({
    id: f.id,
    properties: {
      id: {
        term: f.id,
        component: <Link href={`/sdad/datasets/file/?entryId=${f.id}`}>{f.id}</Link>,
      },
      filePath: {
        term: f.filePath,
        component: <span className="text-nowrap">{f.filePath}</span>,
      },
      decryptedSize: {
        term: `${f.decryptedSize} bytes`,
        component: `${f.decryptedSize} bytes`,
      },
      downloadUrl: {
        term: "",
        component: <Link href={f.downloadUrl}>Download</Link>
      },
      checksums: {
        term: f.checksums.join(", "),
        component: f.checksums.join(", "),
      }
    }
  }));
  const datasetEntry: DatasetTable = {
    id: dataset.id,
    datasetId: <Link href={`/sdad/datasets/entry/?entryId=${dataset.id}`}>{dataset.id}</Link>,
    date: toLocalDate(new Date(dataset.date)),
    files: String(dataset.files),
    size: String(dataset.size),
  }

  const datasetFileColumns: ColumnSpec<DatasetFile & {select: string}> = {
    select: "",
    id: "File",
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

  const {filter, setFilter, filteredItems} = useFilter(datasetFiles)
  const {
    selectedItems,
    toggleItems,
    allSelected,
    handleItemSelection
  } = useItemSelections(new Set(filteredItems.map(r => r.id)));

  const filesPagination = usePagination(filteredItems, 30);

  const selectablePageItems = filesPagination.items.map(item => ({
    ...item,
    properties: {
      ...item.properties,
      select: {
        component: <input type="checkbox" onChange={handleItemSelection} checked={selectedItems.has(item.id)} data-actor-id={item.id}/>
      },
    }
  }))
  
  return (
    <div className="container">
      <h2>Dataset {dataset.id}</h2>
      <h3>Properties</h3>
      <div className="input-group mb-3">
        <span className="input-group-text flex-grow-1" >Get dataset {dataset.id}</span>
        <ActionDropDown label="Dataset actions" items={[{label: "Download dataset", action: () => {}}, {label: "Download dataset checksums", action: () => {}}]}/>
      </div>
      <VerticalTable items={[datasetEntry]} columns={datasetColumns} param="Param"/>
      <h3>Files</h3>
      <div className="input-group mb-3">
        <span className="input-group-text">Filter</span>
        <input
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="form-control"
          placeholder={Object.values(datasetFileColumns).filter(c => !!c).join(", ")}
          aria-label="Filter for actor table"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3">
        <button className="btn btn-outline-secondary" type="button" onClick={toggleItems}>{allSelected ? "Select None" : "Select All"}</button>
        <span className="input-group-text flex-grow-1" >{selectedItems.size} of {datasetFiles.length} selected</span>
        <ActionDropDown label="File actions" items={[{label: "Download files", action: () => {}}, {label: "Download file checksums", action: () => {}}]}/>
      </div>
      <Pagination pages={filesPagination.pages} currentPage={filesPagination.currentPage}/>
      <Table items={selectablePageItems} columns={datasetFileColumns} />
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
