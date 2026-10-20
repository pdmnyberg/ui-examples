import Link from "next/link";
import { useMemo, useState } from "react";

export type Page = {
  href: string | null;
  onClick?: () => void;
  rel: string;
};

export function usePagination<T>(items: T[], pageSize: number = 10, labels?: Record<"next" | "previous" | "first" | "last", string>, maximumPages: number | undefined = 10) {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const pageItems = useMemo(() => items.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize), [pageNumber, items, pageSize])
  const numPages = Math.ceil(items.length / pageSize);
  maximumPages = maximumPages === undefined ? numPages : maximumPages;
  const pages = Array.from({length: numPages}).map<Page>((_, index) => ({
    href: String(index + 1),
    onClick: () => setPageNumber(index),
    rel: String(index + 1)
  }))
  const previousPageGroup = Math.max(0, pageNumber - maximumPages);
  const nextPageGroup = Math.min(numPages - 1, pageNumber + maximumPages);
  const sliceStart = Math.max(0, Math.min(pageNumber, pages.length - maximumPages));
  const showedPages: Page[] = numPages > maximumPages ? [
    ...(pageNumber === 0 ? [] : [{
      href: String(previousPageGroup),
      onClick: () => setPageNumber(previousPageGroup),
      rel: "..."
    }]),
    ...pages.slice(sliceStart, pageNumber + maximumPages),
    ...(pageNumber + maximumPages > pages.length ? [] : [{
      href: String(nextPageGroup),
      onClick: () => setPageNumber(nextPageGroup),
      rel: "..."
    }]),
  ] : pages;

  return {
    items: pageItems,
    currentPage: String(pageNumber + 1),
    pages: [
      {
        href: pages.length > 0 ? String(1) : null,
        onClick: pages.length > 0 ? () => setPageNumber(0) : undefined,
        rel: labels?.next || "First",
      },
      {
        href: pageNumber - 1 >= 0 ? String(pageNumber) : null,
        onClick: pageNumber - 1 >= 0 ? () => setPageNumber(pageNumber - 1) : undefined,
        rel: labels?.last || "Previous",
      },
      ...showedPages,
      {
        href: pages.length > pageNumber + 1 ? String(pageNumber + 2) : null,
        onClick: pages.length > pageNumber + 1 ? () => setPageNumber(pageNumber + 1) : undefined,
        rel: labels?.next || "Next",
      },
      {
        href: pages.length > 0 ? String(pages.length) : null,
        onClick: pages.length > 0 ? () => setPageNumber(pages.length - 1) : undefined,
        rel: labels?.last || "Last",
      }
    ]
  }
}

export const Pagination = ({
  pages,
  currentPage,
  label,
}: {
  pages: Page[];
  currentPage?: string;
  label?: string;
}) => {
  return (
    <nav aria-label={label || "Pagination"}>
      <ul className="pagination overflow-auto">
        {pages.map((page, index) => (
          <li
            key={index}
            className={`page-item ${page.href === currentPage ? "active" : ""}`}
          >
            {page.onClick ? (
              <div className="page-link" onClick={page.onClick}>
                {page.rel}
              </div>
            ) : (
                page.href ? (
                    <Link className="page-link" href={page.href}>
                        {page.rel}
                    </Link>
                ) : (
                    <a className="page-link disabled">{page.rel}</a>
                )
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
