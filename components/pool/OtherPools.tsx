import React, { FC, ReactNode, useCallback, useMemo, useState } from "react";
import num from "libs/num";
import { useMediaQuery, Box, Text, Flex } from "@chakra-ui/react";
import { defaultOrderByFn, OrderByFn, Row } from "react-table";
import useLocalStorage from "hooks/useLocalStorage";
import { APR_TOOLTIP, MOBILE_MAX_WIDTH } from "constants/constants";
import { PoolWithUserState } from "types/common";
import { useAllPools, usePoolTable } from "modules/pool";
import { partition, useBalances, searchTokenAdddres } from "modules/common";
import Card from "components/Card";
import CardMobile from "components/CardMobile";
import Search from "components/common/Search";
import PoolNameTd from "components/table/PoolNameTd";
import NumberInUstTd from "components/table/NumberInUstTd";
import ActionsTd from "components/table/ActionsTd";
import AprTd from "components/table/AprTd";
import FavoriteToggleButton from "components/FavoriteToggleButton";
import PoolTableWrapper from "components/table/PoolTableWrapper";
import PoolTr from "components/table/PoolTr";
import Tr from "components/Tr";
import Td from "components/Td";

import { PoolFeed } from "components/feed";

const uniqueTokens = (pools: any) => {
  const tokens = new Set<string>();

  for (const { assets } of pools) {
    tokens.add(assets[0]);
    tokens.add(assets[1]);
  }

  return Array.from(tokens);
};

const sortByFavTotalLiqudityFn = (a: any, b: any): any => {
  if (a.favorite == b.favorite) {
    return b.totalLiquidityInUst - a.totalLiquidityInUst;
  } else {
    if (a.favorite) {
      return -1;
    } else if (b.favorite) {
      return 1;
    }
  }
};

const MobileComponent: FC<{ pools: PoolWithUserState[] }> = ({ pools }) => {
  const [poolLiquid, poolNoLiquid] = partition(
    pools,
    (pool: any) => pool.userCanProvideLiquidity
  );
  const poolLiquidSorted = poolLiquid.sort(sortByFavTotalLiqudityFn);
  const poolNoLiquidSorted = poolNoLiquid.sort(sortByFavTotalLiqudityFn);
  const [filter, setFilter] = useState("");
  const [filteredLiquidPools, setFilteredLiquidPools] = useState<
    PoolWithUserState[]
  >([]);
  const [filteredNoLiquidPools, setFilteredNoLiquidPools] = useState<
    PoolWithUserState[]
  >([]);
  const initialFocusRef = React.useRef();

  // if both pools have results, show asset msg
  const showAssetMsg =
    (filter.length == 0 &&
      poolLiquidSorted.length > 0 &&
      poolNoLiquidSorted.length > 0) ||
    (filter.length > 0 &&
      filteredLiquidPools.length > 0 &&
      filteredNoLiquidPools.length > 0);

  const searchPools = (searchTerm: string) => {
    setFilteredLiquidPools(searchTokenAdddres(searchTerm, poolLiquidSorted));
    setFilteredNoLiquidPools(
      searchTokenAdddres(searchTerm, poolNoLiquidSorted)
    );
    setFilter(searchTerm);
  };

  return (
    <>
      <Flex mb="4">
        <Search
          color="white"
          iconStyle={{ color: "white" }}
          borderColor="brand.deepBlue"
          placeholder="Search Token"
          onChange={(e) => searchPools(e.target.value)}
          variant="search"
          // @ts-ignore
          ref={initialFocusRef}
        />
      </Flex>
      {filter.length > 0 &&
        filteredLiquidPools.length == 0 &&
        filteredNoLiquidPools.length == 0 && (
          <CardMobile>
            <Text color="white.500" fontSize="sm">
              No search results.
            </Text>
          </CardMobile>
        )}
      <PoolFeed
        type="otherpools"
        pools={filter.length > 0 ? filteredLiquidPools : poolLiquidSorted}
      />
      {showAssetMsg && (
        <Text textAlign="center" pt="25px" pb="45px" color="white.600">
          Assets not in my wallet
        </Text>
      )}
      <PoolFeed
        type="otherpools"
        pools={filter.length > 0 ? filteredNoLiquidPools : poolNoLiquidSorted}
      />
    </>
  );
};

const Component: FC<{ pools: PoolWithUserState[]; favoritesPools: any[] }> = ({
  pools,
  favoritesPools,
}) => {
  const columns = useMemo(
    () => [
      {
        id: "favorite",
        width: 48,
        flexGrow: 0,
        Cell: ({ row }: any) => (
          <FavoriteToggleButton pool={row.original.assets.toString()} />
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
        Tooltip: APR_TOOLTIP,
        Cell: ({ row }: any) => <AprTd row={row} />,
        accessor: "rewards.total",
        width: 140,
        disableGlobalFilter: true,
        sortType: (a: any, b: any) =>
          a.original.rewards.total - b.original.rewards.total,
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

  const tableInstance = usePoolTable(columns, pools, "totalLiquidityInUst", {
    initialState: {
      hiddenColumns: ["userCanProvideLiquidity"],
    },
    orderByFn: useCallback(
      (
        rows: Row<object>[],
        sortFns: OrderByFn<object>[],
        directions: boolean[]
      ) => {
        // userCanProvideLiquidity sort function, sorts false -> true
        const canProvideLiquiditySort = (a: any, b: any) =>
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
    stateReducer: (newState) => {
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
  });

  const { getTableBodyProps, rows, page, prepareRow } = tableInstance;

  const tableRows = useMemo<ReactNode[]>(() => {
    const rows = [];

    for (let i = 0; i < page.length; i++) {
      const row = page[i];

      if (!row) continue;

      prepareRow(row);

      rows.push(<PoolTr row={row} key={i} />);

      if (page[i + 1]) {
        const currentPool = row.original as PoolWithUserState;
        const nextPool = page[i + 1]?.original as PoolWithUserState;

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

const OtherPools: FC = () => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
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
          num(balances[token1 || ""]).gt(0) &&
          num(balances[token2 || ""]).gt(0),
      };
    });
  }, [notInUsePools, balances]);

  return isMobile ? (
    <MobileComponent pools={poolsWithUserState} />
  ) : (
    <Component pools={poolsWithUserState} favoritesPools={favoritesPools} />
  );
};

export default OtherPools;
