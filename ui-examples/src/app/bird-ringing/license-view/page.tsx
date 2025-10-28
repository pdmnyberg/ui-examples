"use client"
import { License } from "../common";
import Warning from "../warning";
import { useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useDataSource } from "../contexts";
import { getOrDefault, DataSource } from "../common";

function entryToTable(entry: License, dataSource: DataSource): Record<string, React.ReactNode> {
  const mnr = getOrDefault(dataSource.getActor(entry.actor), (a) => a.mnr, "-")
  return {
    "Mnr": mnr,
    "Created At": entry.createdAt,
    "Updated At": entry.updatedAt,
    "Period": `${entry.startsAt}  to ${entry.expiresAt}`,
    "Description": entry.description,
    "Region": entry.region,
    "Final Report Status": entry.reportStatus,
  }
}

function EntryViewBase() {
  const dataSource = useDataSource();
  const searchParams = useSearchParams();
  const entryId = searchParams.get("entryId")
  if (!entryId) {
    notFound();
  }
  const {data: entry, isLoading} = dataSource.getLicense({id: entryId})
  if (isLoading) return (
    <div className="container">
      <h2>License view</h2>
      <p>Loading...</p>
    </div>
  );

  if (!entry) {
    notFound();
  }

  const entryTable = entryToTable(entry, dataSource);
  return (
    <div className="container">
      <Warning>
        <p></p>
      </Warning>
      <h2>License view</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Property</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(entryTable).map(([name, value], index) => {
            return (
              <tr key={index}>
                <th scope="row">{name}</th>
                <td>{value}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <h2>Permissions</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Properties</th>
            <th scope="col">Species list</th>
            <th scope="col">Location</th>
            <th scope="col">Period</th>
          </tr>
        </thead>
        <tbody>
          {entry.permissions.map((p, index) => (
            <tr key={index}>
              <td>{p}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Helpers</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Role</th>
            <th scope="col">Mednr</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {entry.actors.map((r, index) => {
            const actor = getOrDefault(dataSource.getActor({id: r.actor.id}), (a) => a, {type: "-", id: "-", name: "-"})
            return (
              <tr key={index}>
                <td>{actor.type}</td>
                <td>{r.status}</td>
                <td>{r.role}</td>
                <td>{r.mednr}</td>
                <td><Link href={`/bird-ringing/actor-view/?entryId=${actor.id}`}>{actor.name}</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function EntryView() {
  return (
    <Suspense fallback={<span />}>
      <EntryViewBase />
    </Suspense>
  )
}
