import React, { FC } from "react";
import Link from "next/link";
import { Button, ButtonGroup, HStack } from "@chakra-ui/react";
// import GraphIcon from "components/icons/GraphIcon";

import { num, useBalance } from "@arthuryeti/terra";
import { getTokenDenom } from "modules/common";

type Props = {
  row: any;
};

const ActionsTd: FC<Props> = ({ row }) => {
  const { contract, assets, myLiquidity } = row.original;
  const [token1, token2] = assets;
  const balance1 = useBalance(token1);
  const balance2 = useBalance(token2);

  const hasMissingToken = num(balance1).eq(0) || num(balance2).eq(0);
  const canProvideLiquidity = num(myLiquidity).eq(0);
  const canManageLiquidity = !hasMissingToken && num(myLiquidity).gt(0);

  const renderButton = () => {
    if (hasMissingToken) {
      return (
        <Link href={`/swap?from=${token1}&to=${token2}`} passHref>
          <Button as="a" size="sm" variant="silent" minW="40">
            Get Token
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
          <Button as="a" variant="primary" size="sm" px="0" minW="40">
            Manage
          </Button>
        </Link>
      );
    }
  };

  return <HStack justify="flex-end">{renderButton()}</HStack>;
};

export default ActionsTd;
