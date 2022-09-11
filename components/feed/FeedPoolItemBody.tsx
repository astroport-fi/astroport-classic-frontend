import React, { FC } from "react";
import { Text, Flex, Link as ChakraLink } from "@chakra-ui/react";
import numeral from "numeral";
import useFinder from "hooks/useFinder";
import { FeedPoolTypes } from "types/common";

import { usePoolFee } from "modules/pool";
import {
  handleBigAndTinyAmount,
  handleBigPercentage,
  useTokenInfo,
} from "modules/common";

import TokenComponent from "components/common/TokenComponent";
import RewardsPopover from "components/popovers/RewardsPopover";
import TokensPopover from "components/popovers/TokensPopover";
import RewardsTd from "components/table/RewardsTd";

import FavoriteToggleButton from "components/FavoriteToggleButton";

const FeedItemBody: FC<{
  type: FeedPoolTypes;
  pool: any;
  token1: string;
  token2: string;
}> = ({ type, pool, token1, token2 }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const finder = useFinder();

  const fee = usePoolFee(pool.pairType);
  const formattedFee = numeral(fee).divide(100).format("0.00");

  const Token = (
    <TokenComponent
      token1Icon={getIcon(token1)}
      token1Symbol={getSymbol(token1)}
      token2Icon={getIcon(token2)}
      token2Symbol={getSymbol(token2)}
      boxSize={4}
    />
  );

  const tokenTooltip = {
    poolAssets: pool.poolAssets,
    myLiquidity: pool.myLiquidity,
    totalLiquidity: pool.totalLiquidity,
  };

  return (
    <Flex
      flexDirection="column"
      borderColor="whiteAlpha.200"
      borderBottomWidth="1px"
      fontSize="xs"
      fontWeight="medium"
      p="5"
    >
      <Flex justify="space-between">
        <Flex>
          {(type === "mypools" || type === "otherpools") && (
            <FavoriteToggleButton
              pool={pool.assets.toString()}
              alignItems="self-start"
              mr="2"
              pt="1px"
            />
          )}
          <Flex flexDirection="column">
            <ChakraLink href={finder(pool.contract, "address")} isExternal>
              {Token}
            </ChakraLink>
            <Text color="white.600" mt="2">
              ({formattedFee}%)
            </Text>
          </Flex>
        </Flex>
        {(type === "mypools" || type === "otherpools") && (
          <RewardsPopover rewards={pool.rewards}>
            <Flex flexDirection="column" alignItems="self-end">
              <Text color="white.600">APR</Text>
              <Text mt="2">
                {handleBigPercentage(pool.rewards.total * 100)}
              </Text>
            </Flex>
          </RewardsPopover>
        )}
        {(type === "lockedpools" || type === "auctionpools") && (
          <Flex flexDirection="column" align="flex-end">
            <Text color="white.600">Rewards</Text>
            <RewardsTd rewards={pool.rewards} />
          </Flex>
        )}
      </Flex>
      <Flex justify="space-between" mt="5">
        <TokensPopover type="totalLiquidity" tokenTooltip={tokenTooltip}>
          <Flex flexDirection="column">
            <Text color="white.600">Total Liquidity</Text>
            <Text>
              {handleBigAndTinyAmount(pool.totalLiquidityInUst, "0,0", true)}
            </Text>
          </Flex>
        </TokensPopover>
        {type !== "otherpools" && (
          <TokensPopover type="myLiquidity" tokenTooltip={tokenTooltip}>
            <Flex
              flexDirection="column"
              align={type === "mypools" ? "center" : "flex-end"}
            >
              <Text color="white.600">My Liquidity</Text>
              <Text>
                {handleBigAndTinyAmount(pool.myLiquidityInUst, undefined, true)}
              </Text>
            </Flex>
          </TokensPopover>
        )}
        {(type === "mypools" || type === "otherpools") && (
          <Flex flexDirection="column" align="flex-end">
            <Text color="white.600">24h Volume</Text>
            <Text>
              {handleBigAndTinyAmount(pool._24hr_volume, "0,0", true)}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default FeedItemBody;
