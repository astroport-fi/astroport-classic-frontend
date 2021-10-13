import { useMemo } from "react";
import { useWallet } from "@terra-money/wallet-provider";

type Contracts = {
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
    factory: "terra1q5fku2rf8mcdjz4ud9rsjf2srcd9mhz2d7mwxw",
    router: "terra1n5wm7mehc2xrkm02pzsvvz8cxacwpgjzxn6sv6",
    vesting: "terra1cprn5wzs2zjt7d53yc5k9x7428tdn238u0708a",
    staking: "terra12spzaqkfjmce6fe0llpz97nmwsn8jznwacw97r",
    maker: "terra14ynfe88j53xg2lrprdf2g9enghlyv7ag0p3drn",
    generator: "terra109ksx0vmvh2efjlh4j4sxkr027xctmkhxa2825",
  },
  testnet: {
    factory: "terra1q5fku2rf8mcdjz4ud9rsjf2srcd9mhz2d7mwxw",
    router: "terra1n5wm7mehc2xrkm02pzsvvz8cxacwpgjzxn6sv6",
    vesting: "terra1cprn5wzs2zjt7d53yc5k9x7428tdn238u0708a",
    staking: "terra12spzaqkfjmce6fe0llpz97nmwsn8jznwacw97r",
    maker: "terra14ynfe88j53xg2lrprdf2g9enghlyv7ag0p3drn",
    generator: "terra109ksx0vmvh2efjlh4j4sxkr027xctmkhxa2825",
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
