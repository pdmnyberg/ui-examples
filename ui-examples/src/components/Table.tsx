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

export function VerticalTable<TData extends {id: string}>({items, columns, param}: {items: TData[], columns:ColumnSpec<TData>, param: React.ReactNode}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">{param}</th>
          {items.map((item) => <th key={item.id} scope="col">{item.id}</th>)}
        </tr>
      </thead>
      <tbody>
        {Object.keys(columns).map(c => {
          return (
            <tr key={c}>
              <td>{columns[c as keyof TData]}</td>
              {items.map(item => {
                const value = item[c as keyof TData];
                const content = React.isValidElement(value) ? value : String(value);
                return (
                  <td key={item.id}>{content}</td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}