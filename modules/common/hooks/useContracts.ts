import { useMemo } from "react";
import { useWallet } from "@terra-money/wallet-provider";

type Pair = {
  lp: string;
  contract: string;
};

type Contracts = {
  astroToken: string;
  xAstroToken: string;
  bLunaToken: string;
  astroUstPool: string;
  astroUstLpToken: string;
  factory: string;
  router: string;
  vesting: string;
  staking: string;
  maker: string;
  generator: string;
  lockdrop: string;
  airdrop: string;
  airdrop2: string;
  auction: string;
  stakableLp: string[];
};

type Networks = {
  mainnet: Contracts;
  testnet: Contracts;
};

const defaultContracts: { [key: string]: any } = {
  mainnet: {
    astroToken: "terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3",
    xAstroToken: "terra1cw7znqh9w5f2ryyskq76fmxhj9hdl06uv0j0cd",
    astroUstPool: "terra1l7xu2rl3c7qmtx3r5sd2tz25glf6jh8ul7aag7",
    astroUstLpToken: "terra17n5sunn88hpy965mzvt3079fqx3rttnplg779g",
    bLunaToken: "terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp",
    factory: "terra1fnywlw4edny3vw44x04xd67uzkdqluymgreu7g",
    router: "terra16t7dpwwgx9n3lq6l6te3753lsjqwhxwpday9zx",
    vesting: "terra1hncazf652xa0gpcwupxfj6k4kl4k4qg64yzjyf",
    staking: "terra1nq4aszdm82wujstxwpjxtvckg7ghu63mqkey33",
    maker: "terra12u7hcmpltazmmnq0fvyl225usn3fy6qqlp05w0",
    generator: "terra1zgrx9jjqrfye8swykfgmd6hpde60j0nszzupp9",
    lockdrop: "terra1627ldjvxatt54ydd3ns6xaxtd68a2vtyu7kakj",
    airdrop: "terra1dpe2aqykm2vnakcz4vgpha0agxnlkjvgfahhk7",
    airdrop2: "terra1hk7fturdl9fnvrn566dxer6ds7v4jklp2wqmp7",
    auction: "terra1tvld5k6pus2yh7pcu7xuwyjedn7mjxfkkkjjap",
    stakableLp: [
      "terra17n5sunn88hpy965mzvt3079fqx3rttnplg779g",
      "terra1htw7hm40ch0hacm8qpgd24sus4h0tq3hsseatl",
      "terra1m24f7k4g66gnh9f7uncp32p722v0kyt3q4l3u5",
    ],
  },
  testnet: {
    astroToken: "terra1jqcw39c42mf7ngq4drgggakk3ymljgd3r5c3r5",
    xAstroToken: "terra1afev5mg7k6gpyn96sv45ql3r35tyknlr72qc3y",
    astroUstPool: "terra163r28w6jlcn27mzepr6t9lgxmp5vg8305j23j2",
    bLunaToken: "terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x",
    astroUstLpToken: "terra18zjm4scu5wqlskwafclxa9kpa9l3zrvju4vdry",
    factory: "terra15jsahkaf9p0qu8ye873p0u5z6g07wdad0tdq43",
    router: "terra1f98aasp8dluuwurkumpn94a2cuwuv5hpa33fg6",
    vesting: "terra107whrddtmtznrxmvhp9pr25ey8w9yw8lwz8p8c",
    staking: "terra1q55fwnn6wt9wvqmme9qmjt0ng6an9a2p8fypzh",
    maker: "terra1mlntg5c7yq9wp0jzachm0ersk5sar3sfagj0f2",
    generator: "terra1cmqhxgna6uasnycgdcx974uq8u56rp2ta3r356",
    lockdrop: "terra135elmt965n2nm9mwgpv4rf99tsn5xsm360jm6x",
    airdrop: "terra1fz4edcv8ht60jzhdg98dn67pe3n26989rn562j",
    airdrop2: "terra1ph5h0xe73rg35024f4geq325tnsexwkzcz5ln4",
    auction: "terra1xsnfmfsa9p2ru6k7cp5gkqyg7eyef64q96kn0m",
    stakableLp: ["terra1uahqpnm4p3ag8ma40xhtft96uvuxy6vn9p6x9v"],
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
