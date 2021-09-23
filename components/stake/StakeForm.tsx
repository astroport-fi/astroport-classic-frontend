import React, { useState } from "react";
import {
  chakra,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useFeeToString, useTerra } from "@arthuryeti/terra";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import {
  useDepositLpToken,
  useWithdrawLpToken,
  useAccountShare,
} from "modules/pool";
import { ONE_TOKEN } from "constants/constants";

import FormHeader from "components/common/FormHeader";
import FormHeaderItem from "components/common/FormHeaderItem";
import CommonFooter from "components/CommonFooter";

enum StakeMode {
  Deposit = "deposit",
  Withdraw = "withdraw",
}

type FormValues = {
  lpToken: {
    amount: string;
    asset: string;
  };
};

const StakeForm = () => {
  const { isReady, pairs } = useTerra();

  const [mode, setMode] = useState<StakeMode>(StakeMode.Deposit);

  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      lpToken: {
        amount: "",
        asset: pairs[0].lpToken,
      },
    },
  });

  const lpToken = watch("lpToken");

  const accountShare = useAccountShare(lpToken?.asset);

  const depositOptions =
    mode === StakeMode.Deposit ? [lpToken.amount, lpToken.asset] : [];

  const withdrawOptions =
    mode === StakeMode.Withdraw ? [lpToken.amount, lpToken.asset] : [];

  const {
    submit: deposit,
    fee: depositFee,
    error: depositError,
  } = useDepositLpToken(...(depositOptions as [string, string]));

  const {
    submit: withdraw,
    fee: withdrawFee,
    error: withdrawError,
  } = useWithdrawLpToken(...(withdrawOptions as [string, string]));

  const handleChange = (value: number) => {
    setValue("lpToken", {
      ...lpToken,
      amount: String(value),
    });
  };

  const submit = async () => {
    if (mode === StakeMode.Deposit) {
      return deposit();
    }

    withdraw();
  };

  // @ts-expect-error
  const feeString = useFeeToString(depositFee || withdrawFee);

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <FormHeader>
        <FormHeaderItem
          label="Farm"
          value={mode}
          type={StakeMode.Deposit}
          onClick={() => setMode(StakeMode.Deposit)}
        />
        <Text fontSize="xl">|</Text>
        <FormHeaderItem
          label="Withdraw"
          value={mode}
          type={StakeMode.Withdraw}
          onClick={() => setMode(StakeMode.Withdraw)}
        />
      </FormHeader>

      <Card mb="2">
        <Text variant="light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus beatae
          error sit autem quidem deserunt delectus quisquam ullam
          arthuryetihuety dolor ex in, eveniet ratione voluptates fuga sed
          doloremque impedit eligendi perferendis?
        </Text>
      </Card>

      <Card>
        <Controller
          name="lpToken"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} isLpToken />}
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
          onChange={handleChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Card>

      {depositError ||
        (withdrawError && (
          <Card mt="3">
            <Text variant="light">{depositError || withdrawError}</Text>
          </Card>
        ))}

      <CommonFooter
        cells={[
          {
            title: "TX fee",
            value: feeString,
          },
        ]}
        confirmButton={{
          title: "Confirm",
          isDisabled: !isReady,
          type: "submit",
        }}
      />
    </chakra.form>
  );
};

export default StakeForm;
