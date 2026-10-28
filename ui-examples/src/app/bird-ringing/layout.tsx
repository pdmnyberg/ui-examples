"use client"
import { Suspense, useMemo } from "react";
import { StaticDataSource } from "./common";
import { fetchData } from "../utils";
import useSWR from 'swr';
import { DataSourceContext } from "./contexts";
import { NavContext, NavItems } from "@/contexts";
import { Sidebar } from "@/components/Sidebar";
import { NavStateProvider } from "@/components/NavStateProvider";


function fetchAppData([licensesUrl, actorsUrl, documentsUrl, permissionTypesUrl, permissionPropertiesUrl, speciesUrl, ringsUrl, ringSeriesUrl, ringEventsUrl]: [string, string, string, string, string, string, string, string, string]) {
  return Promise.all([
    fetchData<StaticDataSource["licenses"]>(licensesUrl),
    fetchData<StaticDataSource["actors"]>(actorsUrl),
    fetchData<StaticDataSource["documents"]>(documentsUrl),
    fetchData<StaticDataSource["permissionTypes"]>(permissionTypesUrl),
    fetchData<StaticDataSource["permissionProperties"]>(permissionPropertiesUrl),
    fetchData<StaticDataSource["species"]>(speciesUrl),
    fetchData<StaticDataSource["rings"]>(ringsUrl),
    fetchData<StaticDataSource["ringSeries"]>(ringSeriesUrl),
    fetchData<StaticDataSource["ringEvents"]>(ringEventsUrl),
  ]);
}

function DataSourceProvider({
  licensesUrl,
  actorsUrl,
  documentsUrl,
  permissionTypesUrl,
  permissionPropertiesUrl,
  speciesUrl,
  ringsUrl,
  ringSeriesUrl,
  ringEventsUrl,
  children,
}: Readonly<{
  licensesUrl: string,
  actorsUrl: string,
  documentsUrl: string,
  permissionTypesUrl: string,
  permissionPropertiesUrl: string,
  speciesUrl: string,
  ringsUrl: string,
  ringSeriesUrl: string,
  ringEventsUrl: string,
  children: React.ReactNode;
}>) {
  const {data, error, isLoading} = useSWR([
    licensesUrl,
    actorsUrl,
    documentsUrl,
    permissionTypesUrl,
    permissionPropertiesUrl,
    speciesUrl,
    ringsUrl,
    ringSeriesUrl,
    ringEventsUrl,
  ], fetchAppData);
  if (error) {
    console.warn("PANIC!")
    console.log(error);
  }
  const dataSource = useMemo(() => new StaticDataSource(
    data ? data[1] : {},
    data ? data[0] : {},
    data ? data[6] : {},
    data ? data[7] : {},
    data ? data[8] : [],
    data ? data[2] : {},
    data ? data[3] : {},
    data ? data[4] : {},
    data ? data[5] : {},
    isLoading
  ), [data, isLoading])
  return (
    <DataSourceContext.Provider value={dataSource}>{children}</DataSourceContext.Provider>
  )
}

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
      <Suspense fallback={<Sidebar {...sidebarProps}>{children}</Sidebar>}>
        <NavStateProvider>
          <Sidebar {...sidebarProps}>
            <DataSourceProvider
              licensesUrl={`${basePath}/data/bird-ringing/licenses.json`}
              actorsUrl={`${basePath}/data/bird-ringing/actors.json`}
              documentsUrl={`${basePath}/data/bird-ringing/documents.json`}
              permissionTypesUrl={`${basePath}/data/bird-ringing/permissionTypes.json`}
              permissionPropertiesUrl={`${basePath}/data/bird-ringing/permissionProperties.json`}
              speciesUrl={`${basePath}/data/bird-ringing/species.json`}
              ringsUrl={`${basePath}/data/bird-ringing/rings.json`}
              ringSeriesUrl={`${basePath}/data/bird-ringing/ringSeries.json`}
              ringEventsUrl={`${basePath}/data/bird-ringing/ringEvents.json`}
            >
              {children}
            </DataSourceProvider>
          </Sidebar>
        </NavStateProvider>
      </Suspense>
    </NavContext.Provider>
  )
}