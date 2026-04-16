import React from "react";
import { ColumnSpec, DataSpec, getProperty } from "./Table";
import Link from "next/link";

type CardListProps<TData> = {
  items: (DataSpec<TData> & {href?: string})[],
  rows: ColumnSpec<TData>,
  labelKey: keyof TData,
  subLabelKey?: keyof TData,
  contentKey?: keyof TData,
}

export function CardList<TData extends {id: string}>(
  {
    items,
    rows,
    labelKey,
    subLabelKey,
    contentKey,
  }: CardListProps<TData>
) {
  return (
    <div className="row px-2">
      {items.map(item => {
        const label = getProperty(item, labelKey);
        const subLabel = subLabelKey ? getProperty(item, subLabelKey) : undefined;
        const content = contentKey ? getProperty(item, contentKey) : undefined;
        const hasRows = Object.keys(rows).length > 0;
        const nav = item.href ? <Link href={item.href} className="btn btn-primary">View {label}</Link> : <></>
        return (
          <div className="col-sm-4 p-2" key={item.id}>
            <div className="card">
              <h5 className="card-header">{label}</h5>
              {content || subLabel || !hasRows ? <div className="card-body">
                {subLabel ? <h6 className="card-subtitle mb-2 text-body-secondary">{subLabel}</h6> : <></>}
                {content ? <p className="card-text">{content}</p> : <></>}
                {hasRows ? <></> : nav}
              </div> : <></>}
              {hasRows ? <ul className="list-group list-group-flush">
                {Object.keys(rows).map((row) => {
                  return (
                    <li key={row} className="list-group-item"><em>{rows[row as keyof TData]}:</em> {getProperty(item, row as keyof TData)}</li>
                  )
                })}
              </ul> : <></>}
              <div className="card-body">
                {hasRows ? nav : <></>}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}