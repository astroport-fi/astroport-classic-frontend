import React from "react";
import {
  Text,
  Flex,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num, TxStep, useBalance } from "@arthuryeti/terra";

import { StakeLpTokenState } from "modules/lp";
import { ONE_TOKEN } from "constants/constants";
import { PoolFormType } from "types/common";

import Card from "components/Card";
import TokenInput from "components/TokenInput";
import NewAmountInput from "components/NewAmountInput";
import AstroSlider from "components/AstroSlider";
import StakeActions from "components/lp/stake/StakeActions";
import StakeFormFooter from "components/lp/stake/StakeFormFooter";

type Params = {
  state: StakeLpTokenState;
  type: PoolFormType;
  onTypeClick: any;
  isChartOpen: boolean;
  onChartClick: () => void;
  onClick: () => void;
};

const StakeFormInitial = ({
  type,
  onTypeClick,
  isChartOpen,
  onChartClick,
  state,
  onClick,
}: Params) => {
  const { control, watch, setValue } = useFormContext();

  const token = watch("token");
  const amount = watch("amount");
  const balance = useBalance(token);
  const max = num(balance).div(ONE_TOKEN).toNumber();

  const handleChange = (value: number) => {
    setValue("amount", String(value));
  };

  return (
    <>
      <StakeActions
        type={type}
        isChartOpen={isChartOpen}
        onChartClick={onChartClick}
        onTypeClick={onTypeClick}
      />

      <Card mb="2">
        <Text textStyle="small" variant="secondary">
          ASTRO Generators support &quot;dual liquidity mining.&quot; Stake your
          Astroport LP tokens here to receive ASTRO governance tokens AND
          third-party governance tokens.
        </Text>
      </Card>

      <Card>
        <Flex>
          <Box flex="1">
            <Controller
              name="token"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TokenInput {...field} isLpToken isSingle />
              )}
            />
          </Box>
          <Box flex="1" pl="8">
            <Controller
              name="amount"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <NewAmountInput asset={token} {...field} />
              )}
            />
          </Box>
        </Flex>
      </Card>

      <Card mt="2">
        <AstroSlider
          min={0}
          minLabel="0%"
          max={max}
          maxLabel="100%"
          step={0.01}
          value={+amount}
          onChange={handleChange}
        />
      </Card>

      {state.error && (
        <Card mt="2">
          <Text textStyle="small" variant="secondary">
            {state.error}
          </Text>
        </Card>
      )}

      <StakeFormFooter data={state} onConfirmClick={onClick} />
    </>
  );
};

export default StakeFormInitial;
