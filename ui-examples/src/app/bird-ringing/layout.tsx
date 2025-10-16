import Link from "next/link";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contextTitle: string = "Bird ringing"
  const navItems: {label: string, href: string}[] = [
    {label: "List view", href: "/bird-ringing/list-view"},
    {label: "Entry view", href: "/bird-ringing/entry-view/?ringerId=ringer-0"}
  ]
  const dropdownItems: {label: string, href: string}[] = []
  return (
    <>
      <aside style={{display: "flex"}}>
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: "280px"}}>
          <Link href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"><span className="fs-4">{contextTitle}</span></Link>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            {navItems.map((ni, index) => {
              const isActive = false;
              return (
                <li key={index} className="nav-item"><Link href={ni.href} className={`nav-link link-body-emphasis ${isActive ? "active" : ""}`} aria-current="page">{ni.label}</Link></li>
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
