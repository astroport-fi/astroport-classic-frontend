export type NetworkConfig = ExtNetworkConfig & LocalNetworkConfig;

export interface Network extends NetworkConfig {
  /** Get finder link */
  finder: (address: string, path?: string) => string;
}

export interface ExtNetworkConfig {
  name: string;
  chainID: string;
}

export interface LocalNetworkConfig {
  mantle: string;
  gauge: string;
  factory: string;
  router: string;
  vesting: string;
  staking: string;
  maker: string;
}
