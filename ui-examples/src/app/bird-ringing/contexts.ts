import { createContext, useContext } from "react";

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

export function useNavInfo() {
    return useContext(NavInfoContext);
}

export function toPath(list: string[], labels?: Record<string, Omit<PathSegment, "id">>): PathSegment[] {
    return list.map(s => ({
        id: s,
        ...(labels && labels[s] || {label: s})
    }));
}
