import { useMemo } from "react";
import { useWallet } from "@terra-money/wallet-provider";

type Contracts = {
  astroToken: string;
  xAstroToken: string;
  factory: string;
  router: string;
  vesting: string;
  staking: string;
  maker: string;
  generator: string;
};

type Networks = {
  mainnet: Contracts;
  testnet: Contracts;
};

const defaultContracts: { [key: string]: any } = {
  mainnet: {
    astroToken: "terra14z0vngwxczcvqjw6k3pl5tj9zuaky2svwxp52g",
    xAstroToken: "terra1xjjey2fhvv6drcltmv8v7kr4w6zzv0z5a4ffpd",
    factory: "terra1q5fku2rf8mcdjz4ud9rsjf2srcd9mhz2d7mwxw",
    router: "terra1n5wm7mehc2xrkm02pzsvvz8cxacwpgjzxn6sv6",
    vesting: "terra1cprn5wzs2zjt7d53yc5k9x7428tdn238u0708a",
    staking: "terra182f6k2hua9m508s5a24mzh2y2e7pk0wwnd4mcd",
    maker: "terra14ynfe88j53xg2lrprdf2g9enghlyv7ag0p3drn",
    generator: "terra109ksx0vmvh2efjlh4j4sxkr027xctmkhxa2825",
  },
  testnet: {
    astroToken: "terra1cc2up8erdqn2l7nz37qjgvnqy56sr38aj9vqry",
    xAstroToken: "terra1xjjey2fhvv6drcltmv8v7kr4w6zzv0z5a4ffpd",
    factory: "terra19czd8x0p2ye2kk948lx2dwhffnychx9nfn9fjm",
    router: "terra1lrphnnsj80zsq4wxxvtufq925g5t3xel24hgj2",
    vesting: "terra1y066wgutm34ygcenzegcmzj7gmlut429hsafwd",
    staking: "terra177ju03a8q9y2uxwxn57uatlgktw70xa7pc24t5",
    maker: "terra1wgprfkvruvdv0wk375u670q2sk0s33djjc5njw",
    generator: "terra1nam969dw6cwvwzprwl7k4jclkx3l3307xenqy6",
  },
};

export const useContracts = (initial?: Networks): Contracts => {
  const {
    network: { name },
  } = useWallet();
  const contracts = initial ?? defaultContracts;

  return useMemo(() => {
    return contracts[name];
  }, [contracts, name]);
};

export default useContracts;
