import React, { FC, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { usePool } from "modules/pool";
import { PairResponse } from "modules/common";
import { PoolFormType } from "types/common";

import { StakeLpForm, UnstakeLpForm } from "modules/generator";
import PoolGraph from "components/pool/PoolGraph";

type Props = {
  pair: PairResponse;
};

const Stake: FC<Props> = ({ pair }) => {
  const [type, setType] = useState(PoolFormType.Stake);
  const [isChartOpen, setIsChartOpen] = useState(false);

  const pool = usePool({
    pairContract: pair.contract_addr,
    lpTokenContract: pair?.liquidity_token,
  });

  const renderStakeLpForm = () => {
    if (pool == null || pool.token1 == null || pool.token2 == null) {
      return null;
    }

    return (
      <StakeLpForm
        pair={pair}
        pool={pool}
        type={type}
        onTypeClick={setType}
        isChartOpen={isChartOpen}
        onChartClick={() => setIsChartOpen(!isChartOpen)}
      />
    );
  };

  const renderUnstakeLpForm = () => {
    return (
      <UnstakeLpForm
        pair={pair}
        pool={pool}
        type={type}
        onTypeClick={setType}
        isChartOpen={isChartOpen}
        onChartClick={() => setIsChartOpen(!isChartOpen)}
      />
    );
  };

  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">
          {type === PoolFormType.Stake && renderStakeLpForm()}
          {type === PoolFormType.Unstake && renderUnstakeLpForm()}
        </Box>

        {/* @ts-expect-error */}
        {isChartOpen && <PoolGraph tokens={tokens} />}
      </Flex>
    </Box>
  );
};

export default Stake;
