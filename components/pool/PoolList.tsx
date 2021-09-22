import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

import Table from "components/Table";
import Tr from "components/Tr";
import Td from "components/Td";
import PoolItem from "components/pool/PoolItem";
import { Pair } from "types/common";

type Props = {
  items: Pair[];
};

const PoolList: FC<Props> = ({ items }) => {
  return (
    <Table>
      <Tr isHead>
        <Td color="white.700">Pool Name</Td>
        <Td color="white.700">My Liquidity</Td>
        <Td color="white.700">Depth</Td>
        <Td color="white.700"></Td>
      </Tr>
      {items.map((item) => {
        return (
          <Tr key={item.contract}>
            <PoolItem item={item} />
          </Tr>
        );
      })}
    </Table>
  );
};

export default PoolList;
