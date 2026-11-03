"use client"
import Link from "next/link";
import Warning from "../warning";
import { TypedSearchableItem } from "../../hooks";
import { useDataAPI } from "../contexts";
import { DataAPI, Ring, ringIdentifier, toRecord } from "../common";
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
  const {data: rings} = useSWR(
    [api, "rings", {}],
    async ([api, type]: [DataAPI, "rings"]) => await api[type].list(),
    {fallbackData: []}
  );
  const {data: ringOrderMap, isLoading: isLoadingRingSeriesMap} = useSWR(
    [api, "ringOrders"],
    async ([api, type]: [DataAPI, "ringOrders"]) => toRecord(await api[type].list()),
    {fallbackData: {}}
  )
  const {data: ringTypeMap, isLoading: isLoadingRingTypeMap} = useSWR(
    [api, "ringTypes"],
    async ([api, type]: [DataAPI, "ringTypes"]) => toRecord(await api[type].list()),
    {fallbackData: {}}
  )

  const items = isLoadingRingSeriesMap ? [] : rings.map<TypedSearchableItem<Ring & SummaryProps>>(item => {
    const ringOrder = ringOrderMap[item.order.id];
    return {
      id: item.id,
      properties: {
        identifier: {
          term: isLoadingRingTypeMap ? "" : ringIdentifier(item, ringTypeMap[item.ringType.id]),
          component: isLoadingRingTypeMap ? "-" : <Link href={`/bird-ringing/ring-view/?entryId=${item.id}`} className="all-spaces">{ringIdentifier(item, ringTypeMap[item.ringType.id])}</Link>
        },
        status: {
          term: item.status,
          component: item.status
        },
        manufacturer: {
          term: ringOrder.manufacturer,
          component: ringOrder.manufacturer,
        },
        ringType: {
          term: isLoadingRingTypeMap ? "" : ringTypeMap[item.ringType.id].code,
          component: isLoadingRingTypeMap ? "-" : <Link href={`/bird-ringing/ring-type-view/?entryId=${item.ringType.id}`}>{ringTypeMap[item.ringType.id].code}</Link>,
        },
        order: {
            term: ringOrder.identifier,
            component: <Link href={`/bird-ringing/ring-order-view/?entryId=${ringOrder.id}`}>{ringOrder.identifier}</Link>
        }
      }
    }
  });

  const columns: ColumnSpec<Ring & SummaryProps> = {
    id: "",
    identifier: "Identifier",
    status: "Status",
    ringType: "Type",
    manufacturer: "Manufacturer",
    order: "Order",
  }
  
  return (
    <div className="container">
      <Warning><span/></Warning>
      <h2>Ring List View</h2>
      <FilterableTable
        items={items}
        columns={columns}
        filterLabel="Filter for ring table"
        batchActions={[]}
        batchActionLabel="Ring actions"
        sorting={(a, b) => a.properties.manufacturer.term.localeCompare(b.properties.manufacturer.term)}
      />
    </div>
  )
}
