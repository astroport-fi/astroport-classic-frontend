import React, { FC, useState, useMemo } from "react";
import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useAddress } from "@arthuryeti/terra";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import useLocalStorage from "hooks/useLocalStorage";
import { APR_TOOLTIP, MOBILE_MAX_WIDTH } from "constants/constants";
import { AllPoolsPool } from "types/common";
import { useAllPools } from "modules/pool";
import { searchTokenAdddres } from "modules/common";
import Card from "components/Card";
import CardMobile from "components/CardMobile";
import Search from "components/common/Search";
import TerraWallet from "components/TerraWallet";
import PoolTable from "components/table/PoolTable";
import PoolNameTd from "components/table/PoolNameTd";
import AprTd from "components/table/AprTd";
import NumberInUstTd from "components/table/NumberInUstTd";
import MyPoolActionsTd from "components/table/MyPoolActionsTd";
import FavoriteToggleButton from "components/FavoriteToggleButton";

import { PoolFeed } from "components/feed";

const sortByFavMyLiqudityFn = (a: any, b: any): any => {
  if (a.favorite == b.favorite) {
    return b.myLiquidityInUst - a.myLiquidityInUst;
  } else {
    if (a.favorite) {
      return -1;
    } else if (b.favorite) {
      return 1;
    }
  }
};

const MobileComponent: FC<{ pools: AllPoolsPool[] }> = ({ pools }) => {
  const poolsSorted = pools.sort(sortByFavMyLiqudityFn);
  const { status } = useWallet();
  const [filter, setFilter] = useState("");
  const [filteredPools, setFilteredPools] = useState<AllPoolsPool[]>([]);
  const initialFocusRef = React.useRef();

  const searchPools = (searchTerm: string) => {
    setFilteredPools(searchTokenAdddres(searchTerm, poolsSorted));
    setFilter(searchTerm);
  };

  return (
    <>
      {(status === WalletStatus.WALLET_NOT_CONNECTED ||
        poolsSorted.length === 0) && (
        <CardMobile>
          {status === WalletStatus.WALLET_NOT_CONNECTED && (
            <>
              <Flex mb="2" color="white.500" fontSize="sm">
                Please connect your wallet.
              </Flex>
              <TerraWallet header={false} />
            </>
          )}
          {status !== WalletStatus.WALLET_NOT_CONNECTED &&
            poolsSorted.length === 0 && (
              <Flex
                color="white.500"
                fontSize="sm"
              >{`You need to add liquidity first.`}</Flex>
            )}
        </CardMobile>
      )}
      {poolsSorted.length > 0 && (
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
      )}
      {filter.length > 0 && filteredPools.length == 0 && (
        <CardMobile>
          <Text color="white.500" fontSize="sm">
            No search results.
          </Text>
        </CardMobile>
      )}
      <PoolFeed
        type="mypools"
        pools={filter.length > 0 ? filteredPools : poolsSorted}
      />
    </>
  );
};

const Component: FC<{
  address: string;
  pools: AllPoolsPool[];
  favoritesPools: any[];
}> = ({ address, pools, favoritesPools }) => {
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
        disableGlobalFilter: true,
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
        Header: "My Liquidity",
        Cell: ({ row }: any) => (
          <NumberInUstTd
            type="myLiquidity"
            tokenTooltip={{
              poolAssets: row.original.poolAssets,
              myLiquidity: row.original.myLiquidity,
              totalLiquidity: row.original.totalLiquidity,
            }}
            value={row.original.myLiquidityInUst}
          />
        ),
        accessor: "myLiquidityInUst",
        width: 140,
        disableGlobalFilter: true,
      },
      {
        id: "pool-actions",
        Cell: ({ row }: any) => <MyPoolActionsTd data={row.original} />,
        accessor: "actions",
        width: 200,
        flex: 1,
        disableSortBy: true,
        disableGlobalFilter: true,
      },
    ],
    [favoritesPools]
  );

  return (
    <Card overflow="auto" position="initial" noPadding>
      <PoolTable
        data={pools}
        columns={columns}
        emptyMsg="You need to add liquidity first."
        sortBy="myLiquidityInUst"
        renderFilters={address.length !== 0}
      />
    </Card>
  );
};

const MyPools: FC = () => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
  const address = useAddress();
  const myPools = useAllPools().filter((pool) => pool.inUse);
  const [favoritesPools] = useLocalStorage("favoritesPools", []);

  return isMobile ? (
    <MobileComponent pools={myPools} />
  ) : (
    <Component
      address={address}
      pools={myPools}
      favoritesPools={favoritesPools}
    />
  );
};

export default MyPools;
