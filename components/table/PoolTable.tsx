import React, { FC, useMemo } from "react";
import { Box } from "@chakra-ui/react";

import { usePoolTable } from "modules/pool";

import PoolTableWrapper from "components/table/PoolTableWrapper";
import PoolTr from "components/table/PoolTr";

type Props = {
  columns: any[];
  data: any;
  sortBy: string;
  emptyMsg?: string;
  minW?: string;
  renderFilters?: boolean;
};

const PoolTable: FC<Props> = ({
  columns,
  data,
  sortBy,
  emptyMsg = "No pools.",
  minW,
  renderFilters = true,
}) => {
  const _columns = useMemo(() => columns, [columns]);
  const _data = useMemo(() => data, [data]);

  const tableInstance = usePoolTable(_columns, _data, sortBy);

  const { getTableBodyProps, rows, page, prepareRow } = tableInstance;

  return (
    <PoolTableWrapper
      hasData={rows.length > 0}
      tableInstance={tableInstance}
      emptyMsg={emptyMsg}
      minW={minW}
      renderFilters={renderFilters}
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
