export type NetworkConfig = ExtNetworkConfig & LocalNetworkConfig;

export interface Network extends NetworkConfig {
  finder: (address: string, path?: string) => string;
}

export interface ExtNetworkConfig {
  name: string;
  chainID: string;
}

export interface LocalNetworkConfig {
  gauge: string;
  factory: string;
  router: string;
  vesting: string;
  staking: string;
}
