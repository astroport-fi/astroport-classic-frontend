import React, { useMemo } from "react";
import { Text, Flex, Box, ListItem, UnorderedList } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num } from "@arthuryeti/terra";

import { useLockedLpAmount, UnlockState } from "modules/lockdrop";

import Card from "components/Card";
import TokenInput from "components/TokenInput";
import NewAmountInput from "components/NewAmountInput";
import UnlockFormFooter from "components/lockdrop/unlock/UnlockFormFooter";
import { ONE_TOKEN } from "constants/constants";

type Params = {
  state: UnlockState;
  duration: number;
  onClick: () => void;
};

const UnlockFormInitial = ({ state, duration, onClick }: Params) => {
  const { control, watch } = useFormContext();

  const { token, amount } = watch();
  const stakedAmount = useLockedLpAmount(token, duration);

  const balance = useMemo(() => {
    if (stakedAmount == null) {
      return "0";
    }

    return num(stakedAmount).div(ONE_TOKEN).toString();
  }, [stakedAmount]);

  return (
    <>
      <Flex justify="space-between" color="white" mb="4" px="6">
        <Box flex="1">
          <Text fontSize="xl" color="white">
            Unlock LP Tokens
          </Text>
        </Box>
      </Flex>

      <Card mb="2">
        <Text fontSize="xs" color="white.500">
          Once you’ve unlocked your LP tokens you can:
          <UnorderedList fontWeight="500">
            <ListItem>
              Withdraw your liquidity on the “Pools” page under “My Pools”
            </ListItem>
            <ListItem>
              Or stake your LP tokens into the generator to continue receiving
              dual rewards
            </ListItem>
          </UnorderedList>
        </Text>
      </Card>

      <Card>
        <Flex>
          <Box flex="1" pr="8">
            <Controller
              name="token"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TokenInput isSingle isLpToken {...field} />
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
                  {...field}
                  asset={token}
                  balance={balance}
                  balanceLabel="Withdrawable LP Tokens"
                  isLpToken
                  isSingle
                  hideMaxButton
                  isDisabled
                />
              )}
            />
          </Box>
        </Flex>
      </Card>

      {state.error && (
        <Card mt="3">
          <Text variant="light">{state.error}</Text>
        </Card>
      )}

      <UnlockFormFooter
        amount={amount}
        lpToken={token}
        duration={duration}
        data={state}
        onConfirmClick={onClick}
      />
    </>
  );
};

export default UnlockFormInitial;
