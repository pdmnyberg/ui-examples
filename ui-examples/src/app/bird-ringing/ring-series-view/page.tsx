"use client"
import { DataAPI, ringIdentifier, RingSeries } from "../common";
import Warning from "../warning";
import { useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import { useDataAPI } from "../contexts";
import { ColumnSpec, DataSpec, VerticalTable } from "@/components/Table";
import useSWR from "swr";

const getRingSeries = async ([api, type, seriesId]: [DataAPI, "ringSeries", string]) => await api[type].get({id: seriesId, type: "ring-series"})

type SummaryProps = {
  identifier: string;
}


function EntryViewBase() {
  const searchParams = useSearchParams();
  const api = useDataAPI();
  const entryId = searchParams.get("entryId")
  if (!entryId) {
    notFound();
  }
  const {data: entry, isLoading: isLoading} = useSWR(
    [api, "ringSeries", entryId],
    getRingSeries,
  );
  if (isLoading) return (
    <div className="container">
      <h2>Ring series view</h2>
      <p>Loading...</p>
    </div>
  );
  if (!entry) {
    notFound();
  }

  const entryData: DataSpec<RingSeries & SummaryProps> = {
    id: entry.id,
    identifier: ringIdentifier(0, entry),
    prefix: entry.prefix,
    numberOfDigits: entry.numberOfDigits,
    fillerStyle: entry.fillerStyle,
    color: entry.color,
    hasWebAddress: entry.hasWebAddress,
  }
  const entryColumns: ColumnSpec<RingSeries & SummaryProps> = {
    identifier: "Identifier",
    prefix: "Prefix",
    numberOfDigits: "Number of digits",
    fillerStyle: "Filler style",
    color: "Color",
    hasWebAddress: "Has web address",
  };

  return (
    <div className="container">
      <Warning><span/></Warning>
      <h2>Ring series view</h2>
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
