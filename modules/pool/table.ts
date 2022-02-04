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
    const assets = row.original.sortingAssets;

    if (!assets) {
      return true;
    }

    for (const asset of assets) {
      const string = asset ? String(asset).toLowerCase() : "";

      if (string.includes(filterValue.toLowerCase())) {
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
