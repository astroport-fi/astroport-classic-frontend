import React, { FC } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useAddress } from "@arthuryeti/terra";
import numeral from "numeral";

import { useTokenInfo, Route } from "modules/common";
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
  isLoading: boolean;
  swapRoute: Route[];
  isFormValid: boolean;
  error: any;
  onConfirmClick: () => void;
};

const SwapFormFooter: FC<Props> = ({
  from,
  amount1,
  to,
  amount2,
  price,
  isLoading,
  isFormValid,
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
  const formattedPrice = numeral(price).format("0,0.00[000]").toString();
  const address = useAddress();

  const renderRightMetric = () => {
    if (!isFormValid) {
      return null;
    }

    if (swapRoute?.length > 1) {
      return (
        <>
          <Text textStyle={["small", "medium"]}>{swapRoutePath}</Text>
          <Text textStyle="small" variant="dimmed">
            Route
          </Text>
        </>
      );
    }

    return (
      <>
        <Text textStyle="medium" color={priceImpactColor}>
          {priceImpact}%
        </Text>
        <Text textStyle="small" variant="dimmed">
          Price Impact
        </Text>
      </>
    );
  };

  return (
    <Flex justify="space-between" px={["4", "12"]} mt="6">
      <Box flex={0} color="white">
        {isFormValid && (
          <>
            <Text textStyle={["small", "medium"]}>
              1 {getSymbol(to)} = {formattedPrice} {getSymbol(from)}
            </Text>
            <Text textStyle="small" variant="dimmed">
              Exchange Rate
            </Text>
          </>
        )}
      </Box>
      <Flex align="center" flexDirection="column">
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
            isDisabled={!isFormValid || !!error || fee == null}
          >
            Swap Tokens
          </Button>
        )}
        {isFormValid && (
          <Box color="white">
            <FormFee fee={fee} />
          </Box>
        )}
      </Flex>

      <Box flex={0} textAlign="right" color="white">
        {renderRightMetric()}
      </Box>
    </Flex>
  );
};

export default SwapFormFooter;
