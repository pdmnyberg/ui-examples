"use client"
import { NavContext, NavItems } from "@/contexts";

export function NavProvider({
  children,
  items,
}: Readonly<{
  children: React.ReactNode;
  items: NavItems;
}>) {
  return (
    <NavContext.Provider value={items}>{children}</NavContext.Provider>
  )
}