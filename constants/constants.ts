/* terra:network */
export const FINDER = "https://finder.terra.money";

export const CHAIN_TO_FINDER_INFO = {
  "phoenix-1": "mainnet",
  "pisco-1": "testnet",
  "columbus-5": "classic",
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
  { name: "Swap", to: "/swap", v2_hidden: false },
  { name: "Pool", to: "/pools", v2_hidden: false },
  { name: "Locked Liquidity", to: "/locked-liquidity", v2_hidden: true },
  { name: "Governance", to: "/governance", v2_hidden: true },
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
export const ENV_APIS: any = {
  mainnet: process.env.NEXT_PUBLIC_API_V2_MAINNET,
  testnet: process.env.NEXT_PUBLIC_API_V2_TESTNET,
  classic: process.env.NEXT_PUBLIC_API_CLASSIC,
};

export const ENV_GQLS: any = {
  mainnet: process.env.NEXT_PUBLIC_GQL_V2_MAINNET,
  testnet: process.env.NEXT_PUBLIC_GQL_V2_TESTNET,
  classic: process.env.NEXT_PUBLIC_GQL_CLASSIC,
};

export const ENV_GQLS_FALLBACKS: any = {
  mainnet: process.env.NEXT_PUBLIC_GQL_FALLBACK_V2_MAINNET,
  testnet: process.env.NEXT_PUBLIC_GQL_FALLBACK_V2_TESTNET,
  classic: null,
};

/* tooltip desc */
export const APR_TOOLTIP =
  "The APR (UST denominated) is calculated using token prices denominated in UST. Prices are fetched either from Astroport pools or from Coingecko. Also, the APR is a 365 day projection based on each pool's performance over the last 24h. See Astroport Disclaimers & Disclosures for more details";

export const EXPERT_MODE_TOOLTIP =
  "Expert Mode hides the confirmation screen and allows someone to swiftly execute swaps without reviewing details for the transaction";

export const DOUBLESIDED_TOOLTIP =
  "Double Sided liquidity provision consists in adding liquidity to a pool using both tokens at the current pool ratio";

export const TOTAL_REWARDS_TOOLTIP =
  "This is the total value of all rewards you accrued and can claim at the moment from all generators you staked LP tokens in";
