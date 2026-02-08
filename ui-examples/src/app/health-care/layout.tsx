"use client"
import { Suspense } from "react";
import { NavContext, NavItems } from "@/contexts";
import { Sidebar } from "@/components/Sidebar";
import { NavStateProvider } from "@/components/NavStateProvider";
import { DataContext, HealtCareData, StaticDataSource } from "./contexts";
import { Log, Notification, User, UserRef } from "./common";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: UserRef = {type: "user", id: "current-user"}
  const data: HealtCareData = {
    notifications: new StaticDataSource<Notification>([
      "Det finns saker att göra",
      "Det finns saker att titta på",
      "Det finns saker att tänka på"
    ].map<Notification>((item, index) => ({
      type: "notification",
      id: `notification-${index}`,
      content: item,
      priority: "info",
      user,
    }))),
    logs: new StaticDataSource<Log>([
      "Vårdare besökte vårdtagare",
      "Vårdtagare tog medicin",
      "Vårdare uträttade ärende 'Inköp'"
    ].map<Log>((item, index) => ({
      type: "log",
      id: `log-${index}`,
      content: item,
      createdBy: user,
      createdAt: new Date()
    })))
  }
  const navItems: NavItems =  [
    {type: "heading", label: "Anhörig"},
    {type: "item", label: "Översikt", href: "/health-care/overview", id: "overview"},
    {type: "item", label: "Vårdtagare", href: "/health-care/care-recipients", id: "care-recipients", tags: ["overview"]},
    {type: "item", label: "Logg", href: "/health-care/log", id: "log"},
    {type: "separator"},
    {type: "heading", label: "Planera"},
    {type: "item", label: "Kalender", href: "/health-care/calendar", id: "calendar", tags: ["overview"]},
    {type: "item", label: "Att-göra-lista", href: "/health-care/todo", id: "todo", tags: ["overview"]},
    {type: "separator"},
    {type: "heading", label: "Personligt"},
    {type: "item", label: "Profil", href: "/health-care/profile", id: "profile", tags: ["overview"]},
    {type: "item", label: "Notifieringar", href: "/health-care/notifications", id: "notifications"},
 ]
  const sidebarProps = {
    title: "Vårdadministration",
    rootHref: "/health-care",
    iconRef: "bi-file-medical",
  };
  return (
    <NavContext.Provider value={navItems}>
      <DataContext.Provider value={data}>
        <Suspense fallback={<Sidebar {...sidebarProps}>{children}</Sidebar>}>
          <NavStateProvider>
            <Sidebar {...sidebarProps}>
              <div className="container">
                {children}
              </div>
            </Sidebar>
          </NavStateProvider>
        </Suspense>
      </DataContext.Provider>
    </NavContext.Provider>
  )
}