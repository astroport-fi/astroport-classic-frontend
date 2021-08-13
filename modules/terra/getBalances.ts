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

const mapTokenList = (list: any, address: string): Item[] =>
  Object.values(list).map(({ token }) => ({
    token,
    contract: token,
    msg: { balance: { address } },
  }));

const mapPairs = (pairs: any[], address: string) =>
  pairs.map(({ liquidity_token }) => ({
    token: liquidity_token,
    contract: liquidity_token,
    msg: { balance: { address } },
  }));

const mapTokens = (tokens: any) =>
  Object.entries(tokens).map(([token, value]: any) => {
    const { balance } = JSON.parse(value.Result);

    return new Coin(token, balance);
  });

export const getCW20Balances = async (
  mantle: string,
  tokenList: any,
  address: string
) => {
  const mappedTokenList = mapTokenList(tokenList, address);

  const document = createQuery(mappedTokenList);

  const data = await getNativeQuery({
    url: mantle,
    document,
    variables: { address },
  });

  const mappedTokens = mapTokens(data);

  return new Coins(mappedTokens);
};

export const requestLpBalance = async (
  mantle: string,
  address: string,
  pairs: any[]
) => {
  const mappedPairs = mapPairs(pairs, address);

  const document = createQuery(mappedPairs);

  const data = await getNativeQuery({
    url: mantle,
    document,
    variables: { address },
  });

  const mappedTokens = mapTokens(data);

  return new Coins(mappedTokens);
};
