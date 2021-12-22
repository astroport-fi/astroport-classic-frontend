import React, { FC, useEffect } from "react";
import {
  Button,
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { motion, useAnimation } from "framer-motion";
import { TxStep, num, useBalance } from "@arthuryeti/terra";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import { SwapState } from "modules/swap";

// import GearIcon from "components/icons/GearIcon";
// import GraphIcon from "components/icons/GraphIcon";
import Card from "components/Card";
import TokenInput from "components/TokenInput";
import NewAmountInput from "components/NewAmountInput";
import SwapFormFooter from "components/swap/SwapFormFooter";
import SwapFormWarning from "components/swap/SwapFormWarning";
import SlippagePopover from "components/popovers/SlippagePopover";
import ConnectWalletModal from "components/modals/ConnectWalletModal";
import ArrowDownIcon from "components/icons/ArrowDown";
import { ONE_TOKEN } from "constants/constants";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHStack = motion(HStack);

type Props = {
  token1: string;
  amount1?: string;
  token2: string;
  amount2?: string;
  price: string;
  state: SwapState;
  isReverse: boolean;
  expertMode: boolean;
  isSecondInputDisabled: boolean;
  onInputChange: (name: string) => void;
  onExpertModeChange: (expertMode: boolean) => void;
  onClick: () => void;
};

const SwapFormInitial: FC<Props> = ({
  token1,
  token2,
  amount2,
  amount1,
  price,
  state,
  expertMode,
  isSecondInputDisabled,
  onInputChange,
  onExpertModeChange,
  onClick,
}) => {
  const wallet = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { control, setValue } = useFormContext();
  const card1Control = useAnimation();
  const card2Control = useAnimation();
  const token1Balance = useBalance(token1);

  const reverse = async () => {
    setValue("token1", token2);
    // setValue("amount1", amount2);
    setValue("token2", token1);
  };

  const getInputProps = (field) => {
    return {
      ...field,
      onChange: (value) => {
        onInputChange(field.name);
        const fieldToUpdate = field.name === "amount1" ? "amount2" : "amount1";
        if (num(value).eq(0) || value == "") {
          setValue(fieldToUpdate, "");
        }
        field.onChange(value);
      },
    };
  };

  useEffect(() => {
    card1Control.start({ y: 0 });
    card2Control.start({ y: 0 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box mt="24">
      <Flex justify="space-between" align="center" color="white" mb="6" px="6">
        <MotionBox
          flex="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Text fontSize="xl">Swap</Text>
        </MotionBox>
        <MotionHStack
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          spacing="2"
        >
          <Controller
            name="slippage"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SlippagePopover
                {...field}
                expertMode={expertMode}
                onExpertModeChange={onExpertModeChange}
              />
            )}
          />
          {/* <IconButton
            aria-label="Graph"
            icon={<GraphIcon />}
            size="xs"
            isRound
            variant="icon"
          /> */}
        </MotionHStack>
      </Flex>

      <MotionBox
        key="card1"
        borderRadius="xl"
        bg="brand.blue"
        py="8"
        px="12"
        border="solid 2px rgba(255, 255, 255, 0.1)"
        initial={{ y: -30 }}
        animate={card1Control}
      >
        <Flex>
          <Box flex="1">
            <Controller
              name="token1"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TokenInput {...field} />}
            />
          </Box>
          <Box flex="1" ml="8">
            <Controller
              name="amount1"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <NewAmountInput
                  asset={token1}
                  max={num(token1Balance).div(ONE_TOKEN).dp(6).toNumber()}
                  {...getInputProps(field)}
                />
              )}
            />
          </Box>
        </Flex>
      </MotionBox>

      <MotionFlex
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        justify="center"
        position="relative"
        h="2"
      >
        <Flex
          justify="center"
          align="center"
          borderRadius="100%"
          bg="brand.deepBlue"
          p="1"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <IconButton
            aria-label="Switch"
            icon={<ArrowDownIcon />}
            onClick={reverse}
            variant="icon"
            size="xs"
            bg="brand.deepBlue"
            isRound
          />
        </Flex>
      </MotionFlex>

      <MotionBox
        key="card2"
        borderRadius="xl"
        bg="brand.purple"
        py="8"
        px="12"
        border="solid 2px rgba(255, 255, 255, 0.1)"
        initial={{ y: 30 }}
        animate={card2Control}
      >
        <Flex>
          <Box flex="1">
            <Controller
              name="token2"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TokenInput {...field} />}
            />
          </Box>
          <Box flex="1" ml="8">
            <Controller
              name="amount2"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <NewAmountInput
                  asset={token2}
                  isDisabled={isSecondInputDisabled}
                  {...getInputProps(field)}
                />
              )}
            />
          </Box>
        </Flex>
      </MotionBox>

      {wallet.status === WalletStatus.WALLET_CONNECTED && state.error ? (
        <Card mt="3">
          <Text textStyle="small" variant="secondary">
            {state.error}
          </Text>
        </Card>
      ) : (
        <SwapFormWarning />
      )}

      {wallet.status === WalletStatus.WALLET_NOT_CONNECTED ? (
        <Flex justify="center" mt="6">
          <Button variant="primary" type="button" onClick={onOpen}>
            Connect your wallet
          </Button>
          <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
        </Flex>
      ) : (
        <SwapFormFooter
          from={token1}
          to={token2}
          isLoading={state.txStep == TxStep.Estimating}
          isDisabled={state.txStep != TxStep.Ready}
          price={price}
          fee={state.fee}
          onConfirmClick={onClick}
        />
      )}
    </Box>
  );
};

export default SwapFormInitial;
