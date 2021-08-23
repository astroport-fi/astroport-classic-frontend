import { LCDClient } from "@terra-money/terra.js";
import { gql } from "graphql-request";

import { getNativeQuery } from "libs/query";

import data from "constants/data.json";

const maxPairsLimit = 30;

interface Msg {
  pool: any;
}

interface Item {
  pair: string;
  msg: Msg;
}

const stringifyMsg = (msg: Msg) => JSON.stringify(msg).replace(/"/g, '\\"');

const aliasItem = ({ pair, msg }: Item) => `
  ${pair}: WasmContractsContractAddressStore(
    ContractAddress: "${pair}"
    QueryMsg: "${stringifyMsg(msg)}"
  ) {
    Height
    Result
  }
`;

const createQuery = (items: Item[]) => {
  const list = items.map(({ pair }: any) => ({
    pair,
    msg: { pool: {} },
  }));

  return gql`
    query {
      ${list.map(aliasItem)}
    }
  `;
};

const mapResults = (pairs: any, result: any) => {
  return Object.entries(result).map(([pairContract, value]: any) => {
    const result = JSON.parse(value.Result);

    return {
      ...pairs.find(({ pair }) => {
        return pair === pairContract;
      }),
      ...result,
    };
  });
};

export const getPairs = async (network): Promise<any> => {
  const pairs = data[network.name];
  const document = createQuery(pairs);

  const result = await getNativeQuery({
    url: network.mantle,
    document,
  });

  return mapResults(pairs, result);
};
