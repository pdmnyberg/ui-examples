"use client"
import { Suspense } from "react";
import { NavContext, NavItems } from "@/contexts";
import { Sidebar } from "@/components/Sidebar";
import { NavStateProvider } from "@/components/NavStateProvider";
import { birdRingingUrl, DataProvider } from "./DataProvider";


export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const basePath = process.env.NEXT_PUBLIC_API_URL || "";
  const navItems: NavItems =  [
    {type: "heading", label: "Manage licenses"},
    {type: "item", label: "Actor list", href: "/bird-ringing/actor-list-view", id: "actor-list-view"},
    {type: "item", label: "License list", href: "/bird-ringing/license-list-view", id: "license-list-view"},
    {type: "separator"},
    {type: "heading", label: "Manage details"},
    {type: "item", label: "Ring list", href: "/bird-ringing/ring-list-view", id: "ring-list-view"},
    {type: "item", label: "Species list", href: "/bird-ringing/species-list-view", id: "species-list-view"},
    {type: "item", label: "Permissions list", href: "/bird-ringing/permissions-list-view", id: "permissions-list-view"},
    {type: "separator"},
    {type: "heading", label: "Diagrams"},
    {type: "item", label: "User workflow", href: "/bird-ringing/diagrams/bird-ringing-user-workflow", id: "diagrams/bird-ringing-user-workflow/"},
    {type: "item", label: "System separation", href: "/bird-ringing/diagrams/bird-ringing-system-separation", id: "diagrams/bird-ringing-system-separation/"},
    {type: "item", label: "Ring life cycle", href: "/bird-ringing/diagrams/bird-ringing-ring-lifecycle", id: "diagrams/bird-ringing-ring-lifecycle/"},
  ]

  const sidebarProps = {
    title: "Bird ringing",
    rootHref: "/bird-ringing",
    iconRef: "bi-feather",
  };
  return (
    <NavContext.Provider value={navItems}>
      <Suspense fallback={<Sidebar {...sidebarProps}><></></Sidebar>}>
        <NavStateProvider>
          <Sidebar {...sidebarProps}>
            <DataProvider
              actorUrl={birdRingingUrl(basePath, "actors")}
              licenseUrl={birdRingingUrl(basePath, "licenses")}
              licenseDocumentUrl={birdRingingUrl(basePath, "documents")}
              permissionTypeUrl={birdRingingUrl(basePath, "permissionTypes")}
              permissionPropertyUrl={birdRingingUrl(basePath, "permissionProperties")}
              speciesUrl={birdRingingUrl(basePath, "species")}
              ringUrl={birdRingingUrl(basePath, "rings")}
              ringOrdersUrl={birdRingingUrl(basePath, "ringOrders")}
              ringTypesUrl={birdRingingUrl(basePath, "ringTypes")}
            >
              {children}
            </DataProvider>
          </Sidebar>
        </NavStateProvider>
      </Suspense>
    </NavContext.Provider>
  )
}