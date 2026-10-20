"use client"
import Link from "next/link";
import Warning from "../warning";
import { useItemSelections, useFilter, TypedSearchableItem } from "../../hooks";
import { useDataSource } from "../contexts";
import { getOrDefault, Ring } from "../common";
import { Pagination, usePagination } from "@/components/Pagination";
import { ColumnSpec, Table } from "@/components/Table";
import { ActionDropDown } from "@/components/ActionDropDown";


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
  })
  const {filter, setFilter, filteredItems} = useFilter(items);
  const sortedItems = [...filteredItems].sort((a, b) => a.properties.manufacturer.term.localeCompare(b.properties.manufacturer.term))
  const {
    selectedItems,
    toggleItems,
    allSelected,
    handleItemSelection
  } = useItemSelections(new Set(sortedItems.map(r => r.id)));
  const columns: ColumnSpec<Ring & SummaryProps> = {
    id: "",
    identifier: "Identifier",
    manufacturer: "Manufacturer",
    series: "Series",
  }
  const {items: pageItems, currentPage, pages} = usePagination(sortedItems, 50);
  const selectablePageItems = pageItems.map(item => ({
    ...item,
    properties: {
      ...item.properties,
      id: {
        component: <input type="checkbox" onChange={handleItemSelection} checked={selectedItems.has(item.id)} data-actor-id={item.id}/>
      },
    }
  }))
  return (
    <div className="container">
      <Warning><span/></Warning>
      <h2>Ring List View</h2>
      <div className="input-group mb-3">
        <span className="input-group-text">Filter</span>
        <input
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="form-control"
          placeholder={Object.values(columns).filter(c => !!c).join(", ")}
          aria-label="Filter for actor table"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3">
        <button className="btn btn-outline-secondary" type="button" onClick={toggleItems}>{allSelected ? "Select None" : "Select All"}</button>
        <span className="input-group-text flex-grow-1" >{selectedItems.size} of {items.length} selected</span>
        <ActionDropDown items={[]} label="Batch action" />
      </div>
      <Pagination pages={pages} currentPage={currentPage}/>
      <Table items={selectablePageItems} columns={columns} />
      <Pagination pages={pages} currentPage={currentPage}/>
    </div>
  )
}
