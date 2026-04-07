import { Suspense } from "react";
import { NavItems, NavItem } from "@/contexts";
import { Sidebar } from "@/components/Sidebar";
import { NavStateProvider } from "@/components/NavStateProvider";

import fs from "fs";
import path from "path";
import { NavProvider } from "@/components/NavProvider";


export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const groups: {
    label: string,
    match: (p: {id: string}) => boolean,
    toLabel?: (p: {id: string}) => string
  }[] = [
    {
      label: "Bird ringing",
      match: (p) => p.id.startsWith("bird-ringing-"),
      toLabel: (p) => p.id.replace("bird-ringing-", "").split("-").join(" ")
    },
    {
      label: "Other",
      match: () => true,
      toLabel: (p) => p.id.split("-").join(" ")
    }
  ]

  const paths = (
    fs.readdirSync("public/diagrams")
    .map(file => path.basename(file))
    .filter(name => name.endsWith(".mermaid"))
    .map(name => ({id: name.replace(".mermaid", "")}))
    .map(p => {
      const group = groups.filter(g => g.match(p))[0];
      return {
        ...p,
        label: group.toLabel ? group.toLabel(p) : p.id,
        group: group
      }
    })
  );

  const navItems: NavItems = groups.flatMap<NavItems[number]>(group => [
    {type: "heading", label: group.label},
    ...paths.filter(p => p.group === group).map<NavItem>(p => ({
      type: "item",
      label: p.label,
      href: `/diagrams/${p.id}`,
      id: p.id
    }))
  ])

  const sidebarProps = {
    title: "Diagrams",
    rootHref: "/diagrams",
    iconRef: "bi-diagram-3",
  };
  return (
    <NavProvider items={navItems}>
      <Suspense fallback={<Sidebar {...sidebarProps}>{children}</Sidebar>}>
        <NavStateProvider>
          <Sidebar {...sidebarProps}>
            {children}
          </Sidebar>
        </NavStateProvider>
      </Suspense>
    </NavProvider>
  )
}