"use client"
import { Actor, toLocalTime, toLocalDate, DataAPI, getActorLicenses, getLicenseInfo } from "../common";
import Warning from "../warning";
import { useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useDataAPI } from "../contexts";
import useSWR from "swr";

function entryToTable(entry: Actor): Record<string, React.ReactNode> {
  return {
    "Name": entry.name,
    "Type": entry.actorType,
    "E-mail": entry.email,
    "Sex": entry.sex,
    "Updated At": toLocalTime(entry.updatedAt),
    "Details of Ringer": "-",
  }
}

const getActor = ([api, type, actorId]: [DataAPI, "actors", string]) => api[type].get({id: actorId, type: "actor"})

const getLicenses = async ([api, type, actorId]: [DataAPI, "licenses", string]) => {
  const licenses = api[type].list({properties: {actorRef: {id: actorId, type: "actor"}}});
  return licenses;
}

const getDocuments = async ([api, type, actorId, licenseIds]: [DataAPI, "documents", string, string[]]) => {
  return await api[type].list({properties: {
    actorRef: {id: actorId, type: "actor"},
    licenseRef: licenseIds.map(lid => ({id: lid, type: "license"}))
  }})
}

function EntryViewBase() {
  const searchParams = useSearchParams();
  const api = useDataAPI();
  const actorId = searchParams.get("entryId")
  if (!actorId) {
    notFound();
  }
  const {data: actor, isLoading} = useSWR(
    [api, "actors", actorId],
    getActor
  )
  const {data: allLicenses} = useSWR(
    [api, "licenses", actorId],
    getLicenses,
    {fallbackData: []}
  );
  const {data: documents} = useSWR(
    [api, "documents", actorId, allLicenses.map(l => l.id)],
    getDocuments,
    {fallbackData: []}
  );
  if (isLoading) return (
    <div className="container">
      <h2>License view</h2>
      <p>Loading...</p>
    </div>
  );
  if (!actor) {
    notFound();
  }

  const licenses = getActorLicenses(allLicenses, actor);
  const entryTable = entryToTable(actor)
  return (
    <div className="container">
      <Warning><span/></Warning>
      <h2>Actor view</h2>
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
      <h2>Licenses</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Mnr</th>
            <th scope="col">Role</th>
            <th scope="col">Mednr</th>
            <th scope="col">Active</th>
            <th scope="col">Starts At</th>
            <th scope="col">Expires At</th>
            <th scope="col">Download</th>
            <th scope="col">Sent At</th>
            <th scope="col">Sent Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map((l) => {
            const licenseInfo = getLicenseInfo(l, actor);
            const primaryDocument = documents.filter(d => d.license.id === l.id && d.actor.id === actor.id)[0];
            const mnr = l.mnr;
            return (
              <tr key={l.id}>
                <th scope="row"><Link href={`/bird-ringing/license-view/?entryId=${l.id}`}>{mnr}</Link></th>
                <td>{licenseInfo ? licenseInfo.role : "-"}</td>
                <td>{licenseInfo ? licenseInfo.mednr : "-"}</td>
                <td>{licenseInfo ? licenseInfo.status : "-"}</td>
                <td>{toLocalDate(l.startsAt)}</td>
                <td>{toLocalDate(l.expiresAt)}</td>
                <td>{primaryDocument ? <Link href={primaryDocument.href}>License document</Link> : "-"}</td>
                <td>{licenseInfo ? toLocalTime(licenseInfo.licenseSentAt) : "-"}</td>
                <td>{licenseInfo ? licenseInfo.licenseSentStatus : "-"}</td>
                <td><button className="btn btn-outline-secondary btn-sm" type="button">Resend</button></td>
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
