import React, { FC, ReactNode, useCallback, useMemo } from "react";
import { num } from "@arthuryeti/terra";
import { Box } from "@chakra-ui/react";
import { defaultOrderByFn, Row, SortByFn } from "react-table";

import useLocalStorage from "hooks/useLocalStorage";
import { REWARDS_NOTICE } from "constants/constants";
import { useAllPools, AllPoolsPool, usePoolTable } from "modules/pool";
import { useBalances } from "modules/common";

import Card from "components/Card";
import PoolNameTd from "components/table/PoolNameTd";
import NumberInUstTd from "components/table/NumberInUstTd";
import ActionsTd from "components/table/ActionsTd";
import AprTd from "components/table/AprTd";
import FavoriteToggleButton from "components/FavoriteToggleButton";
import PoolTableWrapper from "components/table/PoolTableWrapper";
import PoolTr from "components/table/PoolTr";
import Tr from "components/Tr";
import Td from "components/Td";

type PoolWithUserState = AllPoolsPool & {
  userCanProvideLiquidity: boolean;
};

const uniqueTokens = (pools) => {
  const tokens = new Set<string>();

  for (const { assets } of pools) {
    tokens.add(assets[0]);
    tokens.add(assets[1]);
  }

  return Array.from(tokens);
};

const OtherPools: FC = () => {
  const allPools = useAllPools();
  const notInUsePools = useMemo(
    () => allPools.filter((pool) => !pool.inUse),
    [allPools]
  );
  const [favoritesPools] = useLocalStorage("favoritesPools", []);

  const tokens = uniqueTokens(allPools);
  const balances = useBalances(tokens);

  const poolsWithUserState: PoolWithUserState[] = useMemo(() => {
    return notInUsePools.map((pool) => {
      const [token1, token2] = pool.assets;

      return {
        ...pool,
        userCanProvideLiquidity:
          num(balances[token1]).gt(0) && num(balances[token2]).gt(0),
      };
    });
  }, [notInUsePools, balances]);

  const columns = useMemo(
    () => [
      {
        id: "favorite",
        width: 48,
        flexGrow: 0,
        Cell: ({ row }: any) => (
          <FavoriteToggleButton pair={row.original.assets.toString()} />
        ),
        accessor: "favorite",
        disableSortBy: true,
        sortType: "basic",
      },
      {
        Header: "Pool Name",
        Cell: ({ row }: any) => (
          <PoolNameTd
            assets={row.original.assets}
            pairType={row.original.pairType}
            contract={row.original.contract}
          />
        ),
        accessor: "sortingAssets",
        width: 275,
      },
      {
        Header: "Combined APR",
        Tooltip: REWARDS_NOTICE,
        Cell: ({ row }: any) => <AprTd row={row} />,
        accessor: "rewards.total",
        width: 140,
        disableGlobalFilter: true,
        sortType: (a, b) => a.original.rewards.total - b.original.rewards.total,
      },
      {
        Header: "Total Liquidity",
        Cell: ({ row }: any) => (
          <NumberInUstTd
            type="totalLiquidity"
            tokenTooltip={{
              poolAssets: row.original.poolAssets,
              myLiquidity: row.original.myLiquidity,
              totalLiquidity: row.original.totalLiquidity,
            }}
            value={row.original.totalLiquidityInUst}
            format="0,0"
          />
        ),
        accessor: "totalLiquidityInUst",
        width: 140,
        disableGlobalFilter: true,
      },
      {
        Header: "24h Volume",
        Cell: ({ row }: any) => (
          <NumberInUstTd value={row.original._24hr_volume} format="0,0" />
        ),
        accessor: "_24hr_volume",
        width: 140,
        disableGlobalFilter: true,
      },
      {
        id: "pool-actions",
        Cell: ({ row }: any) => (
          <ActionsTd
            row={row}
            canProvideLiquidity={row.original.userCanProvideLiquidity}
          />
        ),
        accessor: "actions",
        width: 200,
        flex: 1,
        disableSortBy: true,
        disableGlobalFilter: true,
      },
      {
        id: "userCanProvideLiquidity",
        accessor: "userCanProvideLiquidity",
      },
    ],
    [favoritesPools]
  );

  const tableInstance = usePoolTable(
    columns,
    poolsWithUserState,
    "totalLiquidityInUst",
    {
      initialState: {
        hiddenColumns: ["userCanProvideLiquidity"],
      },
      orderByFn: useCallback(
        (
          rows: Row<object>[],
          sortFns: SortByFn<object>[],
          directions: boolean[]
        ) => {
          // userCanProvideLiquidity sort function, sorts false -> true
          const canProvideLiquiditySort = (a, b) =>
            a.original.userCanProvideLiquidity ===
            b.original.userCanProvideLiquidity
              ? 0
              : a.original.userCanProvideLiquidity
              ? -1
              : 1;

          // Always sort by userCanProvideLiquidity first (true -> false)
          return defaultOrderByFn(
            rows,
            [canProvideLiquiditySort, ...sortFns],
            [true, ...directions]
          );
        },
        []
      ),
      stateReducer: (newState, action) => {
        if (newState.sortBy.length > 0) {
          return newState;
        } else {
          // Sort by favorite when all sort options are removed.
          // It's important that we have at least one sortBy
          // at all times, otherwise the rows are not ordered with the orderByFn
          // (https://github.com/TanStack/react-table/blob/v7/src/plugin-hooks/useSortBy.js#L273)
          // and pools the user can provide liquidity into will not be sorted to the top.
          return {
            ...newState,
            sortBy: [
              {
                id: "favorite",
                desc: true,
              },
            ],
          };
        }
      },
    }
  );

  const { getTableBodyProps, rows, page, prepareRow } = tableInstance;

  const tableRows = useMemo<ReactNode[]>(() => {
    const rows = [];

    for (let i = 0; i < page.length; i++) {
      const row = page[i];

      prepareRow(row);

      rows.push(<PoolTr row={row} key={i} />);

      if (page[i + 1]) {
        const currentPool = row.original as PoolWithUserState;
        const nextPool = page[i + 1].original as PoolWithUserState;

        // Add divider row between last pool user can provide liquidity into
        // and first pool that they cannot
        if (
          currentPool.userCanProvideLiquidity &&
          !nextPool.userCanProvideLiquidity
        ) {
          rows.push(
            <Tr role="row" key="assetsNotInMyWalletDivider">
              <Td color="gray.500" fontSize="sm" textAlign="center" role="cell">
                Assets not in my wallet
              </Td>
            </Tr>
          );
        }
      }
    }

    return rows;
  }, [page]);

  return (
    <Card overflow="auto" noPadding>
      <PoolTableWrapper
        hasData={rows.length > 0}
        tableInstance={tableInstance}
        emptyMsg="No pools."
        minW="1080px"
        renderFilters={true}
      >
        <Box backgroundColor="inherit" {...getTableBodyProps()}>
          {tableRows}
        </Box>
      </PoolTableWrapper>
    </Card>
  );
};

export default OtherPools;
