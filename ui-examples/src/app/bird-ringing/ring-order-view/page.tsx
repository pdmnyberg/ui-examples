"use client"
import { DataAPI, ringIdentifier, RingOrder } from "../common";
import Warning from "../warning";
import { useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import { useDataAPI } from "../contexts";
import { ColumnSpec, DataSpec, VerticalTable } from "@/components/Table";
import useSWR from "swr";
import Link from "next/link";

const getRingOrder = async ([api, type, typeId]: [DataAPI, "ringOrders", string]) => await api[type].get({id: typeId, type: "ring-order"})

const getRingType = async ([api, type, typeId]: [DataAPI, "ringTypes", string]) => await api[type].get({id: typeId, type: "ring-type"})

const getRingSeries = async ([api, type, typeId]: [DataAPI, "ringSeries", string]) => await api[type].get({id: typeId, type: "ring-series"})

function EntryViewBase() {
  const searchParams = useSearchParams();
  const api = useDataAPI();
  const entryId = searchParams.get("entryId")
  if (!entryId) {
    notFound();
  }
  const {data: entry, isLoading: isLoading} = useSWR(
    [api, "ringOrders", entryId],
    getRingOrder,
  );
  const {data: ringType, isLoading: isLoadingType} = useSWR(
    [api, "ringTypes", entry?.ringType.id],
    getRingType,
  );
  const {data: ringSeries, isLoading: isLoadingSeries} = useSWR(
    [api, "ringSeries", entry?.ringSeries.id],
    getRingSeries,
  );
  if (isLoading || isLoadingType || isLoadingSeries) return (
    <div className="container">
      <h2>Ring order view</h2>
      <p>Loading...</p>
    </div>
  );
  if (!entry) {
    notFound();
  }

  const entryData: DataSpec<RingOrder> = {
    id: entry.id,
    identifier: entry.identifier,
    status: entry.status,
    manufacturer: entry.manufacturer,
    ringType: ringType ? <Link href={`/bird-ringing/ring-type-view/?entryId=${ringType.id}`}>{ringType.code}</Link> : "-",
    ringSeries: ringSeries ? <Link href={`/bird-ringing/ring-series-view/?entryId=${ringSeries.id}`}>{ringIdentifier(0, ringSeries)}</Link> : "-",
    changedAt: entry.changedAt
  }

  const entryColumns: ColumnSpec<RingOrder> = {
    identifier: "Identifier",
    status: "Status",
    manufacturer: "Manufacturer",
    ringType: "Ring type",
    ringSeries: "Ring series",
    changedAt: "Changed at"
  };

  return (
    <div className="container">
      <Warning><span/></Warning>
      <h2>Ring order view</h2>
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
