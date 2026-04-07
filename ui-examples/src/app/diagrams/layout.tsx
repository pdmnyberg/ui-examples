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
  const paths = (
    fs.readdirSync("public/diagrams")
    .map(file => path.basename(file))
    .filter(name => name.endsWith(".mermaid"))
    .map(name => ({id: name.replace(".mermaid", "")}))
  );

  const navItems: NavItems =  [
    {type: "heading", label: "Diagrams"},
    ...paths.map<NavItem>(p => ({type: "item", label: p.id, href: `/diagrams/${p.id}`, id: p.id}))
  ]

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