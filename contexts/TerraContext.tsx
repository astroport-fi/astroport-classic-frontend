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
  formatPairsToRoutes,
  getCW20Balances,
  getLpBalances,
  useAddress,
} from "modules/terra";
import { PairsMap, TokensMap } from "types/common";
import { Pair } from "types/contracts/terraswap";
import whitelist from "constants/whitelist.json";

type TerraContext = {
  isReady: boolean;
  networkInfo: AstroportNetworkInfo;
  pairs: Pair[] | any[];
  routes: PairsMap | any[];
  client: any;
  balances: Coins | null;
  lpBalances: Coins | null;
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
  const [lpBalances, setLpBalances] = useState<Coins | null>(null);
  const [pairs, setPairs] = useState<Pair[] | null>(null);
  const [loadingPairs, setLoadingPairs] = useState(true);

  const client = useMemo(() => {
    return new LCDClient({
      URL: network.lcd,
      chainID: network.chainID,
    });
  }, [network]);

  const tokens = useMemo(() => {
    return whitelist[network.name].tokens;
  }, [network.name]);

  const networkInfo = useMemo(() => {
    return networks[network.name] ?? defaultNetwork;
  }, [network.name]);

  const routes = useMemo(() => {
    if (!pairs) {
      return [];
    }

    return formatPairsToRoutes(pairs);
  }, [pairs]);

  const fethPairs = useCallback(async () => {
    const { mantle } = networkInfo;
    const pairs = whitelist[network.name].pairs;

    if (!mantle || !pairs) {
      return;
    }

    const data = await getPairs(networkInfo, pairs);
    setPairs(data);
    setLoadingPairs(false);
  }, [network, networkInfo]);

  useEffect(() => {
    fethPairs();
  }, [fethPairs]);

  const fetchBalances = useCallback(async () => {
    if (!(address && tokens)) {
      return;
    }

    const [cw20TokensBalance, nativeTokensBalance] = await Promise.all([
      getCW20Balances(networkInfo.mantle, tokens, address),
      client.bank.balance(address),
    ]);

    setBalances(nativeTokensBalance.add(cw20TokensBalance));
  }, [address, client, networkInfo, tokens]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  const fetchLpBalances = useCallback(async () => {
    if (!(address && pairs)) {
      return;
    }

    const result = await getLpBalances(networkInfo.mantle, pairs, address);

    setLpBalances(result);
  }, [address, networkInfo, pairs]);

  useEffect(() => {
    fetchLpBalances();
  }, [fetchLpBalances]);

  const isReady = pairs?.length > 0 && !!balances && !!tokens && !!routes;

  return (
    <Provider
      value={{
        isReady,
        networkInfo,
        pairs,
        balances,
        lpBalances,
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
