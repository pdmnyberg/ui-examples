"use client"
import Link from "next/link";
import Warning from "../warning";
import { TypedSearchableItem } from "../../hooks";
import { useDataSource } from "../contexts";
import { getOrDefault, Ring } from "../common";
import { ColumnSpec } from "@/components/Table";
import { FilterableTable } from "@/components/FilterableTable";

type SummaryProps = {
  manufacturer: string;
  series: string;
}

export default function ListView() {
  const dataSource = useDataSource();

  const rings = getOrDefault(dataSource.getRings(), (a) => a, []);
  const items = rings.map<TypedSearchableItem<Ring & SummaryProps>>(item => {
    const ringSeries = dataSource.getRingSeries(item.ringSeries);
    return {
      id: item.id,
      properties: {
        identifier: {
          term: item.identifier,
          component: <Link href={`/bird-ringing/ring-view/?entryId=${item.id}`}>{item.identifier}</Link>
        },
        manufacturer: {
          term: ringSeries.manufacturer,
          component: ringSeries.manufacturer,
        },
        series: {
            term: ringSeries.identifier,
            component: <Link href={`/bird-ringing/ring-series-view/?entryId=${ringSeries.id}`}>{ringSeries.identifier}</Link>
        }
      }
    }
  });

  const columns: ColumnSpec<Ring & SummaryProps> = {
    id: "",
    identifier: "Identifier",
    manufacturer: "Manufacturer",
    series: "Series",
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
