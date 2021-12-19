import React, { FC } from "react";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { fromTerraAmount, num, useBalance } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";

import CommonFooter from "components/CommonFooter";
import Card from "components/Card";
import { useContracts } from "modules/common";

type Props = {
  data: any;
  isLoading: boolean;
  isDisabled: boolean;
  handleChange: (v: number) => void;
  onClick: () => void;
  token: any;
  title: string;
};

const UnstakeAstroFooter: FC<Props> = ({
  data,
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
  const newXAstro = num(xAstroBalance)
    .minus(num(token.amount).times(ONE_TOKEN))
    .toString();

  return (
    <>
      <Card mt="2">
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
      </Card>

      <CommonFooter
        fee={data}
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

export default UnstakeAstroFooter;
