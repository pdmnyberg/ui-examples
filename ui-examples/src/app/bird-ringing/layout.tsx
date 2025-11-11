"use client"
import Link from "next/link";
import { useNavInfo, NavInfoContext, toPath, DataSourceContext, useNav, NavContext, NavItems } from "./contexts";
import { Suspense, useMemo, useState } from "react";
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
  const navItems = useNav();
  const dropdownItems: {label: string, href: string}[] = []
  const firstNav = path ? path[0] : {id: undefined, extendedId: undefined};
  const [navIsOpen, setNavIsOpen] = useState(true);

  return (
    <>
      <aside className="d-flex flex-shrink-0 sidebar" data-is-open={navIsOpen}>
        <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary sidebar-content">
          <Link href="/bird-ringing" className="d-flex align-items-center p-3 pe-5 bg-primary text-white text-decoration-none">
            <i className="bi fs-4 lh-1 pe-2 bi-feather" />
            <span className="d-flex flex-column">
              <span className="fs-4 lh-1">{contextTitle}</span>
            </span>
          </Link>
          <ul className="nav nav-pills p-3 flex-column">
            {navItems.map((ni, index) => {
              if (ni.type === "item") {
                const isActive = firstNav.extendedId === ni.id || firstNav.id === ni.id;
                return <li key={index} className="nav-item"><Link href={ni.href} className={`nav-link ${isActive ? "active" : ""}`} aria-current="page">{ni.label}</Link></li>
              } else if (ni.type === "separator") {
                return <li key={index}><hr /></li>
              } else if (ni.type === "heading") {
                return <li key={index} className="nav-item"><h3 className="fs-5">{ni.label}</h3></li>
              }
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
      <main className="p-3 flex-grow-1 overflow-auto position-relative">
        <button className="btn btn-primary position-fixed z-3" type="button" aria-label="Toggle navigation" onClick={() => setNavIsOpen(!navIsOpen)}>
          <i className="bi fs-2 bi-list" />
        </button>
        <div className="py-5" />
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

function fetchAppData([licensesUrl, actorsUrl, documentsUrl]: [string, string, string]) {
  return Promise.all([
    fetchData<StaticDataSource["licenses"]>(licensesUrl),
    fetchData<StaticDataSource["actors"]>(actorsUrl),
    fetchData<StaticDataSource["documents"]>(documentsUrl),
  ]);
}

function DataSourceProvider({
  licensesUrl,
  actorsUrl,
  documentsUrl,
  children,
}: Readonly<{
  licensesUrl: string,
  actorsUrl: string,
  documentsUrl: string,
  children: React.ReactNode;
}>) {
  const {data, error, isLoading} = useSWR([licensesUrl, actorsUrl, documentsUrl], fetchAppData);
  console.log(error);
  const dataSource = useMemo(() => new StaticDataSource(data ? data[1] : {}, data ? data[0] : {}, data ? data[2] : {}, isLoading), [data, isLoading])
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
    {type: "item", label: "Species list", href: "/bird-ringing/species-list-view", id: "species-list-view"},
    {type: "item", label: "Permissions list", href: "/bird-ringing/permissions-list-view", id: "permissions-list-view"},
    {type: "separator"},
    {type: "heading", label: "Diagrams"},
    {type: "item", label: "User workflow", href: "/bird-ringing/diagrams/bird-ringing-user-workflow", id: "diagrams/bird-ringing-user-workflow/"},
  ]
  return (
    <NavContext.Provider value={navItems}>
      <Suspense fallback={<BasePageLayout>{children}</BasePageLayout>}>
        <NavStateProvider>
          <BasePageLayout>
            <DataSourceProvider
              licensesUrl={`${basePath}/data/bird-ringing/licenses.json`}
              actorsUrl={`${basePath}/data/bird-ringing/actors.json`}
              documentsUrl={`${basePath}/data/bird-ringing/documents.json`}
            >
              {children}
            </DataSourceProvider>
          </BasePageLayout>
        </NavStateProvider>
      </Suspense>
    </NavContext.Provider>
  )
}