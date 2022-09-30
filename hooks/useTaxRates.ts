import { useQuery } from "react-query";
import { useLCDClient } from "@terra-money/wallet-provider";
import { QUERY_STALE_TIME } from "constants/constants";

export const useTaxRate = (enabled: boolean) => {
  const lcd = useLCDClient();
  return useQuery(
    "taxRate",
    async () => {
      const taxRate = await lcd.treasury.taxRate();
      return taxRate.toString() || "0";
    },
    {
      refetchOnMount: false,
      staleTime: QUERY_STALE_TIME,
      enabled,
    }
  );
};

export const useTaxCap = (enabled: boolean) => {
  const lcd = useLCDClient();
  return useQuery(
    "taxCap",
    async () => {
      const taxCap = await lcd.treasury.taxCap("uusd");
      return taxCap.amount.toString();
    },
    {
      refetchOnMount: false,
      staleTime: QUERY_STALE_TIME,
      enabled,
    }
  );
};
