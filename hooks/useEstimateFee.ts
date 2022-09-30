import { useMemo } from "react";
import { MsgExecuteContract } from "@terra-money/terra.js";
import { useLCDClient } from "@terra-money/wallet-provider";
import useSWR from "swr";
import { estimateFee } from "libs/terra";
import useAddress from "hooks/useAddress";
import { CLASSIC_DEFAULT_GAS_ADJUSTMENT } from "constants/constants";

type Params = {
  msgs: MsgExecuteContract[] | null | undefined;
  gasAdjustment?: number;
};

const useEstimateFee = ({
  msgs,
  gasAdjustment = CLASSIC_DEFAULT_GAS_ADJUSTMENT,
}: Params) => {
  const address = useAddress();
  const client = useLCDClient();

  const { data, error } = useSWR(
    ["fee", msgs],
    async () => {
      if (msgs == null || error != null || address == null) {
        throw new Error("Msgs is null or Error is not null");
      }

      return estimateFee({
        client,
        address,
        msgs,
        opts: { gasAdjustment },
      });
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return useMemo(() => {
    return {
      fee: data,
      isLoading: !error && !data,
      error,
    };
  }, [data, error]);
};

export default useEstimateFee;
