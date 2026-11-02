"use client"
import { DataAPI, RingType } from "../common";
import Warning from "../warning";
import { useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import { useDataAPI } from "../contexts";
import { ColumnSpec, DataSpec, VerticalTable } from "@/components/Table";
import useSWR from "swr";

const getRingType = async ([api, type, typeId]: [DataAPI, "ringTypes", string]) => await api[type].get({id: typeId, type: "ring-type"})

function EntryViewBase() {
  const searchParams = useSearchParams();
  const api = useDataAPI();
  const entryId = searchParams.get("entryId")
  if (!entryId) {
    notFound();
  }
  const {data: entry, isLoading: isLoading} = useSWR(
    [api, "ringTypes", entryId],
    getRingType,
  );
  if (isLoading) return (
    <div className="container">
      <h2>Ring type view</h2>
      <p>Loading...</p>
    </div>
  );
  if (!entry) {
    notFound();
  }

  const entryData: DataSpec<RingType> = {
    id: entry.id,
    code: entry.code,
    variant: entry.variant,
    material: entry.material,
    diameter: entry.diameter,
    prefix: entry.prefix,
    numberOfDigits: entry.numberOfDigits
  }
  const entryColumns: ColumnSpec<RingType> = {
    code: "Code",
    variant: "Variant",
    material: "Material",
    diameter: "Diameter",
    prefix: "Prefix",
    numberOfDigits: "Number of digits"
  };

  return (
    <div className="container">
      <Warning><span/></Warning>
      <h2>Ring type view</h2>
      <VerticalTable items={[entryData]} columns={entryColumns} param="Param"/>
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
