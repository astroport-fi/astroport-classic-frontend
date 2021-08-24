import { gql } from "graphql-request";

import { getNativeQuery } from "libs/query";
import { Coin, Coins } from "@terra-money/terra.js";

interface Msg {
  balance: {
    address: string;
  };
}

interface Item {
  token: string;
  contract: string;
  msg: Msg;
}

const stringifyMsg = (msg: Msg) => JSON.stringify(msg).replace(/"/g, '\\"');

const aliasItem = ({ token, contract, msg }: Item) => `
  ${token}: WasmContractsContractAddressStore(
    ContractAddress: "${contract}"
    QueryMsg: "${stringifyMsg(msg)}"
  ) {
    Height
    Result
  }
`;

const createQuery = (list: Item[]) => gql`
  query {
    ${list.map(aliasItem)}
  }
`;

const mapPairs = (pairs: any[], address: string) => {
  return pairs.map(({ lpToken }) => ({
    token: lpToken,
    contract: lpToken,
    msg: { balance: { address } },
  }));
};

const formatResult = (tokens: any) => {
  return Object.entries(tokens).map(([token, value]: any) => {
    const { balance } = JSON.parse(value.Result);

    return new Coin(token, balance);
  });
};

const formatTokensToQuery = (list: any, address: string): Item[] => {
  return Object.values(list).map(({ token }) => ({
    token,
    contract: token,
    msg: { balance: { address } },
  }));
};

export const getCW20Balances = async (
  mantle: string,
  tokens: any,
  address: string
) => {
  const filteredTokens = Object.values(tokens).filter((token) => {
    return token.protocol !== "Native";
  });
  const query = formatTokensToQuery(filteredTokens, address);
  const document = createQuery(query);
  console.log(document);

  const data = await getNativeQuery({
    url: mantle,
    document,
    variables: { address },
  });

  const mappedTokens = formatResult(data);

  return new Coins(mappedTokens);
};

export const getLpBalances = async (
  mantle: string,
  pairs: any[],
  address: string
) => {
  const query = mapPairs(pairs, address);

  const document = createQuery(query);

  const data = await getNativeQuery({
    url: mantle,
    document,
    variables: { address },
  });

  const mappedTokens = formatResult(data);

  return new Coins(mappedTokens);
};
