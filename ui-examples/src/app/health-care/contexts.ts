import { createContext, useContext } from "react";
import { EntityRef, Log, Notification } from "./common";

export interface DataSource<T extends EntityRef<V>, V extends string = T["type"]> {
    get(ref: EntityRef<V>): T;
    find(search: string, properties: {[P in keyof Omit<T, "type">]: T[P] | T[P][]}): T[];
    all(): T[]
}

export type HealtCareData = {
    notifications: DataSource<Notification>,
    logs: DataSource<Log>;
};

export const DataContext = createContext<HealtCareData | null>(null);

export function useData(): HealtCareData {
    const data = useContext(DataContext);

    if (!data) {
        throw new Error("No health care data available.")
    }

    return data;
}

export class StaticDataSource<T extends EntityRef<V>, V extends string = T["type"]> implements DataSource<T> {
    private _data: T[];
    private _record: Record<string, T>;
    constructor(data: T[]) {
        this._data = data;
        this._record = data.reduce<Record<string, T>>((acc, d) => {
            acc[d.id] = d;
            return acc;
        }, {});
    }

    get(ref: EntityRef<V>) {
        return this._record[ref.id];
    }

    find(_search: string, _properties: {[P in keyof Omit<T, "type">]: T[P] | T[P][]}) {
        return this._data;
    }

    all() {
        return this._data;
    }
}