import { useTerra } from "@arthuryeti/terra";
import { useQuery } from "react-query";
import { Asset } from "types/common";

type Response = {
  assets: [Asset, Asset];
  total_share: string;
};

export const useGetPool = (pairContract: string) => {
  const { client } = useTerra();

  return useQuery(["pool", pairContract], () => {
    return client.wasm.contractQuery<Response>(pairContract, {
      pool: {},
    });
  });
};

export default useGetPool;
