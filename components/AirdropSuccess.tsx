import React, { FC } from "react";
import { Box, Flex, HStack, Text, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fromTerraAmount } from "@arthuryeti/terra";

import { truncate } from "libs/text";
import { useContracts } from "modules/common";

import Card from "components/Card";
import CloseIcon from "components/icons/CloseIcon";
import SuccessIcon from "components/icons/SuccessIcon";
import TokenCard from "components/common/TokenCard";

type Props = {
  amount: string;
  address: string;
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const AirdropSuccess: FC<Props> = ({ amount, address, onCloseClick }) => {
  const { astroToken } = useContracts();
  const truncatedAddress = truncate(address);

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      w="470px"
      m="0 auto"
      mt="10"
    >
      <Card>
        <Flex justify="space-between" align="center" mb="6">
          <HStack>
            <SuccessIcon />
            <Text fontSize="lg" color="green.500">
              Eligible for an ASTRO airdrop!
            </Text>
          </HStack>
          <IconButton
            aria-label="Close"
            variant="simple"
            isRound
            _hover={{
              bg: "rgba(255,255,255,0.1)",
            }}
            icon={<CloseIcon w="6" h="6" color="white" BackgroundOpacity="0" />}
            onClick={onCloseClick}
          />
        </Flex>

        <Text variant="light" mb="2">
          Available Airdrop
        </Text>
        <TokenCard
          token={{
            asset: astroToken,
            amount: amount,
          }}
        />
      </Card>
    </MotionBox>
  );
};

export default AirdropSuccess;
