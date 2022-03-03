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
    ],
  },
  testnet: {
    astroToken: "terra1jqcw39c42mf7ngq4drgggakk3ymljgd3r5c3r5",
    xAstroToken: "terra1yufp7cv85qrxrx56ulpfgstt2gxz905fgmysq0",
    astroUstPool: "terra163r28w6jlcn27mzepr6t9lgxmp5vg8305j23j2",
    bLunaToken: "terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x",
    astroUstLpToken: "terra18zjm4scu5wqlskwafclxa9kpa9l3zrvju4vdry",
    factory: "terra15jsahkaf9p0qu8ye873p0u5z6g07wdad0tdq43",
    router: "terra13wf295fj9u209nknz2cgqmmna7ry3d3j5kv7t4",
    vesting: "terra1g73et67yraz33vtwtg8c7q39gq50z2q92dz822",
    staking: "terra1h2smqfg9lmemewwde9a4vf8fcp6z8666kxdhzh",
    maker: "terra1mlntg5c7yq9wp0jzachm0ersk5sar3sfagj0f2",
    generator: "terra1gjm7d9nmewn27qzrvqyhda8zsfl40aya7tvaw5",
    lockdrop: "terra1dd9kewme9pwhurvlzuvvljq5ukecft9axyej42",
    airdrop: "terra1xd4ceehws4z5052v8qp3t65ugn9zptv8gx23el",
    airdrop2: "terra1ph5h0xe73rg35024f4geq325tnsexwkzcz5ln4",
    auction: "terra1mjqjcv7yl94h6y35ng7eqstakxjx9g57suscx7",
    stakableLp: [
      "terra1dqjpcqej9nxej80u0p56rhkrzlr6w8tp7txkmj",
      "terra14e7z2ll6eweq6cxe6qkvl28hatapmw2uflxcyt",
      "terra1agu2qllktlmf0jdkuhcheqtchnkppzrl4759y6",
      "terra1efmcf22aweaj3zzjhzgyghv88dda0yk4j9jp29",
      "terra1qrpflfyte76cvxdj8tftj2qvat47aus38h58p4",
      "terra1nzmdsg20gd04cxzmvmzg0zglvz5yan3fmzg9t8",
      "terra159xnereggxkfdswssheajdkr6n569q6hffl5p6",
      "terra18zjm4scu5wqlskwafclxa9kpa9l3zrvju4vdry",
      "terra1tcctmat9yu23grgczpyeynl83echgvlc4uvzmg",
      "terra12ekyxay62wa5zq8tcgqysw83hvtfs9qhe9j66v",
      "terra1zv9uhshhuw6yr4m95nx54cpl0g4ahska5uwfv8",
      "terra1neqsjj9dq6lfu6xmrsn06mrzrttax0glfa7f92",
      "terra1dpzuan9dyp20ze7ttfv4n6vwjl9k0j9nppzq2s",
      "terra1kyjspjr054v00nw7g2fttk6fq9furq9wjsy0x2",
      "terra1w50p86452w5l9xmpa67nrga4umxvp5u749cfpp",
      "terra1mn8xw7ksu9wc38m4rnvdu9nu36ntur26gat4wj",
      "terra1pmratq75tq4wtp36sedtl3g5awm9vt4ac9udhl",
      "terra1yswta20vpvja93lw3r4f0xh50dpjuqjnzjrm9l",
      "terra1m29xstn4c45cud3m8e7ktggsgjvsm8p826qkez",
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
