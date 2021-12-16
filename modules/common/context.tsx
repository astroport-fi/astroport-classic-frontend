import {
  FC,
  ReactNode,
  useMemo,
  Context,
  createContext,
  useContext,
  Consumer,
} from "react";
import { useTerraWebapp } from "@arthuryeti/terra";

import {
  formatPairsToRoutes,
  PairResponse,
  Route,
  Tokens,
  Data,
} from "modules/common";

type Astroswap = {
  pairs: PairResponse[] | null;
  routes: Route[] | null;
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
  } = useTerraWebapp();

  const pairs = useMemo(() => {
    return data[name].pairs;
  }, [data, name]);

  const tokens = useMemo(() => {
    return data[name].tokens;
  }, [data, name]);

  const routes = useMemo(() => {
    if (pairs.length == 0) {
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
