import React, { FC } from "react";
import Link from "next/link";
import { Button, IconButton, Flex } from "@chakra-ui/react";
import GraphIcon from "components/icons/GraphIcon";

import { useBalance } from "@arthuryeti/terra";

type Props = {
  row: any;
};

const ActionsTd: FC<Props> = ({ row }) => {
  const { contract_addr, asset_infos, liquidity_token } = row.original;
  const token1 =
    asset_infos[0]?.token?.contract_addr || asset_infos[0]?.native_token?.denom;
  const token2 =
    asset_infos[1]?.token?.contract_addr || asset_infos[1]?.native_token?.denom;
  const balance1 = Number(useBalance(token1));
  const balance2 = Number(useBalance(token2));
  const balanceLP = Number(useBalance(liquidity_token));

  const needTokens = !balance1 && !balance2;
  const mustProvideLiquidity = !needTokens && !balanceLP;
  const canManageLiquidity = !needTokens && balanceLP;

  return (
    <Flex justify="flex-end" align="center">
      {needTokens && (
        <Link href={`/swap?from=${token1}&to=${token2}`} passHref>
          <Button as="a" size="sm" variant="silent">
            Get Token
          </Button>
        </Link>
      )}
      {mustProvideLiquidity && (
        <Link href={`/pairs/${contract_addr}`} passHref>
          <Button as="a" variant="primary" size="sm">
            Add Liquidity
          </Button>
        </Link>
      )}
      {canManageLiquidity && (
        <Link href={`/pairs/${contract_addr}`} passHref>
          <Button as="a" variant="primary" size="sm">
            Manage Liquidity
          </Button>
        </Link>
      )}
      <IconButton
        aria-label="Graph"
        icon={<GraphIcon />}
        variant="icon"
        {...row.getToggleRowExpandedProps()}
      />
    </Flex>
  );
};

export default ActionsTd;
