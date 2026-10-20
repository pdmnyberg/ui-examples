import { SearchableItem, TypedSearchableItem, useFilter, useItemSelections } from "@/app/hooks";
import { ColumnSpec, Table } from "./Table";
import { ActionDropDown, ActionItems } from "./ActionDropDown";
import { Pagination, usePagination } from "./Pagination";

type FilterableTableProps<T> = {
  items: TypedSearchableItem<T>[],
  columns: ColumnSpec<T>,
  filterLabel: string,
  batchActions?: ActionItems,
  batchActionLabel?: string;
  sorting?: (a: SearchableItem, b: SearchableItem) => number;
}

export function FilterableTable<T>(
  {
    items,
    columns,
    filterLabel,
    batchActions,
    batchActionLabel = "Batch actions",
    sorting
  }: FilterableTableProps<T>
) {
  const {filter, setFilter, filteredItems} = useFilter(items as SearchableItem[]);
  const sortedItems = sorting ? filteredItems : [...filteredItems].sort(sorting)
  const {
    selectedItems,
    toggleItems,
    allSelected,
    handleItemSelection
  } = useItemSelections(new Set(sortedItems.map(r => r.id)));

  const {items: pageItems, currentPage, pages} = usePagination(sortedItems, 50);
  const selectablePageItems = pageItems.map(item => ({
    ...item,
    properties: {
      ...item.properties,
      id: {
        component: <input type="checkbox" onChange={handleItemSelection} checked={selectedItems.has(item.id)} data-actor-id={item.id}/>
      },
    }
  }))
  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text">Filter</span>
        <input
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="form-control"
          placeholder={Object.values(columns).filter(c => !!c).join(", ")}
          aria-label={filterLabel}
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3">
        <button className="btn btn-outline-secondary" type="button" onClick={toggleItems}>{allSelected ? "Select None" : "Select All"}</button>
        <span className="input-group-text flex-grow-1" >{selectedItems.size} of {items.length} selected</span>
        {batchActions ? <ActionDropDown items={batchActions} label={batchActionLabel} /> : <></>}
      </div>
      <Pagination pages={pages} currentPage={currentPage}/>
      <Table items={selectablePageItems} columns={columns} />
      <Pagination pages={pages} currentPage={currentPage}/>
    </>
  )
}