"use client"

import { useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useData } from "../../contexts";
import { EntityRef } from "@/app/common";


function EntryViewBase() {
  const searchParams = useSearchParams();
  const {datasets, files} = useData();
  const datasetId = searchParams.get("entryId")
  if (!datasetId) {
    notFound();
  }
  const datasetRef: EntityRef<"dataset"> = {id: datasetId, type: "dataset"};
  const dataset = datasets.get(datasetRef);
  const datasetFiles = files.find({properties: {dataset: datasetRef}})

  
  return (
    <div className="container">
      <h2>Dataset {dataset.id}</h2>
      <h3>Properties</h3>
      <h3>Files</h3>
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
