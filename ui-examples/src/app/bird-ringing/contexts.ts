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

export const NavInfoContext = createContext<NavInfo>({setPath: () => {}});
export const DataSourceContext = createContext<DataSource>(new StaticDataSource({}, {}, {}, true));

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
