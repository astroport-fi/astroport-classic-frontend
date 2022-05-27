import { Networks } from "types/common";

/* terra:network */
export const DEFAULT_NETWORK: Networks = "TERRA_V2";
export const FINDER = "https://finder.terra.money";

export const CHAIN_TO_FINDER_INFO = {
  "columbus-5": "classic",
  "bombay-12": "testnet",
};

export const ASTROPORT_URLS = {
  classic: "https://app.astroport.fi/",
  testnet: "https://develop.astroport.fi/",
};

/* astroport:configs */
export const DEFAULT_SLIPPAGE = 0.5;
export const MULTI_SWAP_MAX_SPREAD = "0.15";

export const ONE_TOKEN = 1000000;
export const PROPOSAL_VOTE_POWER = 1000000;

export const QUERY_STALE_TIME = 30000; // 30 sec

export const COMMON_TOKENS = ["uusd", "uluna"];

export const ASTRO_FORUM_LINK = "https://forum.astroport.fi";
export const ASTRO_DISCORD_LINK = "https://discord.gg/astroport";

export const MOBILE_MAX_WIDTH = "768px";
export const MOBILE_NAV_HEIGHT = "60px";
export const MOBILE_SCROLL_Y_OFFSET = 420;

/* mobile nav pages */

// display hamburger menu on nav bar
export const MOBILE_MAIN_PAGES = [
  { name: "Swap", to: "/swap" },
  { name: "Pool", to: "/pools" },
  { name: "Locked Liquidity", to: "/locked-liquidity" },
  { name: "Governance", to: "/governance" },
];

// display back button on nav bar
export const MOBILE_SECONDARY_PAGES = [
  { name: "Stake / Unstake LP Token", regex: "/pools/.*/stake" },
  { name: "Liquidity", regex: "/pools/.*" },
  { name: "Unlock LP Tokens", regex: "/unlock/.*" },
  { name: "Unlock LP Tokens", regex: "/unlock-phase-2" },
  { name: "Submit Proposal", regex: "/governance/new-proposal" },
  { name: "Proposal Detail", regex: "/governance/proposal/.*" },
];

/* env variables */
export const ENV_MAINNET_GRAPHQL = process.env["NEXT_PUBLIC_MAINNET_GRAPHQL"];

export const ENV_MAINNET_FALLBACK_GRAPHQL =
  process.env["NEXT_PUBLIC_MAINNET_FALLBACK_GRAPHQL"];

export const ENV_TESTNET_GRAPHQL = process.env["NEXT_PUBLIC_TESTNET_GRAPHQL"];

export const ENV_TESTNET_FALLBACK_GRAPHQL =
  process.env["NEXT_PUBLIC_TESTNET_FALLBACK_GRAPHQL"];

export const ENV_COLUMBUS_API_ENDPOINT =
  process.env["NEXT_PUBLIC_COLUMBUS_API_ENDPOINT"] || "";

export const ENV_BOMBAY_API_ENDPOINT =
  process.env["NEXT_PUBLIC_BOMBAY_API_ENDPOINT"] || "";

/* tooltip desc */
export const APR_TOOLTIP =
  "The APR (UST denominated) is calculated using token prices denominated in UST. Prices are fetched either from Astroport pools or from Coingecko. Also, the APR is a 365 day projection based on each pool's performance over the last 24h. See Astroport Disclaimers & Disclosures for more details";

export const EXPERT_MODE_TOOLTIP =
  "Expert Mode hides the confirmation screen and allows someone to swiftly execute swaps without reviewing details for the transaction";

export const DOUBLESIDED_TOOLTIP =
  "Double Sided liquidity provision consists in adding liquidity to a pool using both tokens at the current pool ratio";

export const TOTAL_REWARDS_TOOLTIP =
  "This is the total value of all rewards you accrued and can claim at the moment from all generators you staked LP tokens in";
