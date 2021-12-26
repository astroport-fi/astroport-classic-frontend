/* eslint-disable react/jsx-key */
import React, { FC } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { useTable } from "react-table";

import Table from "components/Table";
import Tr from "components/Tr";
import Td from "components/Td";
import PoolTr from "components/table/PoolTr";

type Props = {
  columns: any[];
  data: any;
  emptyMsg?: string;
};

const PoolTable: FC<Props> = ({ columns, data, emptyMsg = "No pools" }) => {
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Table {...getTableProps()}>
      {headerGroups.map((headerGroup) => (
        <Tr isHead {...headerGroup.getHeaderGroupProps()}>
          <Td flexShrink={0} maxWidth="6"></Td>
          {headerGroup.headers.map((column: any) => (
            <Td
              color="white.700"
              {...column.getHeaderProps()}
              flexBasis={`${column.width}px`}
              flexGrow={column.flexGrow}
            >
              <HStack>
                <Text fontSize="xs" variant="light">
                  {column.render("Header")}
                </Text>
              </HStack>
            </Td>
          ))}
        </Tr>
      ))}
      {rows.length ? (
        <Box {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return <PoolTr row={row} />;
          })}
        </Box>
      ) : (
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
