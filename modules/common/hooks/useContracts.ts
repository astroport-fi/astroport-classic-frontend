import { useMemo } from "react";
import { useWallet } from "@terra-money/wallet-provider";

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
  assembly: string;
  stakableLp: string[];
};

type Networks = {
  mainnet: Contracts;
  testnet: Contracts;
  classic: Contracts;
};

const defaultContracts: { [key: string]: any } = {
  mainnet: {
    astroToken: "",
    xAstroToken: "",
    astroUstPool: "",
    astroUstLpToken: "",
    bLunaToken: "",
    factory: "",
    router: "",
    vesting: "",
    staking: "",
    maker: "",
    generator: "",
    lockdrop: "",
    airdrop: "",
    airdrop2: "",
    auction: "",
    assembly: "",
    stakableLp: [],
  },
  testnet: {
    astroToken: "",
    xAstroToken: "",
    astroUstPool: "",
    astroUstLpToken: "",
    bLunaToken: "",
    factory: "",
    router: "",
    vesting: "",
    staking: "",
    maker: "",
    generator: "",
    lockdrop: "",
    airdrop: "",
    airdrop2: "",
    auction: "",
    assembly: "",
    stakableLp: [],
  },
  classic: {
    astroToken: "terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3",
    xAstroToken: "terra14lpnyzc9z4g3ugr4lhm8s4nle0tq8vcltkhzh7",
    astroUstPool: "terra1l7xu2rl3c7qmtx3r5sd2tz25glf6jh8ul7aag7",
    astroUstLpToken: "terra17n5sunn88hpy965mzvt3079fqx3rttnplg779g",
    bLunaToken: "terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp",
    factory: "terra1fnywlw4edny3vw44x04xd67uzkdqluymgreu7g",
    router: "terra16t7dpwwgx9n3lq6l6te3753lsjqwhxwpday9zx",
    vesting: "terra1hncazf652xa0gpcwupxfj6k4kl4k4qg64yzjyf",
    staking: "terra1f68wt2ch3cx2g62dxtc8v68mkdh5wchdgdjwz7",
    maker: "terra12u7hcmpltazmmnq0fvyl225usn3fy6qqlp05w0",
    generator: "terra1zgrx9jjqrfye8swykfgmd6hpde60j0nszzupp9",
    lockdrop: "terra1627ldjvxatt54ydd3ns6xaxtd68a2vtyu7kakj",
    airdrop: "terra1dpe2aqykm2vnakcz4vgpha0agxnlkjvgfahhk7",
    airdrop2: "terra1hk7fturdl9fnvrn566dxer6ds7v4jklp2wqmp7",
    auction: "terra1tvld5k6pus2yh7pcu7xuwyjedn7mjxfkkkjjap",
    assembly: "terra1sq9ppsvt4k378wwhvm2vyfg7kqrhtve8p0n3a6",
    stakableLp: [
      "terra17n5sunn88hpy965mzvt3079fqx3rttnplg779g",
      "terra1htw7hm40ch0hacm8qpgd24sus4h0tq3hsseatl",
      "terra14p4srhzd5zng8vghly5artly0s53dmryvg3qc6",
      "terra1m24f7k4g66gnh9f7uncp32p722v0kyt3q4l3u5",
      "terra1lw36qqz72mxajrfgkv24lahudq3ehmkpc305yc",
      "terra1zuktmswe9zjck0xdpw2k79t0crjk86fljv2rm0",
      "terra1wmaty65yt7mjw6fjfymkd9zsm6atsq82d9arcd",
      "terra1w80npmymwhdtvcmrg44xmqqdnufu3gyfaytr9z",
      "terra1krvq5hk3a37yeydzfrgjj00d8xygk5um9jas8p",
      "terra1cgvlpz6vltqa49jlj3yr2ddnwy22xw62k4433t",
      "terra1h2lasu3a5207yt7decg0s09z5ltw953nrgj820",
      "terra1qz4cv5lsfw4k2266q52z9rtz64n58paxy9d476",
      "terra17trxzqjetl0q6xxep0s2w743dhw2cay0x47puc",
      "terra16unvjel8vvtanxjpw49ehvga5qjlstn8c826qe",
      "terra1cspx9menzglmn7xt3tcn8v8lg6gu9r50d7lnve",
      "terra1pjfqacx7k6dg63v2h5q96zjg7w5q25093wnkjc",
      "terra1t53c8p0zwvj5xx7sxh3qtse0fq5765dltjrg33",
      "terra1ww6sqvfgmktp0afcmvg78st6z89x5zr3tmvpss",
      "terra16zy9g2eym8rghxx95ny60c3dyrwqsfx0ypmu5y",
      "terra1yfwpk58tlvgzxx7zfrutlskgcp0cdqxtngpp6y",
      "terra1drradty46zqun4624p8a3sp9h5jfg9phwlgnm2",
    ],
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
