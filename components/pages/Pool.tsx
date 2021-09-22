import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Heading,
  HStack,
  Text,
  Button,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTerra } from "@arthuryeti/terra";

import PoolHeader from "components/pool/PoolHeader";
import WithdrawForm from "components/pool/withdraw/WithdrawForm";
import ProvideForm from "components/pool/provide/ProvideForm";
import PoolHeaderTypeItem from "components/pool/PoolHeaderTypeItem";
import ProvideSingleForm from "components/pool/provide/ProvideSingleForm";
import { usePool } from "modules/pool";
import GraphIcon from "components/icons/GraphIcon";
import PoolGraph from "components/pool/PoolGraph";
import { Pair, PoolFormType, ProvideFormMode } from "types/common";

type Props = {
  pair: Pair;
};

const Pool: FC<Props> = ({ pair }) => {
  const [type, setType] = useState(PoolFormType.Provide);
  const [mode, setMode] = useState(ProvideFormMode.Double);
  const [isChartOpen, setIsChartOpen] = useState(false);

  const pool = usePool({
    pairContract: pair.contract,
    lpTokenContract: pair?.lpToken,
  });
  const tokens = [pool?.token1, pool?.token2];

  const renderProvideForm = () => {
    if (pool.token1 == null || pool.token2 == null) {
      return null;
    }

    if (mode === ProvideFormMode.Double) {
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
    }

    return (
      <ProvideSingleForm
        pair={pair}
        pool={pool}
        tokens={tokens}
        mode={mode}
        onModeClick={setMode}
        type={type}
        onTypeClick={setType}
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

        {isChartOpen && <PoolGraph tokens={tokens} />}
      </Flex>
    </Box>
  );
};

export default Pool;
