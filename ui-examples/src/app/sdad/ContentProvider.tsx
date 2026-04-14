"use client"
import { PropsWithChildren, useMemo } from "react";
import { NavContext, NavItems } from "@/contexts";
import { NavStateProvider } from "@/components/NavStateProvider";
import { createMockToken, DataContext, getHost, SDADData } from "./contexts";
import { Dataset, DatasetFile } from "./types";
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
  hostUrl,
  datasetUrl,
  filesUrl,
  children,
}: Readonly<{
  hostUrl: string,
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
    token: createMockToken(hostUrl)
  }), [data, hostUrl])
  return (
    isLoading ? <></> : <DataContext.Provider value={dataSource}>{children}</DataContext.Provider>
  )
}


export default function ContentProvider({
  children,
  navItems,
}: PropsWithChildren<{
  navItems: NavItems;
}>) {
  const basePath = process.env.NEXT_PUBLIC_API_URL || "";
  return (
    <NavContext.Provider value={navItems}>
      <NavStateProvider>
        <DataProvider
          hostUrl={getHost()}
          datasetUrl={`${basePath}/data/sdad/datasets.json`}
          filesUrl={`${basePath}/data/sdad/files.json`}
        >
          {children}
        </DataProvider>
      </NavStateProvider>
    </NavContext.Provider>
  )
}