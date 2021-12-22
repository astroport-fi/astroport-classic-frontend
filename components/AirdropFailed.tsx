import React, { FC } from "react";
import { Box, Flex, HStack, Text, IconButton, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";

import Card from "components/Card";
import CloseIcon from "components/icons/CloseIcon";
import FailedIcon from "components/icons/FailedIcon";

type Props = {
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const AirdropFailed: FC<Props> = ({ onCloseClick }) => {
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
            <Box>
              <FailedIcon />
            </Box>
            <Text fontSize="lg" color="red.500">
              Address not eligible for Airdrop
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

        <Text variant="light">
          Learn more about eligibility for the ASTRO airdrop{" "}
          <Link
            href="https://docs.astroport.fi/astroport/workstation/lockdrop/phase-0"
            isExternal
            color="brand.purple"
          >
            in the Astroport documentation.
          </Link>
        </Text>
      </Card>
    </MotionBox>
  );
};

export default AirdropFailed;
