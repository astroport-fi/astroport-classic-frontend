/* eslint-disable react/jsx-key */
import React, { FC } from "react";
import { Box, HStack, Text, Button } from "@chakra-ui/react";
import { useAddress } from "@arthuryeti/terra";
import { useTable, useSortBy } from "react-table";

import Table from "components/Table";
import Tr from "components/Tr";
import Td from "components/Td";
import PoolTr from "components/table/PoolTr";
import PoolConnectWallet from "components/table/PoolConnectWallet";

import ChevronDownIcon from "components/icons/ChevronDownIcon";

type Props = {
  columns: any[];
  data: any;
  sortBy: string;
  emptyMsg?: string;
};

const PoolTable: FC<Props> = ({
  columns,
  data,
  sortBy,
  emptyMsg = "No pools",
}) => {
  const address = useAddress();
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: sortBy,
            desc: true,
          },
        ],
      },
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const renderHeadTd = (column) => {
    return (
      <HStack color={column.isSorted ? "white" : "inherit"}>
        <Text fontSize="xs" variant="light">
          {column.render("Header")}
          {column.canSort}
        </Text>
        <span>
          {" "}
          {column.isSorted ? (
            column.isSortedDesc ? (
              <ChevronDownIcon w="2" />
            ) : (
              <ChevronDownIcon w="2" transform="rotate(180deg)" />
            )
          ) : (
            ""
          )}{" "}
        </span>
      </HStack>
    );
  };

  return (
    <Table {...getTableProps()}>
      {headerGroups.map((headerGroup) => (
        <Tr isHead {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: any) => (
            <Td
              color="white.700"
              {...column.getHeaderProps()}
              flexBasis={`${column.width}px`}
            >
              {column.canSort ? (
                <Button variant="simple" {...column.getSortByToggleProps()}>
                  {renderHeadTd(column)}
                </Button>
              ) : (
                renderHeadTd(column)
              )}
            </Td>
          ))}
        </Tr>
      ))}
      {!address && <PoolConnectWallet />}
      {rows.length > 0 && (
        <Box {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return <PoolTr row={row} />;
          })}
        </Box>
      )}
      {!rows.length && address && (
        <Tr>
          <Box ml="8">
            <Text fontSize="sm">{emptyMsg}</Text>
          </Box>
        </Tr>
      )}
      <Tr borderBottomWidth="0">
        <Box py="2"></Box>
      </Tr>
    </Table>
  );
};

export default PoolTable;
