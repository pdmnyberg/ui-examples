import { createContext, useContext } from "react";
import { DataSource, StaticDataSource } from "./common";

export const DataSourceContext = createContext<DataSource>(new StaticDataSource({}, {}, {}, {}, {}, {}, true));

export function useDataSource() {
    return useContext(DataSourceContext);
}
