"use client"
import { Ring, DataAPI, ringIdentifier } from "../common";
import Warning from "../warning";
import { useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useDataAPI } from "../contexts";
import { ColumnSpec, DataSpec, VerticalTable } from "@/components/Table";
import useSWR from "swr";

type SummaryData = {
  manufacturer: string;
  identifier: string;
}

const getRing = async ([api, type, entryId]: [DataAPI, "rings", string]) => await api[type].get({id: entryId, type: "ring"})

const getRingType = async ([api, type, typeId]: [DataAPI, "ringTypes", string]) => await api[type].get({id: typeId, type: "ring-type"})

const getRingOrder = async ([api, type, orderId]: [DataAPI, "ringOrders", string]) => await api[type].get({id: orderId, type: "ring-order"})

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
  const {data: ringType, isLoading: isLoadingType} = useSWR(
    [api, "ringTypes", entry?.ringType.id],
    getRingType,
  );
  const {data: ringSeries, isLoading: isLoadingSeries} = useSWR(
    [api, "ringSeries", entry?.ringSeries.id],
    getRingSeries,
  );
  const {data: ringOrder, isLoading: isLoadingRingSeries} = useSWR(
    [api, "ringOrders", entry?.order.id],
    getRingOrder,
  );
  if (isLoading || isLoadingRingSeries || isLoadingType || isLoadingSeries) return (
    <div className="container">
      <h2>Ring view</h2>
      <p>Loading...</p>
    </div>
  );
  if (!entry) {
    notFound();
  }

  const entryData: DataSpec<Ring & SummaryData> = {
    id: entry.id,
    identifier: ringSeries ? <span className="all-spaces">{ringIdentifier(entry.number, ringSeries)}</span> : "-",
    status: entry.status,
    manufacturer: ringOrder?.manufacturer ?? "-",
    order: ringOrder ? <Link href={`/bird-ringing/ring-order-view/?entryId=${ringOrder.id}`}>{ringOrder.identifier}</Link> : "-",
    ringType: ringType ? <Link href={`/bird-ringing/ring-type-view/?entryId=${ringType.id}`}>{ringType.code}</Link> : "-",
    ringSeries: ringSeries ? <Link className="all-spaces" href={`/bird-ringing/ring-series-view/?entryId=${ringSeries.id}`}>{ringIdentifier(0, ringSeries)}</Link> : "-",
    changedAt: entry.changedAt,
  }
  const entryColumns: ColumnSpec<Ring & SummaryData> = {
    identifier: "Identifier",
    status: "Status",
    manufacturer: "Manufacturer",
    order: "Order",
    ringType: "Ring type",
    ringSeries: "Ring series",
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
