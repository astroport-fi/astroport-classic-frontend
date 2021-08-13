import { FC, useEffect, useMemo, useState, useCallback } from "react";
import { useWallet } from "@terra-money/wallet-provider";
import { LCDClient, Coins } from "@terra-money/terra.js";

import { makeContext } from "libs/makeContext";
import networks, {
  defaultNetwork,
  AstroportNetworkInfo,
} from "constants/networks";
import {
  getPairs,
  filterPairs,
  formatPairs,
  formatTokens,
  getCW20Balances,
  useAddress,
} from "modules/terra";
import { Pair, PairsMap, TokensMap } from "types/common";
import whitelist from "constants/whitelist.json";

type TerraContext = {
  isReady: boolean;
  networkInfo: AstroportNetworkInfo;
  pairs: Pair[] | any[];
  routes: PairsMap | any[];
  client: any;
  balances: any;
  tokens: TokensMap | any[];
  loadingPairs: boolean;
};

const context = makeContext<TerraContext>("useTerra");

const [useTerra, Provider] = context;

export { useTerra };

export const TerraProvider: FC = (props) => {
  const { network } = useWallet();
  const address = useAddress();
  const [balances, setBalances] = useState<Coins | null>(null);
  const [pairs, setPairs] = useState<Pair[] | null>(null);
  const [loadingPairs, setLoadingPairs] = useState(true);
  const tokenList = whitelist ? whitelist[network.name] : null;

  const client = useMemo(() => {
    return new LCDClient({
      URL: network.lcd,
      chainID: network.chainID,
    });
  }, [network]);

  const networkInfo = useMemo(() => {
    return networks[network.name] ?? defaultNetwork;
  }, [network.name]);

  const routes = useMemo(() => {
    if (!pairs) {
      return [];
    }

    return formatPairs(pairs);
  }, [pairs]);

  const tokens = useMemo(() => {
    if (!(routes && tokenList)) {
      return [];
    }

    return formatTokens(routes, tokenList);
  }, [tokenList, routes]);

  const fethPairs = useCallback(async () => {
    const { factory, mantle } = networkInfo;
    if (!tokenList || !mantle || !factory) {
      return;
    }

    const data = await getPairs(networkInfo);
    const pairs = filterPairs(data, tokenList);
    setPairs(pairs);
    setLoadingPairs(false);
  }, [tokenList, networkInfo]);

  useEffect(() => {
    fethPairs();
  }, [fethPairs]);

  const fetchBalances = useCallback(async () => {
    if (!(address && tokenList)) {
      return;
    }

    const [cw20TokensBalance, nativeTokensBalance] = await Promise.all([
      getCW20Balances(networkInfo.mantle, tokenList, address),
      client.bank.balance(address),
    ]);

    setBalances(nativeTokensBalance.add(cw20TokensBalance));
  }, [address, client, networkInfo, tokenList]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  const isReady = pairs?.length > 0 && !!balances && !!tokens && !!routes;

  return (
    <Provider
      value={{
        isReady,
        networkInfo,
        pairs,
        balances,
        routes,
        client,
        tokens,
        loadingPairs,
      }}
    >
      {props.children}
    </Provider>
  );
};
