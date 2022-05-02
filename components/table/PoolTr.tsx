import React, { FC } from "react";

import Tr from "components/Tr";
import Td from "components/Td";

type Props = {
  row: any;
};

const PoolTr: FC<Props> = ({ row }) => {
  return (
    <Tr {...row.getRowProps()}>
      {row.cells.map((cell: any) => {
        return (
          <Td
            key={cell}
            fontSize="xs"
            {...cell.getCellProps()}
            flexBasis={`${cell.column.width}px`}
            flexShrink={0}
            flex={cell.column.flex}
          >
            {cell.render("Cell")}
          </Td>
        );
      })}
    </Tr>
  );
};

export default PoolTr;
