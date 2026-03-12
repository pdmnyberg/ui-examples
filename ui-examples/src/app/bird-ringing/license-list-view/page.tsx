"use client"
import { useState, CSSProperties } from "react";
import Link from "next/link";
import Warning from "../warning";
import { useItemSelections, useFilter, TypedSearchableItem } from "../../hooks";
import { useDataSource } from "../contexts";
import { getOrDefault, License, toLocalTime } from "../common";
import { Pagination, usePagination } from "@/components/Pagination";
import { ColumnSpec, Table } from "@/components/Table";

const dropdownOpenStyle: CSSProperties = {
  position: "absolute",
  inset: "0px 0px auto auto",
  margin: "0px",
  transform: "translate(0px, 40px)",
}

type SummaryProps = {
  type: string;
  licenseHolder: string;
  numberOfHelpers: string;
}

export default function ListView() {
  const [actionIsOpen, setActionIsOpen] = useState(false); 
  const dataSource = useDataSource();

  const {data: licenses} = dataSource.getLicenses();
  const items = (licenses || []).map<TypedSearchableItem<License & SummaryProps>>(item => {
    const licenseHolderInfo = item.actors.find(r => !r.mednr);
    const licenseHolder = licenseHolderInfo ? dataSource.getActor(licenseHolderInfo.actor) : undefined;
    return {
      id: item.id,
      properties: {
        mnr: {
          term: item.mnr,
          component: <Link href={`/bird-ringing/license-view/?entryId=${item.id}`}>{item.mnr}</Link>
        },
        type: {
          term: getOrDefault(licenseHolder, (lh) => lh.type, "-"),
          component: getOrDefault(licenseHolder, (lh) => lh.type, "-")
        },
        licenseHolder: {
          term: getOrDefault(licenseHolder, (lh) => lh.name, "-"),
          component: getOrDefault(licenseHolder,  (lh) => <Link href={`/bird-ringing/actor-view/?entryId=${lh.id}`}>{lh.name}</Link>, "-"),
        },
        numberOfHelpers: {
          term: String(item.actors.length),
          component: item.actors.length
        },
        updatedAt: {
          term: toLocalTime(item.updatedAt),
          component: toLocalTime(item.updatedAt),
        },
        reportStatus: {
          term: item.reportStatus,
          component: item.reportStatus,
        },
      }
    }
  })
  const {filter, setFilter, filteredItems} = useFilter(items)
  const {
    selectedItems,
    toggleItems,
    allSelected,
    handleItemSelection,
  } = useItemSelections(new Set(filteredItems.map(r => r.id)));
  const columns: ColumnSpec<License & SummaryProps> = {
    id: "",
    mnr: "Mnr",
    type: "Type",
    licenseHolder: "License holder",
    numberOfHelpers: "Number of helpers",
    updatedAt: "Updated At",
    reportStatus: "Final Report Status",
  }
  const {items: pageItems, currentPage, pages} = usePagination(filteredItems, 50);
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
      <Warning>
        <p></p>
      </Warning>
      <h2>License List View</h2>
      <div className="input-group mb-3">
        <span className="input-group-text">Filter</span>
        <input
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="form-control"
          placeholder={Object.values(columns).filter(c => !!c).join(", ")}
          aria-label="Filter for license table"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3">
        <button className="btn btn-outline-secondary" type="button" onClick={toggleItems}>{allSelected ? "Select None" : "Select All"}</button>
        <span className="input-group-text flex-grow-1" >{selectedItems.size} of {items.length} selected</span>
        <button className="btn btn-outline-secondary dropdown-toggle" onClick={() => setActionIsOpen(!actionIsOpen)} type="button" aria-expanded={actionIsOpen}>Batch action</button>
        <ul className={`dropdown-menu ${actionIsOpen ? "show" : ""}`} style={actionIsOpen ? dropdownOpenStyle : {}} onClick={() => setActionIsOpen(false)}>
          <li><a className="dropdown-item" href="#">Send license</a></li>
          <li><a className="dropdown-item" href="#">Generate new license</a></li>
          <li><a className="dropdown-item" href="#">Download licenses</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="#">Disable</a></li>
          <li><a className="dropdown-item" href="#">Enable</a></li>
        </ul>
      </div>
      <Pagination pages={pages} currentPage={currentPage}/>
      <Table columns={columns} items={selectablePageItems} />
      <Pagination pages={pages} currentPage={currentPage}/>
    </div>
  )
}
