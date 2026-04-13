"use client"
import { Suspense } from "react";
import { NavContext, NavItems } from "@/contexts";
import { Sidebar } from "@/components/Sidebar";
import { NavStateProvider } from "@/components/NavStateProvider";
import { DataContext, SDADData } from "./contexts";
import { Dataset, DatasetFile, User } from "./types";
import { StaticDataSource } from "../common";
import "./layout.css";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const datasets = Array.from({length: 100}).map<Dataset>((_, index) => ({
    id: `dataset-${index}`,
    type: "dataset",
    files: 3 + (index % 5),
    size: 3 + (index % 5),
    date: new Date().toUTCString(),
  }));
  const datasetFiles = datasets.flatMap<DatasetFile>((ds, di) => Array.from({length: di}).map<DatasetFile>((_, fi) => ({
    id: `file-${di}-${fi}`,
    type: "dataset-file",
    dataset: {id: ds.id, type: "dataset"},
    checksums: ["checksum-1", "checksum-2"],
    decryptedSize: 2000,
    downloadUrl: "",
    filePath: `file-${fi}`,
  })))
  const data: SDADData = {
    datasets: new StaticDataSource<Dataset>(datasets),
    files: new StaticDataSource<DatasetFile>(datasetFiles),
    user: {
        username: "Mock User"
    }
  }
  const navItems: NavItems =  [
    {type: "heading", label: "Data"},
    {type: "item", label: "Datasets", href: "/sdad/datasets", id: "datasets"},
    {type: "separator"},
    {type: "item", label: "Userinfo", href: "/sdad/user-info", id: "user-info"},
 ]
  const sidebarProps = {
    title: "SDA Dowload",
    rootHref: "/sdad",
    iconRef: "bi-database",
  };
  return (
    <NavContext.Provider value={navItems}>
      <DataContext.Provider value={data}>
        <Suspense fallback={<Sidebar {...sidebarProps}>{children}</Sidebar>}>
          <NavStateProvider>
            <Sidebar {...sidebarProps}>
              <div className="container-xxl p-0 md-p3">
                {children}
              </div>
            </Sidebar>
          </NavStateProvider>
        </Suspense>
      </DataContext.Provider>
    </NavContext.Provider>
  )
}