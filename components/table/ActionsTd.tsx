import React, { FC } from "react";
import Link from "next/link";
import { Button, HStack, ButtonGroup } from "@chakra-ui/react";
import { num } from "@arthuryeti/terra";

type Props = {
  row: any;
  canProvideLiquidity: boolean;
};

const ActionsTd: FC<Props> = ({ row, canProvideLiquidity }) => {
  const { contract, assets, myLiquidity } = row.original;
  const [token1, token2] = assets;

  const canManageLiquidity = num(myLiquidity).gt(0);

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

    const renderURL = () => {
      if (token2 == "uusd" || token2 == "uluna") {
        return `/swap?from=${token2}&to=${token1}`;
      } else {
        return `/swap?from=${token1}&to=${token2}`;
      }
    };

    if (canManageLiquidity) {
      return (
        <Link href={`/pools/${contract}`} passHref>
          <Button as="a" variant="primary" size="sm" px="0" minW="20">
            Manage
          </Button>
        </Link>
      );
    }

    return (
      <Link href={renderURL()} passHref>
        <Button as="a" size="sm" variant="silent" minW="40">
          Get Token
        </Button>
      </Link>
    );
  };

  return <HStack justify="flex-end">{renderButton()}</HStack>;
};

export default ActionsTd;
