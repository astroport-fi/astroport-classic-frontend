import {
  Column,
  TableOptions,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useCallback } from "react";

// Filter only displayed assets from column:sortingAssets
const filterPoolAssets = (rows: any, columns: any, filterValue: string) => {
  return rows.filter((row) => {
    const query = filterValue.toLowerCase();
    const assets = row.original.sortingAssets;

    if (!assets) {
      return true;
    }

    for (const asset of assets) {
      const string = asset ? String(asset).toLowerCase() : "";

      // If the sortingAsset string looks like an address (starts with "terra"),
      // then the query must begin with "terra" and also match. If the sortingAsset string
      // does not look like an address (e.g. a symbol), then any query can match.
      // This allows the search to be useful when the query is short (e.g. 1 character),
      // otherwise it'd match lots of pools by address.
      if (
        (!string.startsWith("terra") || query.startsWith("terra")) &&
        string.includes(query)
      ) {
        return true;
      }
    }

    return false;
  });
};

export function usePoolTable(
  columns: Column<object>[],
  data: object[],
  initialSortBy: string,
  useTableOptions: Partial<TableOptions<object>> = {}
) {
  const assetFilter = useCallback(filterPoolAssets, []);

  const initialState = useTableOptions.initialState || {};
  delete useTableOptions.initialState;

  return useTable(
    {
      columns,
      data,
      globalFilter: assetFilter,
      autoResetGlobalFilter: false,
      autoResetSortBy: false,
      initialState: {
        pageSize: 15,
        sortBy: [
          {
            id: "favorite",
            desc: true,
          },
          {
            id: initialSortBy,
            desc: true,
          },
        ],
        ...initialState,
      },
      ...useTableOptions,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
}
