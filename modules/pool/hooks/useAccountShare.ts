import { useEffect, useState } from "react";
import { useTerra, useAddress } from "@arthuryeti/terra";

import { getAccountShare } from "modules/pool";

export const useAccountShare = (lpToken?: string | null) => {
  const { client } = useTerra();

  const address = useAddress();

  const [accountShare, setAccountShare] = useState<string>(null);

  useEffect(() => {
    if (!(lpToken && address)) {
      setAccountShare(null);

      return;
    }

    (async () => {
      setAccountShare(await getAccountShare(client, lpToken, address));
    })();
  }, [address, client, lpToken]);

  return accountShare;
};
