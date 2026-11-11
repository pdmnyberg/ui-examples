"use client"
import Warning from "../warning";
import { TypedSearchableItem } from "../../hooks";
import { useDataAPI } from "../contexts";
import { DataAPI, RingSeries, ringIdentifier, toRecord } from "../common";
import { ColumnSpec } from "@/components/Table";
import { FilterableTable } from "@/components/FilterableTable";
import useSWR from "swr";
import Link from "next/link";

type SummaryProps = {
  identifier: string;
}

export default function ListView() {
  const api = useDataAPI();
  const {data: ringSeries} = useSWR(
    [api, "ringSeries", {}],
    async ([api, type]: [DataAPI, "ringSeries"]) => await api[type].list(),
    {fallbackData: []}
  );
  const {data: ringOrderMap, isLoading: isLoadingRingOrderMap} = useSWR(
    [api, "ringOrders"],
    async ([api, type]: [DataAPI, "ringOrders"]) => toRecord(await api[type].list()),
    {fallbackData: {}}
  )

  const items = isLoadingRingOrderMap ? [] : ringSeries.map<TypedSearchableItem<RingSeries & SummaryProps>>(item => {
    return {
      id: item.id,
      properties: {
        identifier: {
          term: ringIdentifier(0, item),
          component: <Link href={`/bird-ringing/ring-series-view/?entryId=${item.id}`} className="all-spaces">{ringIdentifier(0, item)}</Link>
        },
        prefix: {
          term: item.prefix,
          component: item.prefix
        },
        numberOfDigits: {
          term: String(item.numberOfDigits),
          component: String(item.numberOfDigits)
        },
        fillerStyle: {
          term: item.fillerStyle,
          component: item.fillerStyle
        },
        color: {
          term: item.color,
          component: item.color
        },
        hasWebAddress: {
          term: String(item.hasWebAddress),
          component: String(item.hasWebAddress)
        },
      }
    }
  });

  const columns: ColumnSpec<RingSeries & SummaryProps> = {
    id: "",
    identifier: "Identifier",
    prefix: "Prefix",
    numberOfDigits: "Number of digits",
    fillerStyle: "Filler style",
    color: "Color",
    hasWebAddress: "Has web address",
  }
  
  return (
    <div className="container">
      <Warning><span/></Warning>
      <h2>Ring series list view</h2>
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
