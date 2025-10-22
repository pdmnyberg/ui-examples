"use client"
import { getActors, getActorLicenses, getLicenseInfo } from "../common"
import { useState, useCallback, ChangeEventHandler, CSSProperties } from "react";
import Link from "next/link";
import Warning from "../warning";
import { Fragment } from "react";
import { useItemSelections, useFilter, SearchableItem } from "../hooks";

const dropdownOpenStyle: CSSProperties = {
  position: "absolute",
  inset: "0px 0px auto auto",
  margin: "0px",
  transform: "translate(0px, 40px)",
}

export default function ListView() {
  const [actionIsOpen, setActionIsOpen] = useState(false); 

  const actors = getActors().sort((a, b) => a.name.localeCompare(b.name));
  const items = actors.map<SearchableItem>(item => {
    const licenses = getActorLicenses(item);
    const roles = new Set(licenses.map((l) => {
      const info = getLicenseInfo(l, item)
      return info.role;
    }));
    return {
      id: item.id,
      properties: {
        "Name": {
          term: item.name,
          component: <Link href={`/bird-ringing/actor-view/?entryId=${item.id}`}>{item.name}</Link>
        },
        "Type": {
          term: item.type,
          component: item.type,
        },
        "Roles": {
          term: Array.from(roles).join(" "),
          component: Array.from(roles).join(", ")
        },
        "Licenses": {
          term: licenses.map((l) => {
            const info = getLicenseInfo(l, item)
            return (
              info.mednr ? `${l.mnr}:${info.mednr}` : l.mnr
            );
          }).join(" "),
          component: (
            <>{licenses.map((l, index, list) => {
              const info = getLicenseInfo(l, item)
              return (
                <Fragment key={l.mnr}><Link href={`/bird-ringing/license-view/?entryId=${l.id}`}>{info.mednr ? `${l.mnr}:${info.mednr}` : l.mnr}</Link>{index < list.length - 1 ? ", " : <></>}</Fragment>
              );
            })}</>
          )
        },
        "E-mail": {
          term: item.email ? item.email : "-",
          component: item.email ? item.email : "-",
        },
        "Sex": {
          term: item.sex,
          component: item.sex
        },
        "Updated At": {
          term: item.updatedAt,
          component: item.updatedAt
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
    "Name",
    "Type",
    "Roles",
    "Licenses",
    "E-mail",
    "Sex",
    "Updated At",
  ]
  return (
    <div className="container">
      <Warning>
        <p>This document is an example of how the list view could look. The idea is to show the most important properties for working with license management. Only the latest state of a current license holder is displayed.</p>
        <p>The focus here is to exemplify the structure, properties and interaction behaviors rather than the actual content represented. The data on this page is automatically generated so there might be some inconsistencies when it comes to dates and values that would be acceptable in the real system.</p>
      </Warning>
      <h2>Actor List View</h2>
      <div className="input-group mb-3">
        <span className="input-group-text">Filter</span>
        <input
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="form-control"
          placeholder={columns.join(", ")}
          aria-label="Filter for actor table"
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
