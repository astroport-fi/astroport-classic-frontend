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
  auction: string;
  stakableLp: string[];
  pairs: Pair[];
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
    auction: "terra1tvld5k6pus2yh7pcu7xuwyjedn7mjxfkkkjjap",
    stakableLp: [
      "terra17n5sunn88hpy965mzvt3079fqx3rttnplg779g",
      "terra1htw7hm40ch0hacm8qpgd24sus4h0tq3hsseatl",
      "terra1m24f7k4g66gnh9f7uncp32p722v0kyt3q4l3u5",
    ],
    pairs: [
      {
        lp: "terra17dkr9rnmtmu7x4azrpupukvur2crnptyfvsrvr",
        contract: "terra1tndcaqxkpc5ce9qee5ggqf430mr2z3pefe5wj6",
      },
      {
        lp: "terra1nuy34nwnsh53ygpc4xprlj263cztw7vc99leh2",
        contract: "terra1jxazgm67et0ce260kvrpfv50acuushpjsz2y0p",
      },
      {
        lp: "terra1gecs98vcuktyfkrve9czrpgtg0m3aq586x6gzm",
        contract: "terra1gm5p3ner9x9xpwugn9sp6gvhd0lwrtkyrecdn3",
      },
      {
        lp: "terra17gjf2zehfvnyjtdgua9p9ygquk6gukxe7ucgwh",
        contract: "terra1amv303y8kzxuegvurh0gug2xe9wkgj65enq2ux",
      },
      {
        lp: "terra14ffp0waxcck733a9jfd58d86h9rac2chf5xhev",
        contract: "terra1z6tp0ruxvynsx5r9mmcc2wcezz9ey9pmrw5r8g",
      },
      {
        lp: "terra1uwhf02zuaw7grj6gjs7pxt5vuwm79y87ct5p70",
        contract: "terra19pg6d7rrndg4z4t0jhcd7z9nhl3p5ygqttxjll",
      },
      {
        lp: "terra17fysmcl52xjrs8ldswhz7n6mt37r9cmpcguack",
        contract: "terra1e59utusv5rspqsu8t37h5w887d9rdykljedxw0",
      },
      {
        lp: "terra1rqkyau9hanxtn63mjrdfhpnkpddztv3qav0tq2",
        contract: "terra178jydtjvj4gw8earkgnqc80c3hrmqj4kw2welz",
      },
      {
        lp: "terra1q6r8hfdl203htfvpsmyh8x689lp2g0m7856fwd",
        contract: "terra163pkeeuwxzr0yhndf8xd2jprm9hrtk59xf7nqf",
      },
      {
        lp: "terra1n3gt4k3vth0uppk0urche6m3geu9eqcyujt88q",
        contract: "terra1xj2w7w8mx6m2nueczgsxy2gnmujwejjeu2xf78",
      },
    ],
  },
  testnet: {
    astroToken: "terra1cc2up8erdqn2l7nz37qjgvnqy56sr38aj9vqry",
    xAstroToken: "terra1afev5mg7k6gpyn96sv45ql3r35tyknlr72qc3y",
    astroUstPool: "terra163r28w6jlcn27mzepr6t9lgxmp5vg8305j23j2",
    bLunaToken: "terra1qu8ydzc9auz0t6l8ujksx7u75rell3nl4dl5sp",
    astroUstLpToken: "terra1cs66g290h4x0pf6scmwm8904yc75l3m7z0lzjr",
    factory: "terra1x6f9mf9p7p255y3rwrk0kfynzp0kr8m4ervxn4",
    router: "terra1f98aasp8dluuwurkumpn94a2cuwuv5hpa33fg6",
    vesting: "terra10cgjd9cl8l4qhcdzp7y2qgxem78vja76g00tsq",
    staking: "terra1ym46q3cv0vnu6sg7hwch9ewdpnvwdaauxwqg7q",
    maker: "terra1mlntg5c7yq9wp0jzachm0ersk5sar3sfagj0f2",
    generator: "terra1cmqhxgna6uasnycgdcx974uq8u56rp2ta3r356",
    lockdrop: "terra135elmt965n2nm9mwgpv4rf99tsn5xsm360jm6x",
    airdrop: "terra1fz4edcv8ht60jzhdg98dn67pe3n26989rn562j",
    auction: "terra1xsnfmfsa9p2ru6k7cp5gkqyg7eyef64q96kn0m",
    stakableLp: [],
    pairs: [
      {
        contract: "terra13p2rtuujytdtkq8yfyk023etg07j2pqk5jj6gt",
        lp: "terra1uny9qkh8alah28na3alwz4q55zdmdweah2tva9",
      },
      {
        contract: "terra18jwjphjypy4frd92pv3xfhrz7z8dzd4q43smkm",
        lp: "terra1kt83jyhwcy3f7kpp4a9dv4xj0j6q6kts46cugr",
      },
      {
        contract: "terra1jdql7eu69yvehgx87wgtl42l3ft9cvuvjqh804",
        lp: "terra1cdvf7hunhzc2uxvcgg7vclxgp30es9r6njcvp3",
      },
      {
        contract: "terra1lu6u3tx3mwumynjeqtr5246d9lcgxekgyd4cpk",
        lp: "terra1u6ecles2uhukwf0a52luzctz250nrcxlmfyjfu",
      },
      {
        contract: "terra19n54ts9dx6ys2un9udcagw4dqgzsgkf79p3y7m",
        lp: "terra1n02kfssassfwyxgxtpyq8v82s2ke4c3easch75",
      },
      {
        contract: "terra1j8fprjjylz37am2kqjd9mhrsyg4c59hyr3xqp5",
        lp: "terra1x6uxkzdgk2hd3gkhcevnqcfkggsuf7jz9yrp5a",
      },
      {
        contract: "terra1ve6x92vmgaujw4wlqpd3uksttgas5x6aewvacm",
        lp: "terra17mgqlajwajgv7cjry4t8uhdvtxdh6fcy7erz8m",
      },
      {
        contract: "terra16lzd6u80xjr6208j2kf2kl9przug2uhnta6vu2",
        lp: "terra1f44f63tvwejnw9y7kjp9dl0qmxu0uva7e8rrxq",
      },
      {
        contract: "terra182secku8nrn07juw060jq3ftvvy8hpglxjenjp",
        lp: "terra154aqn64eqd3c3srv6gh0s02w8mz2583rdav0t5",
      },
      {
        contract: "terra1s7q6mmpv40xrdzf3jzp0qts3c9drcgl03mn5l2",
        lp: "terra17hu9c6j7ws3f7yg7pnj48xl876gx6ag49h72fw",
      },
      {
        contract: "terra16t9tzx3l0gnxh6ndef35hlnh0yncqen28lt6t6",
        lp: "terra17qx59smfqd2mawrflxlyvq47tj8ldcjl6xtj5h",
      },
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
