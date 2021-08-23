import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

import Table from "components/Table";
import Tr from "components/Tr";
import Td from "components/Td";
import PoolItem from "components/pool/PoolItem";

type Props = {
  pools: any[];
};

const PoolList: FC<Props> = ({ pools }) => {
  return (
    <Table>
      <Tr isHead>
        <Td>Pool Name</Td>
        <Td>My Liquidity</Td>
        <Td>APY</Td>
        <Td>Depth</Td>
        <Td>24h Volume</Td>
        <Td></Td>
      </Tr>
      {pools.map((pool) => {
        return (
          <Tr key={pool}>
            <PoolItem pool={pool} />
          </Tr>
        );
      })}
    </Table>
  );
};

export default PoolList;
