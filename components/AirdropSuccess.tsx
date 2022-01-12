import React, { FC } from "react";
import { Box, Flex, HStack, Text, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { num } from "@arthuryeti/terra";

import { useContracts } from "modules/common";
import {
  useAirdropStillClaimable,
  useAirdrop2StillClaimable,
} from "modules/airdrop";
import { ONE_TOKEN } from "constants/constants";

import Card from "components/Card";
import CloseIcon from "components/icons/CloseIcon";
import SuccessIcon from "components/icons/SuccessIcon";
import TokenCard from "components/common/TokenCard";

type Props = {
  data: any;
  address: string;
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const AirdropSuccess: FC<Props> = ({ data, onCloseClick }) => {
  const { astroToken } = useContracts();
  const isAirdrop1Claimable = useAirdropStillClaimable();
  const isAirdrop2Claimable = useAirdrop2StillClaimable();

  const airdrops = data.map((item) => {
    let isClaimable = isAirdrop1Claimable;

    if (item.airdrop_series == 2) {
      isClaimable = isAirdrop2Claimable;
    }

    const message = isClaimable
      ? "Available Airdrop"
      : "Airdrop has already been claimed";

    return {
      ...item,
      message,
    };
  });

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
        <Text textStyle="medium" variant="dimmed" mb="3">
          To claim your airdrop, open the rewards center in the top-right of the
          page.
        </Text>
        {airdrops.map((airdrop) => {
          const amount = num(airdrop.amount).div(ONE_TOKEN).dp(6).toNumber();

          return (
            <Box key={airdrop.airdrop_series} _last={{ mt: 4 }}>
              <Text variant="light" mb="2">
                {airdrop.message}
              </Text>
              <TokenCard
                token={{
                  asset: astroToken,
                  amount,
                }}
              />
            </Box>
          );
        })}
      </Card>
    </MotionBox>
  );
};

export default AirdropSuccess;
