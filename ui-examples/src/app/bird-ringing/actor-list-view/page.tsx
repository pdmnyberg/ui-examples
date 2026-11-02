"use client"
import { useState, CSSProperties } from "react";
import Link from "next/link";
import Warning from "../warning";
import { Fragment } from "react";
import { useItemSelections, useFilter, TypedSearchableItem } from "../../hooks";
import { useDataAPI } from "../contexts";
import { Actor, DataAPI, getActorLicenses, getLicenseInfo, toLocalTime } from "../common";
import { Pagination, usePagination } from "@/components/Pagination";
import { ColumnSpec, Table } from "@/components/Table";
import useSWR from "swr";

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
  const api = useDataAPI();
  const [actionIsOpen, setActionIsOpen] = useState(false); 

  const { data: actors } = useSWR(
    [api, "actors"],
    ([api, type]: [DataAPI, "actors"]) => api[type].list(),
    {fallbackData: []}
  )
  const {data: licenses} = useSWR(
    [api, "licenses", {}],
    async ([api, type]: [DataAPI, "licenses"]) => await api[type].list(),
    {fallbackData: []}
  );

  const items = actors.map<TypedSearchableItem<Actor & SummaryProps>>(item => {
    const actorLicenses = getActorLicenses(licenses, item, undefined, "Active");
    const roles = new Set(actorLicenses.map((l) => {
      const info = getLicenseInfo(l, item)
      return info.role;
    }));
    return {
      id: item.id,
      properties: {
        name: {
          term: item.name,
          component: <Link href={`/bird-ringing/actor-view/?entryId=${item.id}`}>{item.name}</Link>
        },
        actorType: {
          term: item.actorType,
          component: item.actorType,
        },
        roles: {
          term: roles.size === 0 ? "" : Array.from(roles).join(" "),
          component: roles.size === 0 ? "-" : Array.from(roles).join(", ")
        },
        licenses: {
          term: actorLicenses.map((l) => {
            const info = getLicenseInfo(l, item);
            const mnr = l.mnr;
            return (
              info.mednr ? `${mnr}:${info.mednr}` : mnr
            );
          }).join(" "),
          component: (
            <>{actorLicenses.map((l, index, list) => {
              const info = getLicenseInfo(l, item);
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
    allSelected,
    handleItemSelection
  } = useItemSelections(new Set(filteredItems.map(r => r.id)));
  const columns: ColumnSpec<Actor & SummaryProps> = {
    id: "",
    name: "Name",
    actorType: "Type",
    roles: "Roles",
    licenses: "Licenses",
    email: "E-mail",
    sex: "Sex",
    updatedAt: "Updated At",
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
      <Warning><span/></Warning>
      <h2>Actor List View</h2>
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
      <Table items={selectablePageItems} columns={columns} />
      <Pagination pages={pages} currentPage={currentPage}/>
    </div>
  )
}
