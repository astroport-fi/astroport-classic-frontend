import { gql } from "graphql-request";

import { getNativeQuery } from "libs/query";

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
  const list = items.map(({ contract }: any) => ({
    pair: contract,
    msg: { pool: {} },
  }));

  return gql`
    query {
      ${list.map(aliasItem)}
    }
  `;
};

const formatResult = (result: any, pairs: any) => {
  return Object.entries(result).map(([pairContract, value]: any) => {
    const result = JSON.parse(value.Result);
    const pair = pairs.find(({ contract }) => {
      return contract === pairContract;
    });

    return {
      ...pair,
      pool: result,
    };
  });
};

export const getPairs = async (network, pairs): Promise<any> => {
  const document = createQuery(pairs);

  const result = await getNativeQuery({
    url: network.mantle,
    document,
  });

  console.log(result);

  return formatResult(result, pairs);
};
