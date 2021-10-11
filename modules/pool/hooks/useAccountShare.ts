import { useEffect, useState, useCallback } from "react";
import { useTerraWebapp, useAddress } from "@arthuryeti/terra";

import { getAccountShare } from "modules/pool";

export const useAccountShare = (lpToken?: string | null) => {
  const { client } = useTerraWebapp();
  const address = useAddress();
  const [accountShare, setAccountShare] = useState<string>("0");

  const getShare = useCallback(async () => {
    if (lpToken == null || address == null) {
      return;
    }

    const result = await getAccountShare(client, lpToken, address);

    setAccountShare(result);
  }, [client, lpToken, address]);

  useEffect(() => {
    getShare();
  }, [getShare]);

  return accountShare;
};
