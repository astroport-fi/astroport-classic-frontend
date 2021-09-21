import React, { useState } from "react";
import { chakra, Button, HStack, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { trunc, useFeeToString, useTerra } from "@arthuryeti/terra";

import Card from "components/Card";
import LpAmountInput from "components/common/LpAmountInput";
import { useDepositLpToken } from "modules/pool/hooks/useDepositLpToken";
import { useWithdrawLpToken } from "modules/pool/hooks/useWithdrawLpToken";
import { CommonFooter } from 'components/CommonFooter';
import { useAccountShare } from 'modules/pool/hooks/useAccountShare';
import { ONE_TOKEN } from 'constants/constants';

enum StakeMode {
  Deposit = "deposit",
  Withdraw = "withdraw",
}

const StakeForm = () => {
  const { isReady, pairs } = useTerra();

  const [mode, setMode] = useState<StakeMode>(StakeMode.Deposit);

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      lpToken: {
        amount: "",
        pair: pairs[0],
      },
    },
  });

  const lpToken = watch("lpToken");

  const accountShare = useAccountShare(lpToken?.pair?.lpToken);

  const depositOptions =
    mode === StakeMode.Deposit ? [lpToken.amount, lpToken.pair?.lpToken] : [];

  const withdrawOptions =
    mode === StakeMode.Withdraw ? [lpToken.amount, lpToken.pair?.lpToken] : [];

  const {
    submit: deposit,
    fee: depositFee,
    error: depositError,
  } = useDepositLpToken(
    ...(depositOptions as [string, string])
  );

  const {
    submit: withdraw,
    fee: withdrawFee,
    error: withdrawError,
  } = useWithdrawLpToken(
    ...(withdrawOptions as [string, string])
  );

  const submit = async () => {
    mode === StakeMode.Deposit ? deposit() : withdraw();
  };

  const feeString = useFeeToString(depositFee || withdrawFee);

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <HStack spacing="32px" px="32px">
        <Button
          position="relative"
          _before={{
            position: "absolute",
            content: "''",
            h: "20px",
            bg: "white",
            w: "1px",
            right: "-16px",
          }}

          variant="simple"
          isActive={mode === StakeMode.Deposit}
          onClick={() => setMode(StakeMode.Deposit)}
        >
          Farm
        </Button>

        <Button
          variant="simple"
          isActive={mode === StakeMode.Withdraw}
          onClick={() => setMode(StakeMode.Withdraw)}
        >
          Withdraw
        </Button>
      </HStack>

      <Card mb="2">
        <Text variant="light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus beatae error sit autem quidem deserunt delectus quisquam ullam arthuryetihuety dolor ex in, eveniet ratione voluptates fuga sed doloremque impedit eligendi perferendis?
        </Text>
      </Card>

      <Card>
        <Controller
          name="lpToken"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <LpAmountInput {...field} pairs={pairs} isLoading={!isReady} />
          )}
        />
      </Card>

      <Card mt="2">
        <Slider
          variant="brand"
          size="lg"
          min={0}
          defaultValue={0}
          value={Number(lpToken.amount)}
          max={Number(accountShare) / ONE_TOKEN}
          focusThumbOnChange={false}
          step={0.0001}
          onChange={(value) => {
            setValue("lpToken", {
              amount: String(trunc(value, 6)),
              pair: lpToken.pair,
            });
          }}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Card>

      {depositError || withdrawError && (
        <Card mt="3">
          <Text variant="light">{depositError || withdrawError}</Text>
        </Card>
      )}

      <CommonFooter
        cells={[{
          title: "TX fee",
          value: feeString
        }]}
        confirmButton={{
          title: "Confirm",
          isDisabled: !isReady,
          type: "submit"
        }}
      />
    </chakra.form>
  );
};

export default StakeForm;
