"use client"
import Link from "next/link";
import { getRinger, getHelpers, Ringer } from "../common";
import Warning from "../warning";
import { useSearchParams, notFound } from "next/navigation";
import { Suspense, ReactNode } from "react";

function EntryViewBase() {
  const searchParams = useSearchParams();
  const listProperties: ((r: Ringer) => [string, string | ReactNode])[] = [
    (r) => ["Name", r.name],
    (r) => ["License Type", r.licenses[0].type],
    (r) => ["License Created At", r.licenses[0].createdAt],
    (r) => ["License Start At", r.licenses[0].startsAt],
    (r) => ["License Expires At", r.licenses[0].expiresAt],
    (r) => ["Region", r.licenses[0].region],
    (r) => ["Alowances", (
      <ul key="allowance-list">
        {r.licenses[0].allowances.map((a, index) => (
          <li key={index}>{a}</li>
        ))}
      </ul>
    )],
    (r) => ["Email Sent At", r.emailSentAt],
    (r) => ["Email Status", r.emailStatus],
  ]
  const ringerId = searchParams.get("ringerId")
  if (!ringerId) {
    notFound();
  }
  const ringer = getRinger({id: ringerId});
  const helpers = getHelpers({id: ringerId});
  return (
    <div className="container">
      <Warning />
      <h2>Entry view</h2>
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
      <h3>Helpers</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">License Type</th>
            <th scope="col">Email Sent At</th>
            <th scope="col">Email Status</th>
            <th scope="col">License Updated At</th>
            <th scope="col">Download</th>
          </tr>
        </thead>
        <tbody>
          {helpers.map(r => (
            <tr key={r.id}>
              <th scope="row"><Link href={`/bird-ringing/entry-view/?ringerId=${r.id}`}>{r.id}</Link></th>
              <td>{r.name}</td>
              <td>{r.licenses[0].type}</td>
              <td>{r.emailSentAt}</td>
              <td>{r.emailStatus}</td>
              <td>{r.licenses[0].createdAt}</td>
              <td><Link href={r.licenses[0].href} download>License file</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Documents</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Document Type</th>
            <th scope="col">Created At</th>
            <th scope="col">Download</th>
          </tr>
        </thead>
        <tbody>
          {ringer.licenses.map((license, index) => (
            <tr key={index}>
              <td>{license.type} License</td>
              <td>{license.createdAt}</td>
              <td><Link href={license.href} download>License file</Link></td>
            </tr>
          ))}
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
