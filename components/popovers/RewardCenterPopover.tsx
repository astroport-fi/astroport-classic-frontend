import React, { FC } from "react";
import numeral from "numeral";
import {
  Button,
  Box,
  Flex,
  Image,
  Text,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverTrigger,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useTokenInfo, useContracts } from "modules/common";
import { useAirdropBalance } from "modules/airdrop";
import { useUserInfo } from "modules/lockdrop";
import CloseIcon from "components/icons/CloseIcon";

type Props = {
  triggerElement: React.ReactElement;
};

const AstroLineItem = ({ label, amount, price }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const { astroToken } = useContracts();
  const userInfo = useUserInfo();

  return (
    <Flex mt={2} justify="space-between">
      <HStack>
        <Image
          src={getIcon(astroToken)}
          width="2rem"
          height="2rem"
          alt={getSymbol(astroToken)}
        />
        <VStack align="start" spacing={0}>
          <Text textStyle="h3">{getSymbol(astroToken)}</Text>
          <Text textStyle="small" variant="dimmed">
            {label}
          </Text>
        </VStack>
      </HStack>
      <VStack align="end">
        <Text textStyle="small">{amount}</Text>
        <Text textStyle="small" variant="dimmed"></Text>
      </VStack>
    </Flex>
  );
};

const RewardCenterPopover: FC<Props> = ({ triggerElement }) => {
  const airdropBalance = useAirdropBalance();

  return (
    <Popover placement="left-end">
      <PopoverTrigger>{triggerElement}</PopoverTrigger>
      <PopoverContent color="brand.deepBlue">
        <Flex align="center" justify="space-between" mb="4" pr={6}>
          <PopoverHeader>Rewards</PopoverHeader>
          <PopoverCloseButton position="static" borderRadius="xl">
            <CloseIcon w="6" h="6" />
          </PopoverCloseButton>
        </Flex>
        <PopoverBody>
          <Box width="sm" px={6}>
            <Flex justify="space-between" align="baseline">
              <Text textStyle="minibutton">Total Rewards</Text>
              <VStack align="flex-end" spacing={1}>
                <Text textStyle="h3">$ {airdropBalance}</Text>
                <Text textStyle="small" variant="dimmed">
                  Unclaimed Balance
                </Text>
              </VStack>
            </Flex>

            <Box mt={6}>
              <Text textStyle="minibutton">Your rewards from launch</Text>
              <VStack>
                <AstroLineItem
                  label="ASTRO from Airdrop"
                  amount={1000}
                  price={2000}
                />
              </VStack>
            </Box>

            <Box mt={6}>
              <VStack>
                <Button mt={6} size="sm" w="full" variant="primary">
                  Claim Rewards
                </Button>
                <Text textStyle="small" variant="dimmed">
                  TX Fee 1.5 UST
                </Text>
              </VStack>
            </Box>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default RewardCenterPopover;
