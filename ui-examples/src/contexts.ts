import { createContext, useContext } from "react";

type PathSegment = {
    id: string;
    extendedId: string;
    label: string;
    href?: string;
}

type NavInfo = {
    path?: PathSegment[];
    setPath?(path: PathSegment[] | undefined): void;
}

export type NavItem = {type: "item", label: string, href: string, id: string, tags?: string[]};

export type NavItems = (
    NavItem |
    {type: "separator"} |
    {type: "heading", label: string}
)[]

export const NavInfoContext = createContext<NavInfo>({setPath: () => {}});
export const NavContext = createContext<NavItems>([]);

export function useNav() {
    return useContext(NavContext);
}

export function useNavInfo() {
    return useContext(NavInfoContext);
}

export function toPath(list: string[], labels?: Record<string, Omit<PathSegment, "id" | "extendedId">>): PathSegment[] {
    return list.map((s, index, items) => ({
        id: s,
        extendedId: items.slice(index).join("/"),
        ...(labels && labels[s] || {label: s})
    }));
}
