import React, { FC, useMemo } from "react";
import { Button } from "@chakra-ui/react";
import { useTerraWebapp } from "context/TerraWebappContext";
import { useBalance } from "modules/common";
import { ONE_TOKEN } from "constants/constants";
import num from "libs/num";

type Props = {
  onChange: any;
  asset: string;
  max?: string | number;
  isDisabled?: boolean;
};

const MaxButton: FC<Props> = ({ onChange, max, asset, isDisabled }) => {
  const { taxRate, taxCap } = useTerraWebapp();

  const balance = useBalance(asset);

  const amount = useMemo(() => {
    if (taxRate == null || taxCap == null) {
      return null;
    }

    const formattedTaxCap = taxCap.amount.div(ONE_TOKEN).toString();
    const formattedTaxRate = taxRate.toString();
    const balanceWithBuffer = num(balance).div(ONE_TOKEN).minus(2);
    const taxRateFormula = num("1")
      .plus(formattedTaxRate)
      .times(formattedTaxRate);

    if (asset == "uusd" && max == null) {
      if (balanceWithBuffer.div(taxRateFormula).lt(formattedTaxCap)) {
        return balanceWithBuffer.div(num(formattedTaxRate).plus("1"));
      }

      return balanceWithBuffer.minus(formattedTaxCap);
    }

    if (max != null) {
      return max;
    }

    return num(balance).div(ONE_TOKEN).toFixed(6);
  }, [asset, balance, max, taxCap, taxRate]);

  if (amount == "0") {
    return null;
  }

  return (
    <Button
      type="button"
      variant="mini"
      onClick={() => onChange(amount)}
      isDisabled={!!isDisabled}
    >
      Max
    </Button>
  );
};

export default MaxButton;
