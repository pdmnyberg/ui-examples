"use client"

import { Activity } from "@/app/health-care/common";
import { ColumnSpec, Table } from "@/components/Table";
import React from "react";
import { useData } from "../contexts";

type ActivityTable = {
  id: string;
  title: string;
  status: string;
  priority: React.ReactNode;
  schedule?: React.ReactNode;
}

export default function Todo() {
  const {activities} = useData();
  const plannedActivities = activities.all().filter(a => a.schedule).map<ActivityTable>(a => ({
    id: a.id,
    title: a.title,
    status: a.status,
    priority: a.priority,
    schedule: a.schedule?.time.toISOString(),
  }));
  const unplannedActivities = activities.all().filter(a => !a.schedule).map<ActivityTable>(a => ({
    id: a.id,
    title: a.title,
    status: a.status,
    priority: a.priority,
  }));
  const activityColumns: ColumnSpec<ActivityTable> = {
    title: "Titel",
    status: "Status",
    priority: "Prioritet"
  };
  const plannedActivityColumns: ColumnSpec<ActivityTable> = {
    ...activityColumns,
    schedule: "Datum"
  }
  return (
    <>
      <h2>Att-göra-lista</h2>
      <h3>Icke schemalagt</h3>
      <Table items={unplannedActivities} columns={activityColumns} />

      <h3>Schemalagt</h3>
      <Table items={plannedActivities} columns={plannedActivityColumns} />
    </>
  )
}
