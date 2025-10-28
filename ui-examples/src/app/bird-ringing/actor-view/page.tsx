"use client"
import { Actor, getOrDefault } from "../common";
import Warning from "../warning";
import { useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useDataSource } from "../contexts";

function entryToTable(entry: Actor): Record<string, React.ReactNode> {
  return {
    "Name": entry.name,
    "Type": entry.type,
    "E-mail": entry.email,
    "Sex": entry.sex,
    "Updated At": entry.updatedAt,
    "Details of Ringer": "-",
  }
}

function EntryViewBase() {
  const searchParams = useSearchParams();
  const dataSource = useDataSource();
  const actorId = searchParams.get("entryId")
  if (!actorId) {
    notFound();
  }
  const {data: actor, isLoading} = dataSource.getActor({id: actorId})
  if (isLoading) return (
    <div className="container">
      <h2>License view</h2>
      <p>Loading...</p>
    </div>
  );
  if (!actor) {
    notFound();
  }

  const licenses = dataSource.getActorLicenses(actor);
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
            const licenseInfo = dataSource.getLicenseInfo(l, actor);
            const primaryDocument = dataSource.getDocuments(l, actor)[0];
            const mnr = getOrDefault(dataSource.getActor(l.actor), (actor) => actor.mnr, "-");
            return (
              <tr key={l.id}>
                <th scope="row"><Link href={`/bird-ringing/license-view/?entryId=${l.id}`}>{mnr}</Link></th>
                <td>{licenseInfo ? licenseInfo.role : "-"}</td>
                <td>{licenseInfo ? licenseInfo.mednr : "-"}</td>
                <td>{licenseInfo ? licenseInfo.status : "-"}</td>
                <td>{l.startsAt}</td>
                <td>{l.expiresAt}</td>
                <td>{primaryDocument ? <Link href={primaryDocument.href}>License document</Link> : "-"}</td>
                <td>{licenseInfo ? licenseInfo.licenseSentAt : "-"}</td>
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
