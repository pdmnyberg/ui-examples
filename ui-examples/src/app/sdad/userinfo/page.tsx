"use client"

import { useData } from "../contexts";
import { ColumnSpec, VerticalTable } from "@/components/Table";
import Alert from "@/components/Alert";
import { User } from "../types";


export default function EntryView() {
  const {user} = useData();
  const userEntry = {
    id: user.username,
    ...user,
  }

  const userColumns: ColumnSpec<User & {id: string}> = {
    username: "Username",
  };

  return (
    <div className="container">
      <h2>User {user.username}</h2>
      <h3>Properties</h3>
      <VerticalTable items={[userEntry]} columns={userColumns} param="Param"/>
      <h3>Set public encryption key</h3>
      <Alert type="warning">TODO: Allow selecting a subset of a file.</Alert>
    </div>
  )
}
