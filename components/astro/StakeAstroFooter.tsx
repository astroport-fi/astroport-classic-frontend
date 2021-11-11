import React, { FC } from "react";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { fromTerraAmount, num, useBalance } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";

import CommonFooter from "components/CommonFooter";
import Card from "components/Card";
import { useContracts } from "modules/common";

type Props = {
  isLoading: boolean;
  isDisabled: boolean;
  handleChange: (v: number) => void;
  onClick: () => void;
  token: any;
  title: string;
};

const StakeAstroFooter: FC<Props> = ({
  isLoading,
  isDisabled,
  handleChange,
  token,
  title,
  onClick,
}) => {
  const { xAstroToken } = useContracts();
  const accountShare = useBalance(token?.asset);
  const xAstroBalance = useBalance(xAstroToken);
  const newXAstro = num(token.amount)
    .times(ONE_TOKEN)
    .plus(xAstroBalance)
    .toString();

  return (
    <>
      <Card>
        <VStack spacing={4}>
          <Slider
            variant="brand"
            size="lg"
            min={0}
            defaultValue={0}
            value={Number(token.amount) || 0}
            max={Number(accountShare) / ONE_TOKEN}
            focusThumbOnChange={false}
            step={0.0001}
            onChange={handleChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          {token.amount && Number(accountShare) ? (
            <Text textStyle="medium">
              {(
                (token.amount / (Number(accountShare) / ONE_TOKEN)) *
                100
              ).toFixed(2)}
              %
            </Text>
          ) : null}
        </VStack>
      </Card>

      <CommonFooter
        cells={[
          {
            title: "Current xAstro",
            value: fromTerraAmount(xAstroBalance),
          },
          {
            title: "New xAstro",
            value: fromTerraAmount(newXAstro),
          },
          {
            title: "xAstro APY",
            value: "0%",
          },
          {
            title: "% of voting power",
            value: "0%",
          },
        ]}
        confirmButton={{
          title: title,
          isDisabled,
          isLoading,
          onClick,
        }}
      />
    </>
  );
};

export default StakeAstroFooter;