"use client"
import Link from "next/link";
import { useNavInfo, NavInfoContext, toPath, DataSourceContext } from "./contexts";
import { Suspense, useMemo, useCallback } from "react";
import { usePathname } from 'next/navigation';
import { StaticDataSource } from "./common";
import { usePromiseData, fetchData } from "../utils";

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
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: "280px"}}>
          <Link href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"><span className="fs-4">{contextTitle}</span></Link>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
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
              <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
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

function DataSourceProvider({
  licensesUrl,
  actorsUrl,
  children,
}: Readonly<{
  licensesUrl: string,
  actorsUrl: string,
  children: React.ReactNode;
}>) {
  const dataFetcher = useCallback(() => Promise.all([
    fetchData<StaticDataSource["licenses"]>(licensesUrl),
    fetchData<StaticDataSource["actors"]>(actorsUrl),
  ]), [licensesUrl, actorsUrl]);
  const defaultData = useMemo<[StaticDataSource["licenses"], StaticDataSource["actors"]]>(() => ([{}, {}]), []);
  const [[licenses, actors], dataError] = usePromiseData(dataFetcher, defaultData);
  console.log(dataError)
  const dataSource = useMemo(() => new StaticDataSource(actors, licenses), [actors, licenses])
  return (
    <DataSourceContext.Provider value={dataSource}>{children}</DataSourceContext.Provider>
  )
}

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const basePath = process.env.BASE_PATH || "";
  return (
    <Suspense fallback={<BasePageLayout>{children}</BasePageLayout>}>
      <NavStateProvider>
        <DataSourceProvider
          licensesUrl={`${basePath}/data/bird-ringing/licenses.json`}
          actorsUrl={`${basePath}/data/bird-ringing/actors.json`}
        >
          <BasePageLayout>{children}</BasePageLayout>
        </DataSourceProvider>
      </NavStateProvider>
    </Suspense>
  )
}