import React, { FC } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useAddress } from "@arthuryeti/terra";
import { useTokenInfo, handleTinyAmount, Route } from "modules/common";
import {
  usePriceImpact,
  usePriceImpactColor,
  useSwapRoutePath,
} from "modules/swap";

import FormFee from "components/common/FormFee";
import ConnectWalletModal from "components/modals/ConnectWalletModal";

type Props = {
  from: string;
  amount1: string;
  to: string;
  amount2: string;
  fee: any;
  price: string;
  formattedPrice: string;
  isLoading: boolean;
  swapRoute: Route[];
  isFormValid: boolean;
  txFeeNotEnough?: boolean;
  error: any;
  onConfirmClick: () => void;
};

const SwapFormFooter: FC<Props> = ({
  from,
  amount1,
  to,
  amount2,
  price,
  formattedPrice,
  isLoading,
  isFormValid,
  txFeeNotEnough,
  swapRoute,
  error,
  fee,
  onConfirmClick,
}) => {
  const swapRoutePath = useSwapRoutePath(swapRoute);
  const { getSymbol } = useTokenInfo();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const priceImpact = usePriceImpact({ from, to, amount1, amount2, price });
  const priceImpactColor = usePriceImpactColor(priceImpact);
  const address = useAddress();

  const renderRightMetric = () => {
    if (!isFormValid) {
      return null;
    }

    if (swapRoute?.length > 1) {
      return (
        <>
          {swapRoutePath.tooltip != null ? (
            <Box d="inline-block">
              <Tooltip
                label={swapRoutePath.tooltip}
                placement="top"
                aria-label="Complete Swap Route"
              >
                <Text textStyle="medium">{swapRoutePath.text}</Text>
              </Tooltip>
            </Box>
          ) : (
            <Text textStyle="medium">{swapRoutePath}</Text>
          )}
          <Text textStyle="small" variant="dimmed">
            Route
          </Text>
        </>
      );
    }

    return (
      <>
        <Text textStyle="medium" color={priceImpactColor}>
          {handleTinyAmount(priceImpact, "0.00")}%
        </Text>
        <Text textStyle="small" variant="dimmed">
          Price Impact
        </Text>
      </>
    );
  };

  return (
    <Flex justify="space-between" px={["4", "12"]} mt="6">
      <Box flex={1} color="white">
        {isFormValid && (
          <>
            <Text textStyle="medium">
              1 {getSymbol(to)} = {formattedPrice} {getSymbol(from)}
            </Text>
            <Text textStyle="small" variant="dimmed">
              Exchange Rate
            </Text>
          </>
        )}
      </Box>
      <Box flex="15px 0" />
      <Flex flex={1} align="center" flexDirection="column">
        {!address ? (
          <Flex justify="center">
            <Button variant="primary" type="button" onClick={onOpen}>
              Connect your wallet
            </Button>
            <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
          </Flex>
        ) : (
          <Button
            variant="primary"
            type="button"
            onClick={onConfirmClick}
            isLoading={isLoading}
            isDisabled={
              !isFormValid || !!error || fee == null || txFeeNotEnough
            }
            width={["125px", "auto"]}
          >
            <Text fontSize={["xs", "sm"]}>Swap Tokens</Text>
          </Button>
        )}
        {isFormValid && (
          <Box color="white">
            <FormFee fee={fee} />
          </Box>
        )}
      </Flex>
      <Box flex="15px 0" />
      <Box flex={1} textAlign="right" color="white">
        {renderRightMetric()}
      </Box>
    </Flex>
  );
};

export default SwapFormFooter;
