import React, { FC, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { usePool } from "modules/pool";
import { PairResponse } from "modules/common";
import { PoolFormType, ProvideFormMode } from "types/common";

import WithdrawForm from "components/pool/withdraw/WithdrawForm";
import ProvideForm from "components/pool/provide/ProvideForm";
import PoolGraph from "components/pool/PoolGraph";

type Props = {
  pair: PairResponse;
};

const Pool: FC<Props> = ({ pair }) => {
  const [type, setType] = useState(PoolFormType.Provide);
  const [mode, setMode] = useState(ProvideFormMode.Double);
  const [isChartOpen, setIsChartOpen] = useState(false);

  const pool = usePool({
    pairContract: pair.contract_addr,
    lpTokenContract: pair?.liquidity_token,
  });
  const tokens = [pool?.token1, pool?.token2];

  const renderProvideForm = () => {
    if (pool == null || pool.token1 == null || pool.token2 == null) {
      return null;
    }

    return (
      <ProvideForm
        pair={pair}
        pool={pool}
        mode={mode}
        onModeClick={setMode}
        type={type}
        onTypeClick={setType}
        isChartOpen={isChartOpen}
        onChartClick={() => setIsChartOpen(!isChartOpen)}
      />
    );
  };

  const renderWithdrawForm = () => {
    return (
      <WithdrawForm
        pair={pair}
        pool={pool}
        mode={mode}
        onModeClick={setMode}
        type={type}
        onTypeClick={setType}
      />
    );
  };

  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">
          {type === PoolFormType.Provide && renderProvideForm()}
          {type === PoolFormType.Withdraw && renderWithdrawForm()}
        </Box>

        {/* @ts-expect-error */}
        {isChartOpen && <PoolGraph tokens={tokens} />}
      </Flex>
    </Box>
  );
};

export default Pool;
