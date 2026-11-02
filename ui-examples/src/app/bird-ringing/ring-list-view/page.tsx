"use client"
import Link from "next/link";
import Warning from "../warning";
import { TypedSearchableItem } from "../../hooks";
import { useDataAPI } from "../contexts";
import { DataAPI, Ring, toRecord } from "../common";
import { ColumnSpec } from "@/components/Table";
import { FilterableTable } from "@/components/FilterableTable";
import useSWR from "swr";

type SummaryProps = {
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

  const items = isLoadingRingSeriesMap ? [] : rings.map<TypedSearchableItem<Ring & SummaryProps>>(item => {
    const ringOrder = ringOrderMap[item.order.id];
    return {
      id: item.id,
      properties: {
        identifier: {
          term: item.identifier,
          component: <Link href={`/bird-ringing/ring-view/?entryId=${item.id}`}>{item.identifier}</Link>
        },
        manufacturer: {
          term: ringOrder.manufacturer,
          component: ringOrder.manufacturer,
        },
        order: {
            term: ringOrder.identifier,
            component: <Link href={`/bird-ringing/ring-series-view/?entryId=${ringOrder.id}`}>{ringOrder.identifier}</Link>
        }
      }
    }
  });

  const columns: ColumnSpec<Ring & SummaryProps> = {
    id: "",
    identifier: "Identifier",
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
