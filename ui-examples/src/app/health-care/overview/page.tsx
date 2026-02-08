"use client"

import { Log, Notification } from "@/app/health-care/common";
import { ColumnSpec, Table } from "@/components/Table";
import { NavItem, useNav } from "@/contexts";
import Link from "next/link";
import React from "react";

type EntryPoint = {
  id: string;
  name: string;
  href: React.ReactNode;
}

export default function Overview() {
  const navItems = useNav();
  const entryPoints: EntryPoint[] = navItems.filter((item): item is NavItem => item.type === "item").filter(item => item.tags && item.tags.includes("overview")).map(item => ({
    id: item.id,
    name: item.label,
    href: <Link href={item.href}>{item.label}</Link>
  }));
  const entryPointColumns: ColumnSpec<EntryPoint> = {
    name: "Systemfunktioner",
    href: "Gå dit",
  };

  const notifications: Notification[] = [];
  const notificationColumns: ColumnSpec<Notification> = {};

  const logs: Log[] = [];
  const logColumns: ColumnSpec<Log> = {};
  return (
    <>
      <h2>Översikt</h2>
      <h3>Hantera</h3>
      <Table items={entryPoints} columns={entryPointColumns} />

      <h3>Notifieringar</h3>
      <Table items={notifications} columns={notificationColumns} />

      <h3>Händelser</h3>
      <Table items={logs} columns={logColumns} />
    </>
  )
}
