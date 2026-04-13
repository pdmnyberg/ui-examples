"use client"
import { Suspense, useMemo } from "react";
import { NavContext, NavItems } from "@/contexts";
import { Sidebar } from "@/components/Sidebar";
import { NavStateProvider } from "@/components/NavStateProvider";
import { DataContext, SDADData } from "./contexts";
import { Dataset, DatasetFile, User } from "./types";
import { StaticDataSource, toList } from "../common";
import "./layout.css";
import { fetchData } from "../utils";
import useSWR from "swr";

function fetchAppData([datasetUrl, filesUrl]: [string, string]) {
  return Promise.all([
    fetchData<Record<string, Dataset>>(datasetUrl),
    fetchData<Record<string, DatasetFile>>(filesUrl),
  ]);
}

function DataProvider({
  datasetUrl,
  filesUrl,
  children,
}: Readonly<{
  datasetUrl: string,
  filesUrl: string,
  children: React.ReactNode;
}>) {
  const {data, error, isLoading} = useSWR([
    datasetUrl,
    filesUrl,
  ], fetchAppData);
  if (error) {
    console.log(error);
  }
  const dataSource = useMemo<SDADData>(() => ({
    datasets: new StaticDataSource<Dataset>(toList(data && data[0] || {})),
    files: new StaticDataSource<DatasetFile>(toList(data && data[1] || {}), (f, properties) => {
      const dataset = properties?.dataset || [];
      const datasets = Array.isArray(dataset) ? dataset : [dataset];
      return properties === undefined ? (
        true
      ) : (
        datasets.map(ds => ds.id).includes(f.dataset.id) ? true : false
      )
    }),
    user: {
        username: "Mock User"
    }
  }), [data, isLoading])
  return (
    isLoading ? <></> : <DataContext.Provider value={dataSource}>{children}</DataContext.Provider>
  )
}


export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const basePath = process.env.NEXT_PUBLIC_API_URL || "";
  const navItems: NavItems =  [
    {type: "heading", label: "Data"},
    {type: "item", label: "Datasets", href: "/sdad/datasets", id: "datasets"},
    {type: "separator"},
    {type: "item", label: "Userinfo", href: "/sdad/userinfo", id: "user-info"},
 ]
  const sidebarProps = {
    title: "SDA Download",
    rootHref: "/sdad",
    iconRef: "bi-database",
  };
  return (
    <NavContext.Provider value={navItems}>
      <Suspense fallback={<Sidebar {...sidebarProps}>{children}</Sidebar>}>
        <NavStateProvider>
          <Sidebar {...sidebarProps}>
            <DataProvider
              datasetUrl={`${basePath}/data/sdad/datasets.json`}
              filesUrl={`${basePath}/data/sdad/files.json`}
            >
              <div className="container-xxl p-0 md-p3">
                {children}
              </div>
            </DataProvider>
          </Sidebar>
        </NavStateProvider>
      </Suspense>
    </NavContext.Provider>
  )
}