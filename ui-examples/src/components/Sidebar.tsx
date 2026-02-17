import { useNavInfo, useNav} from "@/contexts";
import Link from "next/link";
import { useState } from "react";

export function Sidebar({
  title,
  rootHref,
  iconRef,
  children,
}: Readonly<{
  title: string;
  rootHref: string;
  iconRef?: string;
  children: React.ReactNode;
}>) {
  const {path} = useNavInfo();
  const navItems = useNav();
  const dropdownItems: {label: string, href: string}[] = []
  const firstNav = path ? path[0] : {id: undefined, extendedId: undefined};
  const [navIsOpen, setNavIsOpen] = useState(true);

  return (
    <>
      <aside className="d-flex flex-shrink-0 sidebar" data-is-open={navIsOpen}>
        <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary sidebar-content">
          <Link href={rootHref} className="d-flex align-items-center p-3 pe-5 bg-primary text-white text-decoration-none">
            {iconRef ? <i className={`bi fs-4 lh-1 pe-2 ${iconRef}`} /> : <></>}
            <span className="d-flex flex-column">
              <span className="fs-4 lh-1">{title}</span>
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
      <main className="p-1 sm-p-3 flex-grow-1 overflow-auto position-relative">
        <button className="btn btn-primary position-fixed z-3" type="button" aria-label="Toggle navigation" onClick={() => setNavIsOpen(!navIsOpen)}>
          <i className="bi fs-2 bi-list" />
        </button>
        <div className="py-5" />
        {children}
      </main>
    </>
  );
}