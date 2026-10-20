"use client"
import { toLocalTime, Ring, RingEvent } from "../common";
import Warning from "../warning";
import { useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useDataSource } from "../contexts";
import { ColumnSpec, DataSpec, VerticalTable } from "@/components/Table";
import { FilterableTable } from "@/components/FilterableTable";
import { TypedSearchableItem } from "@/app/hooks";

type SummaryData = {
  manufacturer: string;
  series: string;
}

function EntryViewBase() {
  const searchParams = useSearchParams();
  const dataSource = useDataSource();
  const entryId = searchParams.get("entryId")
  if (!entryId) {
    notFound();
  }
  const {data: entry, isLoading} = dataSource.getRing({id: entryId})
  if (isLoading) return (
    <div className="container">
      <h2>License view</h2>
      <p>Loading...</p>
    </div>
  );
  if (!entry) {
    notFound();
  }

  const ringSeries = dataSource.getRingSeries(entry.ringSeries);
  const entryData: DataSpec<Ring & SummaryData> = {
    id: entry.id,
    identifier: entry.identifier,
    manufacturer: ringSeries.manufacturer,
    series: <Link href={`/bird-ringing/ring-series-view/?entryId=${ringSeries.id}`}>{ringSeries.identifier}</Link>,
  }
  const entryColumns: ColumnSpec<Ring & SummaryData> = {
    identifier: "Identifier",
    manufacturer: "Manufacturer",
    series: "Series",
  };

  const ringEvents = dataSource.getRingEvents(entry);
  const eventColumns: ColumnSpec<RingEvent> = {
    status: "Status",
    timestamp: "Time"
  };
  const eventData = ringEvents.map<TypedSearchableItem<RingEvent>>((event, index) => ({
    id: String(index),
    properties: {
      status: {
        term: event.status,
        component: event.status,
      },
      timestamp: {
        term: toLocalTime(event.timestamp),
        component: toLocalTime(event.timestamp),
      },
    }
  }))
  return (
    <div className="container">
      <Warning><span/></Warning>
      <h2>Ring view</h2>
      <VerticalTable items={[entryData]} columns={entryColumns} param="Param"/>
      <h2>Events</h2>
      <FilterableTable items={eventData} columns={eventColumns} filterLabel="Filter events"/>
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
