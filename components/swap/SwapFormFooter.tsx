import React, { FC } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  Tooltip,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useAddress } from "@arthuryeti/terra";
import { handleTinyAmount, Route } from "modules/common";
import {
  usePriceImpact,
  usePriceImpactColor,
  usePriceImpactMultiSwap,
  useSwapRoutePath,
} from "modules/swap";
import FormFee from "components/common/FormFee";
import ConnectWalletModal from "components/modals/ConnectWalletModal";

type Props = {
  from: string;
  amount1: string;
  to: string;
  fee: any;
  price: string | null;
  exchangeRate: string | null;
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
  price,
  exchangeRate,
  isLoading,
  isFormValid,
  txFeeNotEnough,
  swapRoute,
  error,
  fee,
  onConfirmClick,
}) => {
  const address = useAddress();
  const swapRoutePath = useSwapRoutePath(swapRoute);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const priceImpact = usePriceImpact({ from, to, price });
  const priceImpactMultiSwap = usePriceImpactMultiSwap({
    from,
    to,
    amountInitial: amount1,
  });
  const priceImpactValue =
    swapRoute.length > 1 ? Number(priceImpactMultiSwap) : Number(priceImpact);
  const priceImpactColor = usePriceImpactColor(priceImpactValue);

  const renderRightMetric = () => {
    if (!isFormValid) {
      return null;
    }

    if (price == null || isLoading) {
      return (
        <>
          <Box height={"13px"} textStyle="small" variant="dimmed">
            <Spinner size="xs" />
          </Box>
          <Text textStyle="small" variant="dimmed">
            Price Impact
          </Text>
        </>
      );
    }

    return (
      <>
        {swapRoutePath.tooltip != null ? (
          <Box d="inline-block">
            <Tooltip
              label={swapRoutePath.tooltip}
              placement="top"
              aria-label="Complete Swap Route"
            >
              <Text textStyle="medium" color={priceImpactColor}>
                {handleTinyAmount(priceImpactValue, "0.00")}%
              </Text>
            </Tooltip>
          </Box>
        ) : (
          <Text textStyle="medium" color={priceImpactColor}>
            {handleTinyAmount(priceImpactValue, "0.00")}%
          </Text>
        )}
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
            <Box height={"13px"} textStyle="medium" display={"table"}>
              {exchangeRate !== null ? exchangeRate : <Spinner size="xs" />}
            </Box>
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
              !isFormValid || !!error || fee == null || !!txFeeNotEnough
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
