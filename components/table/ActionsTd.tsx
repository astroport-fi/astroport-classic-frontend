import React, { FC } from "react";
import Link from "next/link";
import { Button, HStack } from "@chakra-ui/react";
// import GraphIcon from "components/icons/GraphIcon";

import { num, useBalance } from "@arthuryeti/terra";
// import { getTokenDenom } from "modules/common";

type Props = {
  row: any;
};

const ActionsTd: FC<Props> = ({ row }) => {
  const { contract, assets, myLiquidity } = row.original;
  const [token1, token2] = assets;
  const balance1 = useBalance(token1);
  const balance2 = useBalance(token2);

  const canProvideLiquidity = num(balance1).gt(0) && num(balance2).gt(0);
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
      if (token2 == "uusd") {
        return `/swap?from=${token2}&to=${token1}`;
      } else {
        return `/swap?from=${token1}&to=${token2}`;
      }
    };

    if (canManageLiquidity) {
      return (
        <Link href={`/pools/${contract}`} passHref>
          <Button as="a" variant="primary" size="sm" px="0" minW="40">
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
