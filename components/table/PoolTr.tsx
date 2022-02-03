import React, { FC } from "react";

import Tr from "components/Tr";
import Td from "components/Td";

type Props = {
  row: any;
};

const PoolTr: FC<Props> = ({ row }) => {
  return (
    <Tr {...row.getRowProps()}>
      {row.cells.map((cell) => {
        return (
          <Td
            key={cell}
            fontSize="xs"
            {...cell.getCellProps()}
            flexBasis={`${cell.column.width}px`}
            flexShrink={0}
            flex={cell.column.flex}
            position={cell.column.position}
            right={cell.column.right}
            left={cell.column.left}
            zIndex={cell.column.zIndex}
          >
            {cell.render("Cell")}
          </Td>
        );
      })}
    </Tr>
  );
};

export default PoolTr;
