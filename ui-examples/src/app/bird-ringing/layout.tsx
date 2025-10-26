"use client"
import Link from "next/link";
import { useNavInfo, NavInfoContext, toPath, DataSourceContext } from "./contexts";
import { Suspense, useMemo } from "react";
import { usePathname } from 'next/navigation';
import { StaticDataSource } from "./common";
import { fetchData } from "../utils";
import useSWR from 'swr';

function BasePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {path} = useNavInfo();
  const contextTitle: string = "Bird ringing"
  const navItems: {label: string, href: string, id: string}[] = [
    {label: "Actor list view", href: "/bird-ringing/actor-list-view", id: "actor-list-view"},
    {label: "Actor view", href: "/bird-ringing/actor-view/?entryId=actor-0", id: "actor-view"},
    {label: "License list view", href: "/bird-ringing/license-list-view", id: "license-list-view"},
    {label: "License view", href: "/bird-ringing/license-view/?entryId=license-0", id: "license-view"}
  ]
  const dropdownItems: {label: string, href: string}[] = []
  const firstNav = path ? path[0]?.id : undefined;
  return (
    <>
      <aside style={{display: "flex"}}>
        <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary" style={{width: "280px"}}>
          <Link href="/bird-ringing" className="d-flex align-items-center p-3 bg-primary text-white text-decoration-none">
            <i className="bi fs-4 pe-2 bi-check-circle-fill" />
            <span className="fs-4">{contextTitle}</span>
          </Link>
          <ul className="nav nav-pills p-3 flex-column">
            {navItems.map((ni, index) => {
              const isActive = firstNav === ni.id;
              return (
                <li key={index} className="nav-item"><Link href={ni.href} className={`nav-link ${isActive ? "active" : ""}`} aria-current="page">{ni.label}</Link></li>
              )
            })}
          </ul>
          {dropdownItems.length > 0 ? <>
            <hr />
            <div className="dropdown">
              <a href="#" className="d-flex align-items-center p-3 link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <strong>Utils</strong>
              </a>
              <ul className="dropdown-menu text-small shadow">
                {dropdownItems.map((ddi, index) => (
                  <li key={index}><Link className="dropdown-item" href={ddi.href}>{ddi.label}</Link></li>
                ))}
              </ul>
            </div>
          </> : <></>}
        </div>
      </aside>
      <main className="p-3 flex-grow-1 overflow-auto">
        {children}
      </main>
    </>
  );
}

function NavStateProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const path = useMemo(() => toPath(pathname.split("/").slice(2)), [pathname]);
  return (
    <NavInfoContext.Provider value={{path}}>{children}</NavInfoContext.Provider>
  )
}

function fetchAppData([licensesUrl, actorsUrl]: [string, string]) {
  return Promise.all([
    fetchData<StaticDataSource["licenses"]>(licensesUrl),
    fetchData<StaticDataSource["actors"]>(actorsUrl),
  ]);
}

function DataSourceProvider({
  licensesUrl,
  actorsUrl,
  children,
}: Readonly<{
  licensesUrl: string,
  actorsUrl: string,
  children: React.ReactNode;
}>) {
  const {data, error, isLoading} = useSWR([licensesUrl, actorsUrl], fetchAppData);
  console.log(error);
  const dataSource = useMemo(() => new StaticDataSource(data ? data[1] : {}, data ? data[0] : {}, isLoading), [data, isLoading])
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
  return (
    <Suspense fallback={<BasePageLayout>{children}</BasePageLayout>}>
      <NavStateProvider>
        <BasePageLayout>
          <DataSourceProvider
            licensesUrl={`${basePath}/data/bird-ringing/licenses.json`}
            actorsUrl={`${basePath}/data/bird-ringing/actors.json`}
          >
            {children}
          </DataSourceProvider>
        </BasePageLayout>
      </NavStateProvider>
    </Suspense>
  )
}