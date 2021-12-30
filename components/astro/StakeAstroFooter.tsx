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
  data: any;
  isLoading: boolean;
  isDisabled: boolean;
  onClick: () => void;
  token: any;
  title: string;
};

const StakeAstroFooter: FC<Props> = ({
  data,
  isLoading,
  isDisabled,
  token,
  title,
  onClick,
}) => {
  const { xAstroToken } = useContracts();
  const xAstroBalance = useBalance(xAstroToken);
  const newXAstro = num(token.amount)
    .times(ONE_TOKEN)
    .plus(xAstroBalance)
    .toString();

  return (
    <>
      <CommonFooter
        fee={data.fee}
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
