import {
  FC,
  ReactNode,
  useMemo,
  Context,
  createContext,
  useContext,
  Consumer,
} from "react";
import { useWallet } from "@terra-money/wallet-provider";

import { PairResponse, Routes, Tokens, Data } from "./types";
import { formatPairsToRoutes } from "./helpers";

type Astroswap = {
  pairs: PairResponse[] | null;
  routes: Routes | null;
  tokens: Tokens | null;
  data: Data | null;
};

export const AstroswapContext: Context<Astroswap> = createContext<Astroswap>({
  pairs: [],
  routes: null,
  tokens: null,
  data: null,
});

type Props = {
  children: ReactNode;
  data: Data;
};

export const AstroswapProvider: FC<Props> = ({ children, data }) => {
  const {
    network: { name },
  } = useWallet();

  const pairs = useMemo(() => {
    return data[name].pairs;
  }, [name, data]);

  const tokens = useMemo(() => {
    return data[name].tokens;
  }, [name, data]);

  const routes = useMemo(() => {
    if (!pairs) {
      return null;
    }
    return formatPairsToRoutes(pairs);
  }, [pairs]);

  return (
    <AstroswapContext.Provider
      value={{
        pairs,
        routes,
        tokens,
        data,
      }}
    >
      {children}
    </AstroswapContext.Provider>
  );
};

export function useAstroswap(): Astroswap {
  return useContext(AstroswapContext);
}

export const AstroswapConsumer: Consumer<Astroswap> = AstroswapContext.Consumer;
