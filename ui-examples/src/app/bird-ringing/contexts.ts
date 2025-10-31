import { createContext, useContext } from "react";
import { DataSource, StaticDataSource } from "./common";

type PathSegment = {
    id: string;
    label: string;
    href?: string;
}

type NavInfo = {
    path?: PathSegment[];
    setPath?(path: PathSegment[] | undefined): void;
}

export type NavItems = (
    {type: "item", label: string, href: string, id: string} |
    {type: "separator"} |
    {type: "heading", label: string}
)[]

export const NavInfoContext = createContext<NavInfo>({setPath: () => {}});
export const NavContext = createContext<NavItems>([]);
export const DataSourceContext = createContext<DataSource>(new StaticDataSource({}, {}, {}, true));

export function useNav() {
    return useContext(NavContext);
}

export function useNavInfo() {
    return useContext(NavInfoContext);
}

export function useDataSource() {
    return useContext(DataSourceContext);
}

export function toPath(list: string[], labels?: Record<string, Omit<PathSegment, "id">>): PathSegment[] {
    return list.map(s => ({
        id: s,
        ...(labels && labels[s] || {label: s})
    }));
}
