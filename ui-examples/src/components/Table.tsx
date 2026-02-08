import React from "react";

export type ColumnSpec<TData> = Partial<Record<keyof TData, string | React.ReactNode>>;

export function Table<TData extends {id: string}>({items, columns}: {items: TData[], columns:ColumnSpec<TData>}) {
  return (
    <table className="table">
      <thead>
        <tr>
          {Object.keys(columns).map((c) => <th key={c} scope="col">{columns[c as keyof TData]}</th>)}
        </tr>
      </thead>
      <tbody>
        {items.map(item => {
          return (
            <tr key={item.id}>
              {Object.keys(columns).map(c => {
                const value = item[c as keyof TData];
                const content = React.isValidElement(value) ? value : String(value);
                return (
                  <td key={c}>{content}</td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}