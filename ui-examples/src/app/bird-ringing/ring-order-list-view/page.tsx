"use client"
import Link from "next/link";
import Warning from "../warning";
import { TypedSearchableItem } from "../../hooks";
import { useDataAPI } from "../contexts";
import { DataAPI, RingOrder, toRecord } from "../common";
import { ColumnSpec } from "@/components/Table";
import { FilterableTable } from "@/components/FilterableTable";
import useSWR from "swr";

type SummaryProps = {
  identifier: string;
  manufacturer: string;
  order: string;
}

export default function ListView() {
  const api = useDataAPI();
  const {data: orders} = useSWR(
    [api, "ringOrders", {}],
    async ([api, type]: [DataAPI, "ringOrders"]) => await api[type].list(),
    {fallbackData: []}
  );

  const {data: ringTypeMap, isLoading: isLoadingRingTypeMap} = useSWR(
    [api, "ringTypes"],
    async ([api, type]: [DataAPI, "ringTypes"]) => toRecord(await api[type].list()),
    {fallbackData: {}}
  )

  const items = isLoadingRingTypeMap ? [] : orders.map<TypedSearchableItem<RingOrder & SummaryProps>>(item => {
    return {
      id: item.id,
      properties: {
        identifier: {
          term: item.identifier,
          component: isLoadingRingTypeMap ? "-" : <Link href={`/bird-ringing/ring-order-view/?entryId=${item.id}`} className="all-spaces">{item.identifier}</Link>
        },
        status: {
          term: item.status,
          component: item.status
        },
        manufacturer: {
          term: item.manufacturer,
          component: item.manufacturer,
        },
        ringType: {
          term: isLoadingRingTypeMap ? "" : ringTypeMap[item.ringType.id].code,
          component: isLoadingRingTypeMap ? "-" : <Link href={`/bird-ringing/ring-type-view/?entryId=${item.ringType.id}`}>{ringTypeMap[item.ringType.id].code}</Link>,
        },
      }
    }
  });

  const columns: ColumnSpec<RingOrder & SummaryProps> = {
    id: "",
    identifier: "Identifier",
    status: "Status",
    ringType: "Type",
    manufacturer: "Manufacturer",
  }
  
  return (
    <div className="container">
      <Warning><span/></Warning>
      <h2>Ring List View</h2>
      <FilterableTable
        items={items}
        columns={columns}
        filterLabel="Filter for ring table"
        sorting={(a, b) => a.properties.manufacturer.term.localeCompare(b.properties.manufacturer.term)}
      />
    </div>
  )
}
