import { useMemo } from "react";
import { useWallet } from "@terra-money/wallet-provider";

type Contracts = {
  factory: string;
  router: string;
  gauge: string;
};

type Networks = {
  mainnet: Contracts;
  testnet: Contracts;
};

const defaultContracts: { [key: string]: any } = {
  mainnet: {
    factory: "terra1ulgw0td86nvs4wtpsc80thv6xelk76ut7a7apj",
    router: "terra19qx5xe6q9ll4w0890ux7lv2p4mf3csd4qvt3ex",
    gauge: "terra108dtc5yp4rwee8s8xesxczx68twdyp26c6w3mf",
  },
  testnet: {
    factory: "terra18qpjm4zkvqnpjpw0zn0tdr8gdzvt8au35v45xf",
    router: "terra14z80rwpd0alzj4xdtgqdmcqt9wd9xj5ffd60wp",
    gauge: "terra108dtc5yp4rwee8s8xesxczx68twdyp26c6w3mf",
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
