import React, { FC } from "react";
import Link from "next/link";
import { Button, HStack } from "@chakra-ui/react";
import { num } from "@arthuryeti/terra";
import TOKEN_DENYLIST from "constants/tokenDenylist";

type Props = {
  row: any;
  canProvideLiquidity: boolean;
};

const ActionsTd: FC<Props> = ({ row, canProvideLiquidity }) => {
  const { contract, assets, myLiquidity } = row.original;
  const [token1, token2] = assets;
  const canManageLiquidity = num(myLiquidity).gt(0);
  const canSwapTokens =
    !TOKEN_DENYLIST.includes(token1) && !TOKEN_DENYLIST.includes(token2);

  const renderButton = () => {
    if (canProvideLiquidity) {
      return (
        <Link href={`/pools/${contract}`} passHref>
          <Button as="a" variant="primary" size="sm" minW="40">
            Add Liquidity
          </Button>
        </Link>
      );
    }

    if (canManageLiquidity) {
      return (
        <Link href={`/pools/${contract}`} passHref>
          <Button as="a" variant="primary" size="sm" px="0" minW="20">
            Manage
          </Button>
        </Link>
      );
    }

    const renderURL = () => {
      if (!canSwapTokens) {
        return "javascript:;";
      }

      if (token2 == "uusd" || token2 == "uluna") {
        return `/swap?from=${token2}&to=${token1}`;
      }

      return `/swap?from=${token1}&to=${token2}`;
    };

    return (
      <Link href={renderURL()} passHref>
        <Button
          as="a"
          size="sm"
          variant="silent"
          minW="40"
          opacity={canSwapTokens ? 1 : 0.6}
        >
          Get Token
        </Button>
      </Link>
    );
  };

  return <HStack justify="flex-end">{renderButton()}</HStack>;
};

export default ActionsTd;
