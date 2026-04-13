export type SearchParams<T> = {
    search?: string;
    properties?: Partial<{[P in keyof Omit<T, "type">]: T[P] | T[P][]}>;
    orderBy?: string | string[];
    start?: number;
    limit?: number;
}

export type SearchFunction<T, SP> = (value: T, props: SearchParams<T & SP>["properties"]) => boolean;

export interface DataSource<T extends EntityRef<V>, V extends string = T["type"]> {
    get(ref: EntityRef<V>): T;
    find(params: SearchParams<T>): T[];
    all(): T[]
}

export type EntityRef<T> = {
    id: string;
    type: T;
}

export class StaticDataSource<T extends EntityRef<V>, V extends string = T["type"], SP extends object = object> implements DataSource<T> {
    private _data: T[];
    private _record: Record<string, T>;
    private _customSearch?: SearchFunction<T, SP>;
    constructor(data: T[], customSearch?: SearchFunction<T, SP>) {
        this._customSearch = customSearch;
        this._data = data;
        this._record = data.reduce<Record<string, T>>((acc, d) => {
            acc[d.id] = d;
            return acc;
        }, {});
    }

    get(ref: EntityRef<V>) {
        return this._record[ref.id];
    }

    find({orderBy, limit, start, properties}: SearchParams<T & SP>) {
        const filter = this._customSearch === undefined ? () => true : this._customSearch;
        const data = this._data.filter(item => filter(item, properties))
        const sorted = Array.isArray(orderBy) ? data : data.sort((a, b) => {
            const aVal = a[orderBy as keyof (typeof a)]
            const bVal = b[orderBy as keyof (typeof b)]

            if (typeof aVal === "number" && typeof bVal === "number") {
                return aVal - bVal;
            }
            if (typeof aVal === "string" && typeof bVal === "string") {
                return aVal.localeCompare(bVal);
            }
            if (aVal instanceof Date && bVal instanceof Date) {
                return aVal.getTime() - bVal.getTime();
            }
            return 0;
        });
        const selectedStart = start || 0;
        return limit === undefined ? sorted : sorted.slice(selectedStart, selectedStart + limit);
    }

    all() {
        return this._data;
    }
}

export function toList<T extends Record<string, T[keyof T]>>(record: T): T[keyof T][] {
  return Object.keys(record).map((key) => record[key])
}

export function toLocalTime(date: Date): string {
    return date.toLocaleString("sv-SE", { timeZone: "UTC" })
}

export function toLocalDate(date: Date) {
    return date.toLocaleDateString("sv-SE", { timeZone: "UTC" })
}