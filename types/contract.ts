import { ListedItem } from "./asset";

export type GetDocument = (item: ListedItem) => ContractVariables | undefined;

export type ContractVariables = {
  contract: string;
  msg: object;
};

export type ContractData = { height: string; result: string };

export type WasmResponse = {
  WasmContractsContractAddressStore: ContractData | null;
};
