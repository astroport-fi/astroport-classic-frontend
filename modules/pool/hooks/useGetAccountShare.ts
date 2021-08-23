import { useTerra } from "contexts/TerraContext";

import { useAddress } from "modules/terra";
import { getAccountShare } from "modules/pool/getAccountShare";

export const useGetAccountShare = async (token1, token2) => {
  const address = useAddress();
  const { client, routes } = useTerra();

  if (!(address && routes)) {
    return null;
  }

  const pair = routes[token1][token2];

  return getAccountShare(client, pair, address);
};

export default useGetAccountShare;
