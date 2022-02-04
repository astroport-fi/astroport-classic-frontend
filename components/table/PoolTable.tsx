import React, { FC } from "react";
import { Box } from "@chakra-ui/react";

import { usePoolTable } from "modules/pool";

import PoolTableWrapper from "components/table/PoolTableWrapper";
import PoolTr from "components/table/PoolTr";

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
  const tableInstance = usePoolTable(columns, data, sortBy);

  const { getTableBodyProps, rows, page, prepareRow } = tableInstance;

  return (
    <PoolTableWrapper
      hasData={rows.length > 0}
      tableInstance={tableInstance}
      emptyMsg={emptyMsg}
    >
      <Box backgroundColor="inherit" {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row);
          return <PoolTr key={i} row={row} />;
        })}
      </Box>
    </PoolTableWrapper>
  );
};

export default PoolTable;
