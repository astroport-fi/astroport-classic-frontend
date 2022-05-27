import React, { FC } from "react";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

import { ONE_TOKEN } from "constants/constants";

import CommonFooter from "components/CommonFooter";
import Card from "components/Card";
import { useBalance, useContracts } from "modules/common";
import num from "libs/num";
import { fromTerraAmount } from "libs/terra";

type Props = {
  data: any;
  title: string;
  amount: string;
  isLoading: boolean;
  isDisabled: boolean;
  handleChange: (v: number) => void;
  onClick: () => void;
};

const GovUnstakeFooter: FC<Props> = ({
  data,
  isLoading,
  isDisabled,
  amount,
  title,
  onClick,
}) => {
  const { xAstroToken } = useContracts();
  const xAstroBalance = useBalance(xAstroToken);
  const newXAstro = num(xAstroBalance)
    .minus(num(amount).times(ONE_TOKEN))
    .toString();

  return (
    <CommonFooter
      fee={data}
      cells={[
        {
          title: "Current xASTRO",
          value: fromTerraAmount(xAstroBalance),
        },
        {
          title: "New xASTRO",
          value: fromTerraAmount(newXAstro),
        },
        {
          title: "xASTRO APY",
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
  );
};

export default GovUnstakeFooter;
