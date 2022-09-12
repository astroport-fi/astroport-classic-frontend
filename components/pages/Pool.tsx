import React, { FC, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { usePool } from "modules/pool";
import { PoolFormType, ProvideFormMode } from "types/common";
import WithdrawForm from "components/pool/withdraw/WithdrawForm";
import ProvideForm from "components/pool/provide/ProvideForm";

type Props = {
  poolAddress: string;
  lpTokenAddress?: string | undefined;
};

const Pool: FC<Props> = ({ poolAddress, lpTokenAddress }) => {
  const [type, setType] = useState(PoolFormType.Provide);
  const [mode, setMode] = useState(ProvideFormMode.Double);
  const pool = usePool({
    pairContract: poolAddress,
    lpTokenContract: lpTokenAddress || "",
  });

  if (!pool) {
    return null;
  }

  return (
    <Box m="0 auto" pt="6">
      <Flex justify="center">
        <Box maxW="650px" mx="6" mt={[0, 0, 10]} mb={[75, 75, 10]} w="full">
          {type === PoolFormType.Provide && (
            <ProvideForm
              pool={pool}
              mode={mode}
              onModeClick={setMode}
              type={type}
              onTypeClick={setType}
            />
          )}
          {type === PoolFormType.Withdraw && (
            <WithdrawForm pool={pool} type={type} onTypeClick={setType} />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Pool;
