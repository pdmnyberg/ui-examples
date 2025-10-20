"use client"
import { getActors } from "../common"
import { useState, useCallback, ChangeEventHandler, CSSProperties } from "react";
import Link from "next/link";
import Warning from "../warning";

const dropdownOpenStyle: CSSProperties = {
  position: "absolute",
  inset: "0px 0px auto auto",
  margin: "0px",
  transform: "translate(0px, 40px)",
}

export default function ListView() {
  const [filter, setFilter] = useState<string>("");
  const [actionIsOpen, setActionIsOpen] = useState(false); 
  const [selectedActors, setSelectedActors] = useState(new Set<string>());
  const handleActorSelection = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    const actorId = event.target.getAttribute("data-actor-id");
    const checked = event.target.checked;
    if (actorId) {
      if (checked) {
        setSelectedActors((prev) => {
          const next = new Set(prev);
          next.add(actorId);
          return next;
        })
      } else {
        setSelectedActors((prev) => {
          const next = new Set(prev);
          next.delete(actorId);
          return next;
        })
      }
    }
  }, [setSelectedActors]);
  const actors = getActors();
  const filterItems = filter.split(/\s+/).map(i => i.toLowerCase())
  const filteredActors = actors
    .filter(r => Object.values(r).some(value => typeof value === "string" ? filterItems.some(fi => value.toLowerCase().includes(fi)) : false))
    .sort((a, b) => a.name.localeCompare(b.name));
  const allVisibleSelected = selectedActors.isSupersetOf(new Set(filteredActors.map(r => r.id)));
  return (
    <div className="container">
      <Warning>
        <p>This document is an example of how the list view could look. The idea is to show the most important properties for working with license management. Only the latest state of a current license holder is displayed.</p>
        <p>The focus here is to exemplify the structure, properties and interaction behaviors rather than the actual content represented. The data on this page is automatically generated so there might be some inconsistencies when it comes to dates and values that would be acceptable in the real system.</p>
      </Warning>
      <h2>List view</h2>
      <div className="input-group mb-3">
        <span className="input-group-text">Filter</span>
        <input
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="form-control"
          placeholder="Name, email, license or updated"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3">
        <button className="btn btn-outline-secondary" type="button" onClick={() => setSelectedActors(allVisibleSelected ? selectedActors.difference(new Set(filteredActors.map(r => r.id))) : selectedActors.union(new Set(filteredActors.map(r => r.id))))}>{allVisibleSelected ? "Select None" : "Select All"}</button>
        <span className="input-group-text flex-grow-1" >{selectedActors.size} of {actors.length} selected</span>
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
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email Sent At</th>
            <th scope="col">Email Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredActors.map(r => (
            <tr key={r.id}>
              <th><input type="checkbox" onChange={handleActorSelection} checked={selectedActors.has(r.id)} data-actor-id={r.id}/></th>
              <th scope="row"><Link href={`/bird-ringing/actor-view/?entryId=${r.id}`}>{r.id}</Link></th>
              <td>{r.name}</td>
              <td>{r.emailSentAt}</td>
              <td>{r.emailStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
