import { NavInfoContext, toPath } from "@/contexts";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function NavStateProvider({
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