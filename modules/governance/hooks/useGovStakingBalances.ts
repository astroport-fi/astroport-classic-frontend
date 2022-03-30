import { gql } from "graphql-request";
import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useApi, useContracts } from "modules/common";
import { useQuery } from "react-query";
import { QUERY_STALE_TIME } from "constants/constants";

const query = gql`
  query Supply {
    supply {
      circulatingSupply
    }
  }
`;

type Response = {
  balance: string;
};

type ResponseSupply = {
  total_supply: string;
};

type BalanceReturns = {
  astroBalance: string | null;
  xAstroBalance: string | null;
  stakedAstroBalance: string | null;
  xAstroSupply: string | null;
  astroCircSupply: any;
};

export const useGovStakingBalances = (): BalanceReturns => {
  const { client } = useTerraWebapp();
  const address = useAddress();
  const { astroToken, xAstroToken, staking } = useContracts();

  const { data: astroBalance } = useQuery(
    ["balance", astroToken, address],
    () => {
      return client.wasm.contractQuery<Response>(astroToken, {
        balance: {
          address,
        },
      });
    }
  );

  const { data: xAstroBalance } = useQuery(
    ["balance", xAstroToken, address],
    () => {
      return client.wasm.contractQuery<Response>(xAstroToken, {
        balance: {
          address,
        },
      });
    }
  );

  const { data: stakedAstroBalance } = useQuery(
    ["balance", astroToken, staking],
    () => {
      return client.wasm.contractQuery<Response>(astroToken, {
        balance: {
          address: staking,
        },
      });
    }
  );

  const { data: astroCircSupply } = useApi({
    name: "supply",
    query,
    options: {
      enabled: !!query,
      staleTime: QUERY_STALE_TIME,
    },
  });

  const { data: xAstroSupply } = useQuery(["supply", xAstroToken], () => {
    return client.wasm.contractQuery<ResponseSupply>(xAstroToken, {
      token_info: {},
    });
  });

  return {
    astroBalance: astroBalance?.balance,
    xAstroBalance: xAstroBalance?.balance,
    stakedAstroBalance: stakedAstroBalance?.balance,
    xAstroSupply: xAstroSupply?.total_supply,
    astroCircSupply: astroCircSupply?.supply?.circulatingSupply,
  };
};
