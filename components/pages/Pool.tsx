import React, { FC, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { usePool } from "modules/pool";
import { PairResponse } from "modules/common";
import { PoolFormType, ProvideFormMode } from "types/common";
import WithdrawForm from "components/pool/withdraw/WithdrawForm";
import ProvideForm from "components/pool/provide/ProvideForm";

type Props = {
  pair: PairResponse;
};

const Pool: FC<Props> = ({ pair }) => {
  const [type, setType] = useState(PoolFormType.Provide);
  const [mode, setMode] = useState(ProvideFormMode.Double);
  const pool = usePool({
    pairContract: pair.contract_addr,
    lpTokenContract: pair?.liquidity_token,
  });

  if (!pool) {
    return null;
  }

  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">
          {type === PoolFormType.Provide && (
            <ProvideForm
              pair={pair}
              pool={pool}
              mode={mode}
              onModeClick={setMode}
              type={type}
              onTypeClick={setType}
            />
          )}
          {type === PoolFormType.Withdraw && (
            <WithdrawForm
              pair={pair}
              pool={pool}
              type={type}
              onTypeClick={setType}
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Pool;
