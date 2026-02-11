"use client"
import { Suspense } from "react";
import { NavContext, NavItems } from "@/contexts";
import { Sidebar } from "@/components/Sidebar";
import { NavStateProvider } from "@/components/NavStateProvider";
import { DataContext, HealtCareData, StaticDataSource } from "./contexts";
import { Activity, Log, Notification, User, UserRef } from "./common";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: UserRef = {type: "user", id: "current-user"}
  const recipient: UserRef = {type: "user", id: "recipient-user"}
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
    }))),
    activities: new StaticDataSource<Activity>([
      ...([
        "Något planerat att göra",
        "Något mer planerat",
        "Ytterligare planerat"
      ].map<Activity>((title, index) => {
        const a: Activity = {
          type: "activity",
          id: `planned-activity-${index}`,
          recipient: recipient,
          title: title,
          content: "",
          timeNeeded: 1 * 3600,
          priority: "primary",
          status: "new",
          schedule: {
            certainty: "certain",
            time: new Date(Date.UTC(new Date().getFullYear(), index, 1))
          },
          createdBy: user,
          createdAt: new Date()
        };
        return a;
      })),
      ...([
        "Något oplanerat att göra",
        "Något mera oplanerat",
        "Ytterligare oplanerat"
      ].map<Activity>((title, index) => {
        const a: Activity = {
          type: "activity",
          id: `activity-${index}`,
          recipient: recipient,
          title: title,
          content: "",
          timeNeeded: 1 * 3600,
          priority: "primary",
          status: "new",
          createdBy: user,
          createdAt: new Date()
        };
        return a;
      }))
    ])
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