"use client"
import { getLicenses, getActor } from "../common"
import { useState, CSSProperties } from "react";
import Link from "next/link";
import Warning from "../warning";
import { useItemSelections, useFilter, SearchableItem } from "../hooks";

const dropdownOpenStyle: CSSProperties = {
  position: "absolute",
  inset: "0px 0px auto auto",
  margin: "0px",
  transform: "translate(0px, 40px)",
}

export default function ListView() {
  const [actionIsOpen, setActionIsOpen] = useState(false); 

  const licenses = getLicenses();
  const items = licenses.map<SearchableItem>(item => {
    const licenseHolderInfo = item.actors.find(r => !r.mednr);
    const licenseHolder = licenseHolderInfo ? getActor({id: licenseHolderInfo.actorId}) : undefined;
    return {
      id: item.id,
      properties: {
        "Mnr": {
          term: item.mnr,
          component: <Link href={`/bird-ringing/license-view/?entryId=${item.id}`}>{item.mnr}</Link>
        },
        "Type": {
          term: licenseHolder ? licenseHolder.type : "-",
          component: licenseHolder ? licenseHolder.type : "-"
        },
        "License holder": {
          term: licenseHolder ? licenseHolder.name : "-",
          component: licenseHolder ? <Link href={`/bird-ringing/actor-view/?entryId=${licenseHolder.id}`}>{licenseHolder.name}</Link> : "-",
        },
        "Number of helpers": {
          term: String(item.actors.length),
          component: item.actors.length
        },
        "Updated At": {
          term: item.updatedAt,
          component: item.updatedAt,
        },
        "Final Report Status": {
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
    handleItemSelection,
    allSelected
  } = useItemSelections(new Set(filteredItems.map(r => r.id)));
  const columns = [
    "Mnr",
    "Type",
    "License holder",
    "Number of helpers",
    "Updated At",
    "Final Report Status",
  ]
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
          placeholder={columns.join(", ")}
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            {columns.map(c => <th key={c} scope="col">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => {
            return (
              <tr key={item.id}>
                <th><input type="checkbox" onChange={handleItemSelection} checked={selectedItems.has(item.id)} data-actor-id={item.id}/></th>
                {columns.map(c => <td key={c}>{item.properties[c].component}</td>)}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
