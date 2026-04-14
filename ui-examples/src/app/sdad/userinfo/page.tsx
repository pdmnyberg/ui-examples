"use client"

import { useData } from "../contexts";
import { ColumnSpec, VerticalTable } from "@/components/Table";
import { Token } from "../types";
import { useId } from "react";
import { toLocalTime } from "@/app/common";


export default function EntryView() {
  const {token} = useData();
  const uploadId = useId();
  const payloadEntry = {
    id: token.payload.sub,
    ...token.payload,
    iat: toLocalTime(new Date(token.payload.iat)),
    exp: toLocalTime(new Date(token.payload.exp)),
  }
  const headerEntry = {
    id: token.payload.sub,
    ...token.header,
  }

  const payloadColumns: ColumnSpec<Token["payload"] & {id: string}> = {
    iss: "Issuer",
    sub: "Subject",
    aud: "Audience",
    iat: "Issued at",
    exp: "Expires at",
    jti: "Token ID",
  };

  const headerColumns: ColumnSpec<Token["header"] & {id: string}> = {
    alg: "Algorithm",
    typ: "Type",
    kid: "Key ID",
  }

  return (
    <div className="container">
      <h2>User {token.payload.sub}</h2>
      <h3>Token</h3>
      <h4>Payload</h4>
      <VerticalTable items={[payloadEntry]} columns={payloadColumns} param="Param"/>
      <h4>Header</h4>
      <VerticalTable items={[headerEntry]} columns={headerColumns} param="Param"/>
      <h3>Set public encryption key</h3>
      <form>
        <div className="mb-3">
          <label htmlFor={uploadId}>Select a public key to upload:</label>
          <input className="form-control" id={uploadId} type="file" />
        </div>
        <button type="submit" className="btn btn-primary">Upload key</button>
      </form>
    </div>
  )
}
