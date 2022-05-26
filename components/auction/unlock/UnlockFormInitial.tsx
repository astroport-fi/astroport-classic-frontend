import React, { useMemo } from "react";
import {
  Text,
  Flex,
  Box,
  ListItem,
  UnorderedList,
  useMediaQuery,
} from "@chakra-ui/react";
import { MOBILE_MAX_WIDTH } from "constants/constants";
import { useFormContext, Controller } from "react-hook-form";
import { AuctionUnlockState, useUserInfo } from "modules/auction";
import Card from "components/Card";
import WarningMessage from "components/common/WarningMessage";
import TokenInput from "components/TokenInput";
import NewAmountInput, { Balance } from "components/NewAmountInput";
import UnlockFormFooter from "components/auction/unlock/UnlockFormFooter";

type Params = {
  state: AuctionUnlockState;
  error: any;
  onClick: () => void;
};

const UnlockFormInitial = ({ state, error, onClick }: Params) => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
  const { control, watch } = useFormContext();
  const userInfo = useUserInfo();

  const balance = useMemo(() => {
    if (userInfo == null) {
      return "0";
    }

    return userInfo.withdrawable_lp_shares;
  }, [userInfo]);

  const { token } = watch();

  return (
    <>
      {!isMobile && (
        <Flex justify="space-between" color="white" mb="4" px="6">
          <Box flex="1">
            <Text fontSize="xl" color="white">
              Unlock LP Tokens
            </Text>
          </Box>
        </Flex>
      )}

      <Card mb="2">
        <Text fontSize="xs" color="white.500" fontWeight="500">
          Once you’ve unlocked your LP tokens you can:
          <UnorderedList>
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

      <Card {...(isMobile && { px: "4", py: "4" })}>
        <Flex {...(isMobile && { borderRadius: "2xl", overflow: "hidden" })}>
          <Box
            flex="1"
            {...(isMobile && { width: "50%", overflow: "hidden" })}
            {...(!isMobile && { pr: "8" })}
          >
            <Controller
              name="token"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TokenInput
                  isSingle
                  isLpToken
                  isMobile={!!isMobile}
                  {...field}
                />
              )}
            />
          </Box>
          <Box flex="1" {...(isMobile && { width: "50%", overflow: "hidden" })}>
            <Controller
              name="amount"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <NewAmountInput
                  {...field}
                  asset={token}
                  balance={balance}
                  isLpToken
                  isSingle
                  balanceLabel="Withdrawable LP Tokens"
                  isMobile={!!isMobile}
                />
              )}
            />
          </Box>
        </Flex>
        {isMobile && (
          <Controller
            name="amount"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Balance asset={token} isMobile={isMobile} {...field} />
            )}
          />
        )}
      </Card>

      {state.error && (
        <Card mt="3">
          <Text textStyle="small" variant="dimmed">
            {state.error}
          </Text>
        </Card>
      )}

      <UnlockFormFooter data={state} onConfirmClick={onClick} />
      {error && <WarningMessage my="8" content={error} />}
    </>
  );
};

export default UnlockFormInitial;
