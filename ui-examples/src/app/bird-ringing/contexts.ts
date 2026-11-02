import { createContext, useContext } from "react";
import { DataAPI } from "./common";

export const DataContext = createContext<DataAPI | null>(null);

export function useDataAPI() {
    const data = useContext(DataContext);
    if (data) {
        return data;
    }
    throw new Error("No Data API available.")
}