/* eslint-disable react/jsx-key */
import React, { FC } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { useTable, useSortBy } from "react-table";
import { getTokenDenom } from "@arthuryeti/terra";

import Table from "components/Table";
import Tr from "components/Tr";
import Td from "components/Td";
import PoolItem from "components/pool/PoolItem";
import { Pair } from "types/common";
import ChevronDownIcon from "components/icons/ChevronDownIcon";

type Props = {
  items: Pair[];
};

const PoolList: FC<Props> = ({ items }) => {
  const columns: any = React.useMemo(
    () => [
      {
        Header: "Pool Name",
        accessor: "name",
        sortType: (rowA: any, rowB: any) => {
          const rowAToken = getTokenDenom(rowA.original.asset_infos[0]);
          const rowBToken = getTokenDenom(rowB.original.asset_infos[0]);

          return rowAToken.localeCompare(rowBToken);
        },
      },
      {
        Header: "My Liquidity",
        accessor: "myShareInUst",
        sortType: (rowA, rowB) => {
          return rowA.original.total_share - rowB.original.total_share;
        },
      },
      {
        Header: "Depth",
        accessor: "totalShareInUst",
        sortType: (rowA, rowB) => {
          return rowA.original.total_share - rowB.original.total_share;
        },
      },
      {
        Header: "",
        accessor: "actions",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: items }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

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
      <Box {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              <PoolItem row={row} />
            </Tr>
          );
        })}
      </Box>
    </Table>
  );
};

export default PoolList;
