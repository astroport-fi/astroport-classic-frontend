import React, { FC } from "react";
import { Box, Flex, Button, Text, useDisclosure } from "@chakra-ui/react";
import { useAddress } from "@arthuryeti/terra";
import numeral from "numeral";

import { useTokenInfo } from "modules/common";
import { usePriceImpact, usePriceImpactColor } from "modules/swap";

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
  isDisabled: boolean;
  onConfirmClick: () => void;
};

const SwapFormFooter: FC<Props> = ({
  from,
  amount1,
  to,
  amount2,
  price,
  isLoading,
  isDisabled,
  fee,
  onConfirmClick,
}) => {
  const { getSymbol } = useTokenInfo();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const priceImpact = usePriceImpact({ from, to, amount1, amount2, price });
  const priceImpactColor = usePriceImpactColor(priceImpact);
  const formattedPrice = numeral(price).format("0,0.00[000]").toString();
  const address = useAddress();

  return (
    <Flex justify="space-between" px="12" mt="6">
      <Box flex="1" color="white" mt="1">
        {!isDisabled && (
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
      <Flex flex="1" align="center" flexDirection="column" mb="8">
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
            isDisabled={isDisabled}
          >
            Swap Tokens
          </Button>
        )}
        <Box color="white">{!isDisabled && <FormFee fee={fee} />}</Box>
      </Flex>

      <Box flex="1" textAlign="right" color="white" mt="1">
        {!isDisabled && (
          <>
            <Text textStyle="medium" color={priceImpactColor}>
              {priceImpact}%
            </Text>
            <Text textStyle="small" variant="dimmed">
              Price Impact
            </Text>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default SwapFormFooter;
