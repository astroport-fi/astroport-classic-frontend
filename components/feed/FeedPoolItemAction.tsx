import React, { FC } from "react";
import { chakra, Flex, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { num } from "@arthuryeti/terra";
import { FeedPoolTypes, PoolFormType } from "types/common";

import { ClaimAuctionRewardBtn, ClaimLockdropRewardBtn } from "modules/reward";

type LinkProps = {
  text: string;
  color?: string;
  onClick?: () => void;
  href?: string;
};

// eslint-disable-next-line react/display-name
const LinkText = React.forwardRef(
  ({ text, color = "brand.purpleAlt", onClick, href }: LinkProps, ref) => {
    return (
      <chakra.a
        href={href}
        textDecoration="underline"
        fontWeight="500"
        fontSize=".875rem"
        color={color}
        onClick={onClick}
        //@ts-ignore
        ref={ref}
      >
        {text}
      </chakra.a>
    );
  }
);

const FeedItemAction: FC<{
  type: FeedPoolTypes;
  pool: any;
  token1: string;
  token2: string;
  txFeeNotEnough: boolean;
}> = ({ type, pool, token1, token2, txFeeNotEnough }) => {
  const renderURL = () => {
    if (token2 == "uusd" || token2 == "uluna") {
      return `/swap?from=${token2}&to=${token1}`;
    } else {
      return `/swap?from=${token1}&to=${token2}`;
    }
  };

  return (
    <Flex justify="space-between" px="5">
      <HStack height={50} spacing={5}>
        {type === "mypools" && (
          <>
            {pool.canManage && (
              <Link href={`/pools/${pool.contract}`} passHref>
                <LinkText text="Manage" />
              </Link>
            )}
            {pool.isStakable && pool.canStake && (
              <Link
                href={{
                  pathname: `/pools/${pool.contract}/stake`,
                  query: { type: PoolFormType.Stake },
                }}
                passHref
              >
                <LinkText text="Stake" />
              </Link>
            )}
            {pool.isStakable && !pool.canStake && (
              <Link
                href={{
                  pathname: `/pools/${pool.contract}/stake`,
                  query: { type: PoolFormType.Unstake },
                }}
                passHref
              >
                <LinkText text="Unstake" />
              </Link>
            )}
          </>
        )}
        {type === "otherpools" && (
          <>
            {(pool.userCanProvideLiquidity || num(pool.myLiquidity).gt(0)) && (
              <Link href={`/pools/${pool.contract}`} passHref>
                <LinkText
                  text={
                    pool.userCanProvideLiquidity ? "Add Liquidity" : "Manage"
                  }
                />
              </Link>
            )}
            {!(pool.userCanProvideLiquidity || num(pool.myLiquidity).gt(0)) && (
              <Link href={renderURL()} passHref>
                <chakra.a
                  textDecoration="underline"
                  fontWeight="500"
                  fontSize=".875rem"
                  color="white.600"
                >
                  Get Token
                </chakra.a>
              </Link>
            )}
          </>
        )}
        {type === "lockedpools" && (
          <>
            {(!pool.isClaimable || !pool.isClaimed) && (
              <ClaimLockdropRewardBtn
                contract={pool.name}
                duration={pool.duration}
                txFeeNotEnough={txFeeNotEnough}
                style="mobile"
              />
            )}
            {pool.isClaimable && !pool.isClaimed && (
              <Link
                href={`/unlock/${pool.name}/${pool.duration}/${pool.astroLpToken}`}
                passHref
              >
                <LinkText text="Manage" />
              </Link>
            )}
          </>
        )}
        {type === "auctionpools" && (
          <>
            {(!pool.isClaimable || !pool.isClaimed) && (
              <ClaimAuctionRewardBtn
                amount={pool.amount}
                txFeeNotEnough={txFeeNotEnough}
                style="mobile"
              />
            )}
            {pool.isClaimable && !pool.isClaimed && (
              <Link href={`/unlock-phase-2`} passHref>
                <LinkText text="Manage" />
              </Link>
            )}
          </>
        )}
      </HStack>
      {/* v2 charts */}
    </Flex>
  );
};

export default FeedItemAction;
