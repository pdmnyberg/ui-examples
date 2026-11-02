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

const getRingType = async ([api, type, typeId]: [DataAPI, "ringTypes", string]) => await api[type].get({id: typeId, type: "ring-type"})

const getRingOrder = async ([api, type, seriesId]: [DataAPI, "ringOrders", string]) => await api[type].get({id: seriesId, type: "ring-order"})

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
  const {data: ringType, isLoading: isLoadingType} = useSWR(
    [api, "ringTypes", entry?.ringType.id],
    getRingType,
  );
  const {data: ringOrder, isLoading: isLoadingRingSeries} = useSWR(
    [api, "ringOrders", entry?.order.id],
    getRingOrder,
  );
  if (isLoading || isLoadingRingSeries || isLoadingType) return (
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
    status: entry.status,
    manufacturer: ringOrder?.manufacturer ?? "-",
    order: ringOrder ? <Link href={`/bird-ringing/ring-series-view/?entryId=${ringOrder.id}`}>{ringOrder.identifier}</Link> : "-",
    ringType: ringType ? <Link href={`/bird-ringing/ring-type-view/?entryId=${ringType.id}`}>{ringType.code}</Link> : "-",
    changedAt: entry.changedAt,
  }
  const entryColumns: ColumnSpec<Ring & SummaryData> = {
    identifier: "Identifier",
    status: "Status",
    manufacturer: "Manufacturer",
    order: "Order",
    ringType: "Ring type",
    changedAt: "Changed at",
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
