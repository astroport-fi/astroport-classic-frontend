/* terra:network */
export const FINDER = "https://finder.extraterrestrial.money";
// export const FINDER = "https://finder.terra.money";
export const EXTENSION = "https://terra.money/extension";
export const CHROME = "https://google.com/chrome";
export const DOCS = "https://docs.astroportprotocol.com";
export const ICON_URL = "https://whitelist.mirror.finance/images";

/* terra:wasm */
export const WASMQUERY = "WasmContractsContractAddressStore";

/* astroport:unit */
export const SMALLEST = 1e6;

/* astroport:configs */
export const ASTRO_TOKEN = "terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3";
export const DEFAULT_SLIPPAGE = 0.5;
export const COMMISSION = 0.003;
export const ESTIMATE_TOKEN = "uusd";

export const ONE_TOKEN = 1000000;
export const DECIMALS = 4;

export const SHARE_TOKEN = "terra1l5nrdu9550yjpt2gltv5szm9qzltztmtlld445";
export const COMMON_TOKENS = ["uusd", "uluna"];

export const APY_NOTICE =
  "The estimated combined APY calculation combines all individual APRs and assumes daily compounding";

/* deployment env */
export const DEPLOYMENT_PREVIEW =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "preview" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV == undefined
    ? true
    : false;
