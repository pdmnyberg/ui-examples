"use client"
import { DataAPI, License, toLocalDate, toLocalTime, toRecord } from "../common";
import Warning from "../warning";
import { useSearchParams, notFound } from "next/navigation";
import { Fragment, Suspense } from "react";
import Link from "next/link";
import { useDataAPI } from "../contexts";
import useSWR from "swr";

function entryToTable(entry: License): Record<string, React.ReactNode> {
  const mnr = entry.mnr;
  return {
    "Mnr": mnr,
    "Created At": toLocalTime(entry.createdAt),
    "Updated At": toLocalTime(entry.updatedAt),
    "Period": `${toLocalDate(entry.startsAt)}  to ${toLocalDate(entry.expiresAt)}`,
    "Description": <pre style={{fontFamily: "inherit", fontSize: "inherit"}}>{entry.description}</pre>,
    "Region": entry.region,
    "Final Report Status": entry.reportStatus,
  }
}

const getLicense = ([api, type, licenseId]: [DataAPI, "licenses", string]) => api[type].get({id: licenseId, type: "license"})

const getActors = async ([api, type, actorIds]: [DataAPI, "actors", string[]]) => {
  const actors = Promise.all(
    actorIds.map(aid => api[type].get({id: aid, type: "actor"}))
  );
  return actors;
}

function EntryViewBase() {
  const api = useDataAPI();
  const searchParams = useSearchParams();
  const entryId = searchParams.get("entryId")
  if (!entryId) {
    notFound();
  }
  const {data: entry, isLoading} = useSWR(
    [api, "licenses", entryId],
    getLicense
  )
  const {data: actors} = useSWR(
    [api, "actors", (entry?.actors ?? []).map(a => a.actor.id)],
    getActors,
    {fallbackData: []}
  )
  const {data: permissionTypeMap, isLoading: isLoadingPermissionTypeMap} = useSWR(
    [api, "permissionTypes"],
    async ([api, type]: [DataAPI, "permissionTypes"]) => toRecord(await api[type].list()),
    {fallbackData: {}}
  )
  const {data: permissionPropertyMap, isLoading: isLoadingPermissionPropertyMap} = useSWR(
    [api, "permissionProperties"],
    async ([api, type]: [DataAPI, "permissionProperties"]) => toRecord(await api[type].list()),
    {fallbackData: {}}
  )
  const {data: speciesMap, isLoading: isLoadingSpecies} = useSWR(
    [api, "species"],
    async ([api, type]: [DataAPI, "species"]) => toRecord(await api[type].list()),
    {fallbackData: {}}
  )
  if (isLoading) return (
    <div className="container">
      <h2>License view</h2>
      <p>Loading...</p>
    </div>
  );

  if (!entry) {
    notFound();
  }
  const entryTable = entryToTable(entry);
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
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Properties</th>
            <th scope="col">Species list</th>
            <th scope="col">Location</th>
            <th scope="col">Period</th>
          </tr>
        </thead>
        <tbody>
          {entry.permissions.map((p, index) => {
            const type = permissionTypeMap[p.permissionType.id];
            const species = p.speciesList.map(s => speciesMap[s.id]);
            const properties = p.properties.map(pp => permissionPropertyMap[pp.id]);

            return !isLoadingPermissionTypeMap && !isLoadingPermissionPropertyMap && !isLoadingSpecies ? (
              <tr key={index}>
                <td>{p.description || "-"}</td>
                <td>{type.name}</td>
                <td><ul>{properties.map(pp => (
                  <li key={pp.id}>{pp.name}</li>
                ))}</ul></td>
                <td><ul>{species.map(s => (
                  <li key={s.id}>{s.name}</li>
                ))}</ul></td>
                <td>{p.location}</td>
                <td>{toLocalDate(p.period[0])} to {toLocalDate(p.period[1])}</td>
              </tr>
            ) : <Fragment key={index}></Fragment>;
          })}
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
            const actor = actors.filter(a => a.id === r.actor.id)[0] ?? {type: "-", id: "-", name: "-"}
            return (
              <tr key={index}>
                <td>{actor.actorType}</td>
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
