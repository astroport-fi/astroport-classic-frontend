import React, { FC, useState } from "react";
import { withRouter, NextRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import { PoolFormTypeFactory, PoolFormType } from "types/common";
import { usePool } from "modules/pool";
import { Pool } from "modules/common";
import { StakeLpForm, UnstakeLpForm } from "modules/generator";

type Props = {
  pool: Pool;
  router: NextRouter;
};

const Stake: FC<Props> = ({ pool: pair, router }) => {
  const [type, setType] = useState<PoolFormType>(
    PoolFormTypeFactory(String(router.query["type"])) || PoolFormType.Stake
  );

  const pool = usePool({
    pairContract: pair.pool_address,
    lpTokenContract: pair?.lp_address,
  });

  const renderStakeLpForm = () => {
    if (pool == null || pool.token1 == null || pool.token2 == null) {
      return null;
    }

    return <StakeLpForm pool={pool} type={type} onTypeClick={setType} />;
  };

  const renderUnstakeLpForm = () => {
    if (pool == null || pool.token1 == null || pool.token2 == null) {
      return null;
    }

    return <UnstakeLpForm pool={pool} type={type} onTypeClick={setType} />;
  };

  return (
    <Box m="0 auto" pt="6">
      <Flex justify="center">
        <Box maxW="650px" mx="6" mt={[0, 0, 10]} mb={[100, 100, 25]} w="full">
          {type === PoolFormType.Stake && renderStakeLpForm()}
          {type === PoolFormType.Unstake && renderUnstakeLpForm()}
        </Box>
      </Flex>
    </Box>
  );
};

export default withRouter(Stake);
