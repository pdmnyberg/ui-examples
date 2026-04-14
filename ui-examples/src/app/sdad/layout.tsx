import { NavItems } from "@/contexts";
import { Sidebar } from "@/components/Sidebar";
import "./layout.css";
import { Metadata } from "next";
import ContentProvider from "./ContentProvider";

export const metadata: Metadata = {
  title: "SDA Download Mock UX",
  description: "A mock UX for SDA Download",
};

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems: NavItems =  [
    {type: "heading", label: "Data"},
    {type: "item", label: "Datasets", href: "/sdad/datasets", id: "datasets"},
    {type: "separator"},
    {type: "heading", label: "Settings"},
    {type: "item", label: "Userinfo", href: "/sdad/userinfo", id: "user-info"},
    {type: "separator"},
    {type: "heading", label: "Diagrams"},
    {type: "item", label: "User flow diagram", href: "/diagrams/sda-download", id: "diagram"},
 ]
  const sidebarProps = {
    title: "SDA Download",
    rootHref: "/sdad",
    iconRef: "bi-database",
  };
  return (
    <ContentProvider navItems={navItems}>
      <Sidebar {...sidebarProps}>
        <div className="container-xxl p-0 md-p3">
          {children}
        </div>
      </Sidebar>
    </ContentProvider>
  );
}