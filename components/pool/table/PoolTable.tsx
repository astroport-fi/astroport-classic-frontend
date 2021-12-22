/* eslint-disable react/jsx-key */
import React, { FC, useMemo } from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import {
  useTable,
  useSortBy,
  useExpanded,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { PairResponse, getTokenDenom, useTokenInfo } from "modules/common";
import { useConnectedWallet } from "@terra-money/wallet-provider";

import Table from "components/Table";
import Tr from "components/Tr";
import Td from "components/Td";
import PoolTableFilter from "components/pool/table/PoolTableFilter";
import PoolTr from "components/pool/table/PoolTr";
import PoolNameTd from "components/pool/table/PoolNameTd";
import PoolConnectWallet from "components/pool/table/PoolConnectWallet";
import MyLiquidityTd from "components/pool/table/MyLiquidityTd";
import DepthTd from "components/pool/table/DepthTd";
import ActionsTd from "components/table/ActionsTd";
import ChevronDownIcon from "components/icons/ChevronDownIcon";

type Props = {
  data: PairResponse[];
  paginationSize?: number;
};

const PoolTable: FC<Props> = ({ data, paginationSize = 10 }) => {
  const { getSymbol } = useTokenInfo();
  const wallet = useConnectedWallet();

  const columns = useMemo(
    () => [
      {
        Header: "Pool Name",
        Cell: ({ row }: any) => <PoolNameTd row={row} />,
        accessor: ({ asset_infos }: any) => {
          const token1 = getSymbol(getTokenDenom(asset_infos[0]));
          const token2 = getSymbol(getTokenDenom(asset_infos[1]));
          return `${token1}-${token2}`;
        },
        sortType: (rowA: any, rowB: any) => {
          const rowAToken = getTokenDenom(rowA.original.asset_infos[0]);
          const rowBToken = getTokenDenom(rowB.original.asset_infos[0]);

          return rowAToken.localeCompare(rowBToken);
        },
      },
      {
        Header: "My Liquidity",
        Cell: ({ row }: any) => <MyLiquidityTd row={row} />,
        accessor: "myShareInUst",
        sortType: (rowA: any, rowB: any) => {
          return rowA.original.total_share - rowB.original.total_share;
        },
      },
      {
        Header: "Combined APY",
        Cell: () => <Text>xxxx</Text>,
        accessor: "apy",
      },
      {
        Header: "Total Liquidity",
        Cell: ({ row }: any) => <DepthTd row={row} />,
        accessor: "totalShareInUst",
        sortType: (rowA: any, rowB: any) => {
          return rowB.original.total_share - rowA.original.total_share;
        },
      },
      // {
      //   Header: "Volume",
      //   Cell: () => <Text>xxxx</Text>,
      //   accessor: "volume",
      // },
      {
        Header: PoolTableFilter,
        width: 1000,
        Cell: ({ row }: any) => <ActionsTd row={row} />,
        accessor: "actions",
        disableSortBy: true,
      },
    ],
    []
  );

  const tableInstance = useTable(
    { columns, data, initialState: { pageSize: paginationSize } },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canNextPage,
    setPageSize,
    state: { pageSize },
    // state: { expanded },
  } = tableInstance;

  return (
    <Table {...getTableProps()}>
      {headerGroups.map((headerGroup) => (
        <Tr isHead {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <Td color="white.700">
              <HStack>
                <Box flex={1} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </Box>
                {column.isSorted &&
                  (column.isSortedDesc ? (
                    <ChevronDownIcon />
                  ) : (
                    <ChevronDownIcon style={{ transform: "rotate(180deg)" }} />
                  ))}
              </HStack>
            </Td>
          ))}
        </Tr>
      ))}

      {!wallet ? (
        <Box {...getTableBodyProps()}>
          <PoolConnectWallet />
        </Box>
      ) : null}

      {page.length ? (
        <Box {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return <PoolTr key={row.id} row={row} />;
          })}
        </Box>
      ) : null}

      {canNextPage && (
        <Tr borderTopWidth={1} borderTopColor="white.200">
          <Td textAlign="center" pt="1" pb="2">
            <Button
              variant="simple"
              color="brand.purple"
              fontSize="sm"
              onClick={() => setPageSize(pageSize + paginationSize)}
            >
              Show more
            </Button>
          </Td>
        </Tr>
      )}
    </Table>
  );
};

export default PoolTable;
