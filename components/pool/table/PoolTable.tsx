/* eslint-disable react/jsx-key */
import React, { FC, useMemo } from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useTable, useSortBy, useExpanded, usePagination } from "react-table";

import { PairResponse, getTokenDenom } from "modules/common";

import Table from "components/Table";
import Tr from "components/Tr";
import Td from "components/Td";
import PoolTr from "components/pool/table/PoolTr";
import PoolNameTd from "components/pool/table/PoolNameTd";
import MyLiquidityTd from "components/pool/table/MyLiquidityTd";
import DepthTd from "components/pool/table/DepthTd";
import ActionsTd from "components/pool/table/ActionsTd";
import ChevronDownIcon from "components/icons/ChevronDownIcon";

type Props = {
  data: PairResponse[];
  paginationSize?: number;
};

const PoolTable: FC<Props> = ({ data, paginationSize = Infinity }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Pool Name",
        Cell: ({ row }: any) => <PoolNameTd row={row} />,
        accessor: "name",
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
        sortType: (rowA, rowB) => {
          return rowA.original.total_share - rowB.original.total_share;
        },
      },
      {
        Header: "Combined APY",
        Cell: () => <Text>xxxx</Text>,
        accessor: "apy",
      },
      {
        Header: "Depth",
        Cell: ({ row }: any) => <DepthTd row={row} />,
        accessor: "totalShareInUst",
        sortType: (rowA, rowB) => {
          return rowB.original.total_share - rowA.original.total_share;
        },
      },
      {
        Header: "Volume",
        Cell: () => <Text>xxxx</Text>,
        accessor: "volume",
      },
      {
        Header: "",
        Cell: ({ row }: any) => <ActionsTd row={row} />,
        accessor: "actions",
        disableSortBy: true,
      },
    ],
    []
  );

  const tableInstance = useTable(
    // @ts-expect-error
    { columns, data, initialState: { pageSize: paginationSize } },
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
          {headerGroup.headers.map((column: any) => (
            <Td
              color="white.700"
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              <HStack>
                <Box>{column.render("Header")}</Box>
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
          <Td textAlign="center">
            <Button
              variant="simple"
              color="brand.purple"
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
