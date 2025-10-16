"use client"
import { getRingers } from "../common"
import { useState, useCallback, ChangeEventHandler, CSSProperties } from "react";
import Link from "next/link";

const dropdownOpenStyle: CSSProperties = {
  position: "absolute",
  inset: "0px 0px auto auto",
  margin: "0px",
  transform: "translate(0px, 40px)",
}

export default function ListView() {
  const [filter, setFilter] = useState<string>("");
  const [actionIsOpen, setActionIsOpen] = useState(false); 
  const [selectedRingers, setSelectedRingers] = useState(new Set<string>());
  const handleRingerSelection = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    const ringerId = event.target.getAttribute("data-ringer-id");
    const checked = event.target.checked;
    if (ringerId) {
      if (checked) {
        setSelectedRingers((prev) => {
          const next = new Set(prev);
          next.add(ringerId);
          return next;
        })
      } else {
        setSelectedRingers((prev) => {
          const next = new Set(prev);
          next.delete(ringerId);
          return next;
        })
      }
    }
  }, [setSelectedRingers])
  const ringers = getRingers();
  const filteredRingers = ringers.filter(r => Object.values(r).some(value => value.toLowerCase().includes(filter.toLowerCase())))
  return (
    <div className="container">
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
        <button className="btn btn-outline-secondary" type="button" onClick={() => setSelectedRingers(new Set(filteredRingers.map(r => r.id)))}>Select All</button>
        <span className="input-group-text flex-grow-1" >{selectedRingers.size} of {ringers.length} selected</span>
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
            <th scope="col">License</th>
            <th scope="col">Email Status</th>
            <th scope="col">Updated</th>
            <th scope="col">Download</th>
          </tr>
        </thead>
        <tbody>
          {filteredRingers.map(r => (
            <tr key={r.id}>
              <th><input type="checkbox" onChange={handleRingerSelection} checked={selectedRingers.has(r.id)} data-ringer-id={r.id}/></th>
              <th scope="row">{r.id}</th>
              <td>{r.firstName} {r.lastName}</td>
              <td>{r.license}</td>
              <td>{r.emailStatus}</td>
              <td>{r.updated}</td>
              <td><Link href={r.licenseHref} download>License file</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
