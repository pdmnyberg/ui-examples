"use client"
import { useSearchParams, notFound } from "next/navigation";
import { Suspense } from "react";
import React from "react";
import { useData } from "../../contexts";
import { ColumnSpec, DataSpec, Table, VerticalTable } from "@/components/Table";
import { Activity } from "../../common";
import Link from "next/link";



function EntryViewBase() {
  const searchParams = useSearchParams();
  const {activities, users, people} = useData();
  const activityId = searchParams.get("entryId")
  
  if (!activityId) notFound();
  const activity = activities.get({type: "activity", id: activityId});
  if (!activity) notFound();

  const creator = users.get(activity.createdBy);
  const recipient = users.get(activity.recipient);
  const activityColumns: ColumnSpec<Activity> = {
    title: "Titel",
    content: "Beskrivning",
    recipient: "Vårdtagare",
    priority: "Prioritet",
    status: "Status",
    createdBy: "Skapare",
  }
  const activityView: DataSpec<Activity> = {
    id: activity.id,
    title: activity.title,
    content: activity.content,
    recipient: <Link href={`/health-care/care-recipients/entry/?entryId=${recipient.username}`}>{recipient.username}</Link>,
    priority: <span className={`badge text-bg-${activity.priority}`}>{activity.priority}</span>,
    status: activity.status,
    createdBy: creator.username,
  }
  return (
    <>
      <h2>Aktivitet {activity.schedule ? activity.schedule.time.toLocaleString() : "(Icke schemalagd)"}</h2>
      <h3>Detaljer</h3>
      <VerticalTable items={[activityView]} columns={activityColumns} param="Param"/>
    </>
  )
}

export default function EntryView() {
  return (
    <Suspense fallback={<span />}>
      <EntryViewBase />
    </Suspense>
  )
}
