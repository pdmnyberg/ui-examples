"use client"
import { Ring, DataAPI } from "../common";
import Warning from "../warning";
import { useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useDataAPI } from "../contexts";
import { ColumnSpec, DataSpec, VerticalTable } from "@/components/Table";
import useSWR from "swr";

type SummaryData = {
  manufacturer: string;
  series: string;
}

const getRing = async ([api, type, entryId]: [DataAPI, "rings", string]) => await api[type].get({id: entryId, type: "ring"})

const getRingSeries = async ([api, type, seriesId]: [DataAPI, "ringSeries", string]) => await api[type].get({id: seriesId, type: "ring-series"})

function EntryViewBase() {
  const searchParams = useSearchParams();
  const api = useDataAPI();
  const entryId = searchParams.get("entryId")
  if (!entryId) {
    notFound();
  }
  const {data: entry, isLoading} = useSWR(
    [api, "rings", entryId],
    getRing,
  );
  const {data: ringSeries, isLoading: isLoadingRingSeries} = useSWR(
    [api, "ringSeries", entry?.ringSeries.id],
    getRingSeries,
  );
  if (isLoading || isLoadingRingSeries) return (
    <div className="container">
      <h2>License view</h2>
      <p>Loading...</p>
    </div>
  );
  if (!entry) {
    notFound();
  }

  const entryData: DataSpec<Ring & SummaryData> = {
    id: entry.id,
    identifier: entry.identifier,
    manufacturer: ringSeries?.manufacturer ?? "-",
    series: ringSeries ? <Link href={`/bird-ringing/ring-series-view/?entryId=${ringSeries.id}`}>{ringSeries.identifier}</Link> : "-",
  }
  const entryColumns: ColumnSpec<Ring & SummaryData> = {
    identifier: "Identifier",
    manufacturer: "Manufacturer",
    series: "Series",
  };

  return (
    <div className="container">
      <Warning><span/></Warning>
      <h2>Ring view</h2>
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
