import React, { FC } from "react";
import Link from "next/link";
import { Button, HStack } from "@chakra-ui/react";
import num from "libs/num";
import TOKEN_DENYLIST from "constants/tokenDenylist";

type Props = {
  row: any;
  canProvideLiquidity: boolean;
};

const ActionsTd: FC<Props> = ({ row, canProvideLiquidity }) => {
  const { contract, assets, myLiquidity } = row.original;
  const [token1, token2] = assets;
  const canManageLiquidity = num(myLiquidity).gt(0);
  const isPoolAllowed = !POOL_DENYLIST.includes(contract);
  const isTokenAllowed =
    !TOKEN_DENYLIST.includes(token1) && !TOKEN_DENYLIST.includes(token2);

  const renderButton = () => {
    if (!isPoolAllowed && (canProvideLiquidity || canManageLiquidity)) {
      return (
        <Link href="javascript:;" passHref>
          <Button
            as="a"
            variant="primary"
            size="sm"
            minW="40"
            opacity={0.6}
            cursor="not-allowed"
            pointerEvents="none"
          >
            Add Liquidity
          </Button>
        </Link>
      );
    }

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
      if (TOKEN_DENYLIST.includes(token1) || TOKEN_DENYLIST.includes(token2)) {
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
          opacity={isTokenAllowed ? 1 : 0.6}
          cursor={isTokenAllowed ? "auto" : "not-allowed"}
          pointerEvents={isTokenAllowed ? "all" : "none"}
        >
          Get Token
        </Button>
      </Link>
    );
  };

  return <HStack justify="flex-end">{renderButton()}</HStack>;
};

export default ActionsTd;
