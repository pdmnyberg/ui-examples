"use client"
import { getActor, getActorLicenses, getLicenseInfo, Actor } from "../common";
import Warning from "../warning";
import { useSearchParams, notFound } from "next/navigation";
import { Suspense, ReactNode } from "react";
import Link from "next/link";

function EntryViewBase() {
  const searchParams = useSearchParams();
  const listProperties: ((r: Actor) => [string, string | ReactNode])[] = [
    (r) => ["Name", r.name],
    (r) => ["Email", r.email || ""],
    () => ["Details of Ringer", "-"],
  ]
  const actorId = searchParams.get("entryId")
  if (!actorId) {
    notFound();
  }
  const actor = getActor({id: actorId});
  const licenses = getActorLicenses(actor);
  return (
    <div className="container">
      <Warning>
        <p>This document is an example of how the entry view could look. The idea is to show all the properties related to a single license holder including associated helpers, current license specification and previous license documents.</p>
        <p>The focus here is to exemplify the structure, properties and interaction behaviors rather than the actual content represented. The data on this page is automatically generated so there might be some inconsistencies when it comes to dates and values that would be acceptable in the real system.</p>
      </Warning>
      <h2>Actor view</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Property</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {listProperties.map((p, index) => {
            const [name, value] = p(actor);
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
            <th scope="col">Starts At</th>
            <th scope="col">Expires At</th>
            <th scope="col">Sent At</th>
            <th scope="col">Sent Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map((l) => {
            const licenseInfo = getLicenseInfo(l, actor)
            return (
              <tr key={l.id}>
                <th scope="row"><Link href={`/bird-ringing/license-view/?entryId=${l.id}`}>{l.mnr}</Link></th>
                <td>{licenseInfo ? licenseInfo.role : "-"}</td>
                <td>{licenseInfo ? licenseInfo.mednr : "-"}</td>
                <td>{l.startsAt}</td>
                <td>{l.expiresAt}</td>
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
