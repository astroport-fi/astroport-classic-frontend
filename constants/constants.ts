/* terra:network */
export const FINDER = "https://terrascope.info";
// export const FINDER = "https://finder.terra.money";
export const EXTENSION = "https://terra.money/extension";
export const CHROME = "https://google.com/chrome";
export const DOCS = "https://docs.astroportprotocol.com";
export const ICON_URL = "https://whitelist.mirror.finance/images";

export const CHAIN_TO_FINDER_INFO = {
  "columbus-5": "mainnet",
  "bombay-12": "testnet",
};

export const ASTROPORT_URLS = {
  mainnet: "https://app.astroport.fi/",
  testnet: "https://develop.astroport.fi/",
};

/* terra:wasm */
export const WASMQUERY = "WasmContractsContractAddressStore";

/* astroport:unit */
export const SMALLEST = 1e6;

/* astroport:configs */
export const ASTRO_TOKEN = "terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3";
export const DEFAULT_SLIPPAGE = 0.5;
export const COMMISSION = 0.003;
export const ESTIMATE_TOKEN = "uusd";
export const MULTI_SWAP_MAX_SPREAD = "0.15";

export const ONE_TOKEN = 1000000;
export const PROPOSAL_VOTE_POWER = 1000000;
export const DECIMALS = 4;

export const QUERY_STALE_TIME = 30000; // 30 sec

export const SHARE_TOKEN = "terra1l5nrdu9550yjpt2gltv5szm9qzltztmtlld445";
export const COMMON_TOKENS = ["uusd", "uluna"];

export const ASTRO_FORUM_LINK = "https://forum.astroport.fi";
export const ASTRO_DISCORD_LINK = "https://discord.gg/astroport";

/* env variables */
export const ENV_MAINNET_GRAPHQL = process.env.NEXT_PUBLIC_MAINNET_GRAPHQL;

export const ENV_MAINNET_FALLBACK_GRAPHQL =
  process.env.NEXT_PUBLIC_MAINNET_FALLBACK_GRAPHQL;

export const ENV_TESTNET_GRAPHQL = process.env.NEXT_PUBLIC_TESTNET_GRAPHQL;

export const ENV_TESTNET_FALLBACK_GRAPHQL =
  process.env.NEXT_PUBLIC_TESTNET_FALLBACK_GRAPHQL;

export const ENV_COLUMBUS_API_ENDPOINT =
  process.env.NEXT_PUBLIC_COLUMBUS_API_ENDPOINT;

export const ENV_BOMBAY_API_ENDPOINT =
  process.env.NEXT_PUBLIC_BOMBAY_API_ENDPOINT;

export const APR_TOOLTIP =
  "The APR is calculated using token prices denominated in UST. Prices are fetched either from Astroport pools or from Coingecko. Also, the APR is a 365 day projection based on each pool's performance over the last 24h. See Astroport Disclaimers & Disclosures for more details";

export const EXPERT_MODE_TOOLTIP =
  "Expert Mode hides the confirmation screen for swaps and allows someone to swiftly execute swaps without reviewing details for the transaction";

export const DOUBLESIDED_TOOLTIP =
  "Double Sided liquidity provision consists in adding liquidity to a pool using both tokens at the current pool ratio";

export const TOTAL_REWARDS_TOOLTIP =
  "This is the total value of all rewards you accrued and can claim at the moment from all generators you staked LP tokens in";
