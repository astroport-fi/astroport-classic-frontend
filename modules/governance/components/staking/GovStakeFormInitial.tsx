import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Stack, Text, Flex } from "@chakra-ui/react";
import num from "libs/num";
import { Fee } from "@terra-money/terra.js";
import { AstroFormType } from "types/common";
import { useBalance, FormActionItem, FormActions } from "modules/common";
import Card from "components/Card";
import WarningMessage from "components/common/WarningMessage";
import GovStakeFooter from "./GovStakeFooter";
import TokenInput from "components/TokenInput";
import NewAmountInput from "components/NewAmountInput";

type Props = {
  type: AstroFormType;
  setType: (v: AstroFormType) => void;
  amount: string;
  isLoading: boolean;
  txFeeNotEnough?: boolean;
  fee?: Fee | undefined;
  price?: number;
  astroMintRatio?: number | null;
  error: any;
};

const GovStakeFormInitial: FC<Props> = ({
  type,
  setType,
  amount,
  isLoading,
  txFeeNotEnough,
  fee,
  price,
  astroMintRatio,
  error,
}) => {
  const { control, watch } = useFormContext();
  const { token } = watch();
  const balData = useBalance(token);
  const balance = num(balData)
    .div(10 ** 6)
    .toNumber();
  const adjPrice =
    type === AstroFormType.Unstake && astroMintRatio
      ? (price || 0) * (1 / astroMintRatio)
      : price;
  const adjAmount =
    type === AstroFormType.Stake && astroMintRatio
      ? num(amount || 0).times(astroMintRatio)
      : num(amount || 0);

  return (
    <Box py="12">
      <FormActions>
        <FormActionItem
          label="Stake"
          value={type}
          type={AstroFormType.Stake}
          onClick={() => setType(AstroFormType.Stake)}
        />
        <FormActionItem
          label="Unstake"
          type={AstroFormType.Unstake}
          value={type}
          onClick={() => setType(AstroFormType.Unstake)}
        />
      </FormActions>

      <Stack direction="column" space={2}>
        <Card py={5} px={[8, 8, 12]}>
          <Text textStyle="small" variant="secondary">
            {type == AstroFormType.Stake && "Stake ASTRO to receive xASTRO."}
            {type == AstroFormType.Unstake &&
              "Unstake xASTRO to receive ASTRO."}
          </Text>
        </Card>

        <Card py="10">
          <Flex>
            <Box flex="1" pr="8">
              <Controller
                name="token"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TokenInput hidePrice isSingle {...field} />
                )}
              />
            </Box>
            <Box flex="1">
              <Controller
                name="amount"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <NewAmountInput
                    asset={token}
                    max={balance}
                    price={adjPrice}
                    {...field}
                  />
                )}
              />
            </Box>
          </Flex>
        </Card>

        <GovStakeFooter
          fee={fee}
          type={type}
          isLoading={isLoading}
          isDisabled={!!(!amount || fee == null || txFeeNotEnough)}
          amount={adjAmount.toNumber()}
          astroMintRatio={astroMintRatio}
        />
      </Stack>

      {error && <WarningMessage my="8" content={error} />}
    </Box>
  );
};

export default GovStakeFormInitial;
