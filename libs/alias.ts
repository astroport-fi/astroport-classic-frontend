import { gql } from "graphql-request";
import { WASMQUERY } from "constants/constants";
import { ContractVariables } from "types/common";

interface Query extends Partial<ContractVariables> {
  name: string;
}

const getDocument = ({ name, contract, msg }: Query) =>
  !msg
    ? ``
    : `
    ${name}: ${WASMQUERY}(
      ContractAddress: "${contract}"
      QueryMsg: "${stringify(msg)}"
    ) {
      height: Height
      result: Result
    }`;

const alias = (queries: Query[], name: string) => {
  return gql`
    query ${name} {
      ${queries.map(getDocument)}
    }
  `;
};

export default alias;

export const stringify = (msg: object) => {
  return JSON.stringify(msg).replace(/"/g, '\\"');
};
