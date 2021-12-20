/* eslint-disable react/jsx-key */
import React, { FC } from "react";
import { Box, HStack, Text, Link } from "@chakra-ui/react";
import { useTable } from "react-table";

import Table from "components/Table";
import Tr from "components/Tr";
import Td from "components/Td";
import PoolTr from "components/table/PoolTr";

type Props = {
  columns: any[];
  data: any;
};

const PoolTable: FC<Props> = ({ columns, data }) => {
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

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
          <Text fontSize="sm">
            You do not have any locked LP tokens in lockdrop.
          </Text>
        </Tr>
      )}
    </Table>
  );
};

export default PoolTable;
