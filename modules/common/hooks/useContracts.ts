import { useMemo } from "react";
import { useWallet } from "@terra-money/wallet-provider";

type Pair = {
  lp: string;
  contract: string;
};

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
  pairs: Pair[];
};

type Networks = {
  mainnet: Contracts;
  testnet: Contracts;
};

const defaultContracts: { [key: string]: any } = {
  mainnet: {
    astroToken: "terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3",
    xAstroToken: "",
    factory: "",
    router: "",
    vesting: "",
    staking: "",
    maker: "",
    generator: "terra1rr5gyh0afr86366j2rflqsnss60sym2223zr6e",
    lockdrop: "terra1627ldjvxatt54ydd3ns6xaxtd68a2vtyu7kakj",
    airdrop: "terra1dpe2aqykm2vnakcz4vgpha0agxnlkjvgfahhk7",
    auction: "terra1tvld5k6pus2yh7pcu7xuwyjedn7mjxfkkkjjap",
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
    xAstroToken: "terra140z3pg6v2nlhr7c8lst5ecgud2t2rhvmv4jn4g",
    factory: "terra1f2qfdywmxrx8rl0qtux8h2fmg6yrunsvtnga0z",
    router: "terra1jtccxaslpl3lhk55gxp56zjhyamnqtkfx3tu6v",
    vesting: "terra1y066wgutm34ygcenzegcmzj7gmlut429hsafwd",
    staking: "terra1qx66v5y70prlt3q0s7mtfe3qjrzadsgs9ggxf4",
    maker: "terra159ch97pxp00ax4hthqvyysfk4m0rwul4tjunwj",
    generator: "terra1nam969dw6cwvwzprwl7k4jclkx3l3307xenqy6",
    lockdrop: "terra14j3rv4n74r0t2el6qrw90wfnyug8pkgdjsm2de",
    airdrop: "terra1tjg0k57c94pxd5pywcuxjkppv4jdye3lkv0js5",
    auction: "terra1hdc5rue48s087xgl4lu6hynsw9hc60drq9udem",
    pairs: [
      {
        lp: "terra12xqxr9j9hawuch7vv6y0gz8l0wetjtvu7xqvh9",
        contract: "terra18ctgudzsvt69hv8yscm9cz8t0t6v0u3s09l2kd",
      },
      {
        lp: "terra1ynr4h9qzsn8ju4rrat6zaek6j6hkywduz44jha",
        contract: "terra13ddrtskjet4jlydhkvt2wuk8ykfk2uve5jt5jn",
      },
      {
        lp: "terra1tkznhysk37rw64nc8p6xkt5tfp2058905avweg",
        contract: "terra1360rky0fjv22vaaxua7cfwfxsytczr6pa6ax56",
      },
      {
        lp: "terra18c9c020k09udyepwp9k6mlaha82nwnz8gfnpzd",
        contract: "terra1000dvulnpd68xeye6r726ehlwpa68ec3hcxv9s",
      },
      {
        lp: "terra1gn7jxqutclyld8q343jaq5rwcy0m3t9jl2xhgd",
        contract: "terra1qjvy2an2mfsjqx6jud5jfjxe8mfgwxuvvyy0jv",
      },
      {
        lp: "terra1qlkq2a6dhe8t00xcmsa6mc6nmhxe9z7y6hx9t6",
        contract: "terra12xaun56xx5u8q7pvfhah0yp2zdew7paprmee5t",
      },
      {
        lp: "terra16muqeueyvyh4g30gpc0yenmykas7wahk0jfkpv",
        contract: "terra1xkcxfy6tmkmcw4yc7efmj6ta4yvuhlhkmpjq8x",
      },
      {
        lp: "terra1k3pcz9pf7utppte4m7t8th2juqxmm9spa9wg9w",
        contract: "terra178q2xeuhkkhs8kaznwuuzgh6kp9g0gylpqtxng",
      },
      {
        lp: "terra1tjesn440ggyapecjn8x52g0g3dxz4hguqldlc0",
        contract: "terra1nm5tqjzkxx4x0ykxu95dy92xs8v588et5356wr",
      },
      {
        lp: "terra1s8rcl6mtacj3t68x024298y6mdqkes3e96vlne",
        contract: "terra1rk9cyas8nufcpaw4jg90f543lrk44rtqe8uvz8",
      },
    ],
  },
  custom: {
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
    pairs: [
      {
        lp: "terra12xqxr9j9hawuch7vv6y0gz8l0wetjtvu7xqvh9",
        contract: "terra18ctgudzsvt69hv8yscm9cz8t0t6v0u3s09l2kd",
      },
      {
        lp: "terra1ynr4h9qzsn8ju4rrat6zaek6j6hkywduz44jha",
        contract: "terra13ddrtskjet4jlydhkvt2wuk8ykfk2uve5jt5jn",
      },
      {
        lp: "terra1tkznhysk37rw64nc8p6xkt5tfp2058905avweg",
        contract: "terra1360rky0fjv22vaaxua7cfwfxsytczr6pa6ax56",
      },
      {
        lp: "terra18c9c020k09udyepwp9k6mlaha82nwnz8gfnpzd",
        contract: "terra1000dvulnpd68xeye6r726ehlwpa68ec3hcxv9s",
      },
      {
        lp: "terra1gn7jxqutclyld8q343jaq5rwcy0m3t9jl2xhgd",
        contract: "terra1qjvy2an2mfsjqx6jud5jfjxe8mfgwxuvvyy0jv",
      },
      {
        lp: "terra1qlkq2a6dhe8t00xcmsa6mc6nmhxe9z7y6hx9t6",
        contract: "terra12xaun56xx5u8q7pvfhah0yp2zdew7paprmee5t",
      },
      {
        lp: "terra16muqeueyvyh4g30gpc0yenmykas7wahk0jfkpv",
        contract: "terra1xkcxfy6tmkmcw4yc7efmj6ta4yvuhlhkmpjq8x",
      },
      {
        lp: "terra1k3pcz9pf7utppte4m7t8th2juqxmm9spa9wg9w",
        contract: "terra178q2xeuhkkhs8kaznwuuzgh6kp9g0gylpqtxng",
      },
      {
        lp: "terra1tjesn440ggyapecjn8x52g0g3dxz4hguqldlc0",
        contract: "terra1nm5tqjzkxx4x0ykxu95dy92xs8v588et5356wr",
      },
      {
        lp: "terra1s8rcl6mtacj3t68x024298y6mdqkes3e96vlne",
        contract: "terra1rk9cyas8nufcpaw4jg90f543lrk44rtqe8uvz8",
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
