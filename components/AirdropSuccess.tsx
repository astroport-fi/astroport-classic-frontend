import React, { FC } from "react";
import { Box, Flex, HStack, Text, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fromTerraAmount } from "@arthuryeti/terra";

import { truncate } from "libs/text";
import { useContracts } from "modules/common";

import Card from "components/Card";
import CloseModalIcon from "components/icons/CloseModalIcon";
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
            icon={<CloseModalIcon w="1.5rem" h="1.5rem" />}
            variant="icon"
            onClick={onCloseClick}
          />
        </Flex>

        <Text variant="light" mb="2">
          Available Airdrop
        </Text>
        <TokenCard
          token={{
            asset: astroToken,
            amount: fromTerraAmount(amount, "0,0.00"),
          }}
        />
      </Card>
    </MotionBox>
  );
};

export default AirdropSuccess;
