"use client"
import { useState, CSSProperties } from "react";
import Link from "next/link";
import Warning from "../warning";
import { Fragment } from "react";
import { useItemSelections, useFilter, TypedSearchableItem } from "../../hooks";
import { useDataSource } from "../contexts";
import { Actor, getOrDefault, toLocalTime } from "../common";
import { Pagination, usePagination } from "@/components/Pagination";
import { ColumnSpec, Table } from "@/components/Table";

const dropdownOpenStyle: CSSProperties = {
  position: "absolute",
  inset: "0px 0px auto auto",
  margin: "0px",
  transform: "translate(0px, 40px)",
}

type SummaryProps = {
  licenses: string;
  roles: string;
}

export default function ListView() {
  const dataSource = useDataSource();
  const [actionIsOpen, setActionIsOpen] = useState(false); 

  const actors = getOrDefault(dataSource.getActors(), (a) => a, []).sort((a, b) => a.name.localeCompare(b.name));
  const items = actors.map<TypedSearchableItem<Actor & SummaryProps>>(item => {
    const licenses = dataSource.getActorLicenses(item, undefined, "Active");
    const roles = new Set(licenses.map((l) => {
      const info = dataSource.getLicenseInfo(l, item)
      return info.role;
    }));
    return {
      id: item.id,
      properties: {
        name: {
          term: item.name,
          component: <Link href={`/bird-ringing/actor-view/?entryId=${item.id}`}>{item.name}</Link>
        },
        type: {
          term: item.type,
          component: item.type,
        },
        roles: {
          term: Array.from(roles).join(" "),
          component: Array.from(roles).join(", ")
        },
        licenses: {
          term: licenses.map((l) => {
            const info = dataSource.getLicenseInfo(l, item);
            const mnr = l.mnr;
            return (
              info.mednr ? `${mnr}:${info.mednr}` : mnr
            );
          }).join(" "),
          component: (
            <>{licenses.map((l, index, list) => {
              const info = dataSource.getLicenseInfo(l, item);
              const mnr = l.mnr;
              return (
                <Fragment key={index}><Link href={`/bird-ringing/license-view/?entryId=${l.id}`}>{info.mednr ? `${mnr}:${info.mednr}` : mnr}</Link>{index < list.length - 1 ? ", " : <></>}</Fragment>
              );
            })}</>
          )
        },
        email: {
          term: item.email ? item.email : "-",
          component: item.email ? item.email : "-",
        },
        sex: {
          term: item.sex,
          component: item.sex
        },
        updatedAt: {
          term: toLocalTime(item.updatedAt),
          component: toLocalTime(item.updatedAt)
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
  const columns: ColumnSpec<Actor & SummaryProps> = {
    name: "Name",
    type: "Type",
    roles: "Roles",
    licenses: "Licenses",
    email: "E-mail",
    sex: "Sex",
    updatedAt: "Updated At",
  }
  const {items: pageItems, currentPage, pages} = usePagination(filteredItems, 50);
  return (
    <div className="container">
      <Warning><span/></Warning>
      <h2>Actor List View</h2>
      <div className="input-group mb-3">
        <span className="input-group-text">Filter</span>
        <input
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="form-control"
          placeholder={Object.values(columns).join(", ")}
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
      <Pagination pages={pages} currentPage={currentPage}/>
      <Table items={pageItems} columns={columns} />
      <Pagination pages={pages} currentPage={currentPage}/>
    </div>
  )
}
