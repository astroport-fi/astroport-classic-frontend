/* terra:network */
export const DEFAULT_NETWORK = {
  name: "classic",
  chainID: "columbus-5",
  lcd: "https://columbus-lcd.terra.dev",
  walletconnectID: 2,
};

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
export const ENV_CLASSIC_API: string =
  process.env.NEXT_PUBLIC_API_CLASSIC || "";
export const ENV_CLASSIC_GQL: string =
  process.env.NEXT_PUBLIC_GQL_CLASSIC || "";

/* tooltip desc */
export const APR_TOOLTIP =
  "The APR (USTC denominated) is calculated using token prices denominated in USTC. Prices are fetched either from Astroport pools or from Coingecko. Also, the APR is a 365 day projection based on each pool's performance over the last 24h. See Astroport Disclaimers & Disclosures for more details";

export const EXPERT_MODE_TOOLTIP =
  "Expert Mode hides the confirmation screen and allows someone to swiftly execute swaps without reviewing details for the transaction";

export const DOUBLESIDED_TOOLTIP =
  "Double Sided liquidity provision consists in adding liquidity to a pool using both tokens at the current pool ratio";

export const TOTAL_REWARDS_TOOLTIP =
  "This is the total value of all rewards you accrued and can claim at the moment from all generators you staked LP tokens in";

export const ERROR_MESSAGE = {
  AMOUNTS_MUST_BE_GREATER_THAN_ZERO: "Both amounts must be greater than 0.",
  CANNOT_VOTE_OWN_PROPOSAL: "You cannot vote on your own proposal.",
  INSUFFICIENT_TX_FUNDS: "Insufficient LUNA to pay for the transaction.",
  INSUFFICIENT_ASSETS_WALLET: "Insufficient assets in wallet.",
  VOTING_PERIOD_OVER: "Voting period is over.",
  CONNECT_WALLET: "Please connect your wallet to proceed.",
  POOL_ALREADY_CREATED:
    "This pool already exists, please use the existing pool or create a pool for a different pair.",
  POOL_UNIQUE_TOKENS: "Please select unique tokens to proceed.",
  ALREADY_VOTED: (placeholder: string) =>
    `You have already voted ${placeholder}} this proposal.`,
  MAX_SPREAD_LIMIT: (maxSpread: number) =>
    `The swap exceeds the max allowed spread of ${maxSpread}%.`,
};

export const CONSTANT_PRODUCT_POOL_DESCRIPTION =
  "As the most common pool type, constant product pools are designed for tokens whose prices move independently of one another (e.g. ASTRO-USTC).";
export const STABLE_SWAP_POOL_DESCRIPTION =
  "This specialized pool type is designed for tokens with 1:1 pricing such as stablecoins (e.g. bLUNAC-LUNAC).";
export const AMPLIFICATION_DESCRIPTION =
  "The amplification parameter impacts the price slippage users will experience in this pool. A high parameter value (e.g. 100) results in lower slippage when the assets trade around the 1:1 target exchange rate. However, if the pool becomes unbalanced and assets are not trading 1:1, slippage will occur sooner. In general, pairs that consistently trade at 1:1 rates can support higher parameter values (e.g. 100). Pairs that may occasionally experience slight price divergences may work better with lower parameter values (e.g. 10).";
