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

export const GOV_PROPOSAL_STEPS = [
  "Created",
  "Active",
  "Succeeded",
  "Queued",
  "Executed",
];

export const REWARDS_NOTICE =
  "The APY/APR are calculated using token prices denominated in UST. Prices are fetched either from Astroport pools or from Coingecko. Also, the APY/APR are 365 day projections based on each pool's performance over the last 24h. See Astroport Disclaimers & Disclosures for more details";

/* env variables */
export const ENV_DISPLAY_GOVERNANCE =
  process.env.NEXT_PUBLIC_DISPLAY_GOVERNANCE === "1" ? true : false;
