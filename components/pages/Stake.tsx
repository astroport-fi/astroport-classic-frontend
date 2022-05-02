import React, { FC, useState } from "react";
import { withRouter, NextRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import { PoolFormTypeFactory, PoolFormType } from "types/common";
import { usePool } from "modules/pool";
import { PairResponse } from "modules/common";
import { StakeLpForm, UnstakeLpForm } from "modules/generator";

type Props = {
  pair: PairResponse;
  router: NextRouter;
};

const Stake: FC<Props> = ({ pair, router }) => {
  const [type, setType] = useState<PoolFormType>(
    PoolFormTypeFactory(String(router.query["type"])) || PoolFormType.Stake
  );

  const pool = usePool({
    pairContract: pair.contract_addr,
    lpTokenContract: pair?.liquidity_token,
  });

  const renderStakeLpForm = () => {
    if (pool == null || pool.token1 == null || pool.token2 == null) {
      return null;
    }

    return (
      <StakeLpForm pair={pair} pool={pool} type={type} onTypeClick={setType} />
    );
  };

  const renderUnstakeLpForm = () => {
    return (
      <UnstakeLpForm
        pair={pair}
        pool={pool}
        type={type}
        onTypeClick={setType}
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
      </Flex>
    </Box>
  );
};

export default withRouter(Stake);
