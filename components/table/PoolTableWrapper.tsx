import React, { FC, ReactNode } from "react";
import { Box, Button, HStack, Text, Tooltip } from "@chakra-ui/react";
import useAddress from "hooks/useAddress";

import ChevronDownIcon from "components/icons/ChevronDownIcon";
import Tr from "components/Tr";
import Td from "components/Td";
import PoolConnectWallet from "components/table/PoolConnectWallet";
import Table from "components/Table";

import { TableInstance } from "react-table";
import InfoIcon from "components/icons/InfoIcon";
import PoolFilters from "components/table/PoolFilters";
import PoolPagination from "components/table/PoolPagination";

type Props = {
  hasData: boolean;
  tableInstance: TableInstance;
  emptyMsg: string;
  children: ReactNode;
  minW?: string;
  renderFilters: boolean;
};

const PoolTableWrapper: FC<Props> = ({
  hasData,
  tableInstance,
  emptyMsg,
  children,
  minW,
  renderFilters,
}) => {
  const address = useAddress();

  const {
    getTableProps,
    headerGroups,
    pageOptions,
    state: { pageIndex, globalFilter },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    setGlobalFilter,
  } = tableInstance;

  const renderHeadTdContents = (column) => {
    return (
      <HStack
        display="flex"
        alignItems="center"
        color={column.isSorted ? "white" : "inherit"}
      >
        <Text fontSize="xs" variant="light">
          {column.render("Header")}
          {column.canSort}
        </Text>
        {column.Tooltip && <InfoIcon width="1rem" height="1rem" />}
        <Box>
          <ChevronDownIcon
            w="2"
            transform={`${column.isSortedDesc ? "" : "rotate(180deg)"}`}
            opacity={`${column.isSorted ? 1 : 0}`}
          />
        </Box>
      </HStack>
    );
  };

  const renderHeadTd = (column) => {
    if (column.Tooltip) {
      return (
        <Tooltip label={column.Tooltip} placement="top" aria-label="More info">
          {renderHeadTdContents(column)}
        </Tooltip>
      );
    }

    if (column.id == "favorite") {
      return;
    }

    if (column.id == "pool-actions") {
      return (
        renderFilters && (
          <PoolFilters filter={globalFilter} setFilter={setGlobalFilter} />
        )
      );
    }

    return renderHeadTdContents(column);
  };

  return (
    <>
      <Table minW={minW} {...getTableProps()}>
        {headerGroups.map((headerGroup, i) => (
          <Tr key={i} isHead {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any, i) => (
              <Td
                key={i}
                color="white.700"
                {...column.getHeaderProps()}
                flexBasis={`${column.width}px`}
                flexShrink={0}
                flex={column.flex}
              >
                {column.canSort ? (
                  <Button
                    display="flex"
                    variant="simple"
                    {...column.getSortByToggleProps()}
                  >
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
        {hasData && children}
        {!hasData && address && (
          <Tr>
            <Box ml="8">
              <Text fontSize="sm">{emptyMsg}</Text>
            </Box>
          </Tr>
        )}
        {pageOptions.length <= 1 && (
          <Tr borderBottomWidth="0">
            <Box py="2"></Box>
          </Tr>
        )}
      </Table>

      {pageOptions.length > 1 && (
        <PoolPagination
          pageIndex={pageIndex}
          PageLength={pageOptions.length}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          onClickPrev={() => previousPage()}
          onClickNext={() => nextPage()}
        />
      )}
    </>
  );
};

export default PoolTableWrapper;
