"use client"
import { getActor, Actor } from "../common";
import Warning from "../warning";
import { useSearchParams, notFound } from "next/navigation";
import { Suspense, ReactNode } from "react";

function EntryViewBase() {
  const searchParams = useSearchParams();
  const listProperties: ((r: Actor) => [string, string | ReactNode])[] = [
    (r) => ["Name", r.name],
    (r) => ["Email", r.email || ""],
    (r) => ["Email Sent At", r.emailSentAt],
    (r) => ["Email Status", r.emailStatus],
  ]
  const actorId = searchParams.get("entryId")
  if (!actorId) {
    notFound();
  }
  const ringer = getActor({id: actorId});
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
            const [name, value] = p(ringer);
            return (
              <tr key={index}>
                <th scope="row">{name}</th>
                <td>{value}</td>
              </tr>
            )
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
