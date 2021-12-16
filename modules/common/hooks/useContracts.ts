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
  lockdrop: string;
  airdrop: string;
  auction: string;
};

type Networks = {
  mainnet: Contracts;
  testnet: Contracts;
};

const defaultContracts: { [key: string]: any } = {
  mainnet: {
    astroToken: "",
    xAstroToken: "",
    factory: "",
    router: "",
    vesting: "",
    staking: "",
    maker: "",
    generator: "",
    lockdrop: "",
    airdrop: "",
    auction: "",
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
    lockdrop: "terra1gpcrjee2jvexnev662586kruc4ju3st9ukwgk9",
    airdrop: "terra1rmskcsc338tw4s6ddqm4gvj8uap59hdwm6kxkm",
    auction: "terra1mqf88a02ukxf5ctx568hrusumcf792h7fdhtlw",
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
