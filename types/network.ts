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
  /** Contract Addresses JSON URL */
  routeContract: string;
  /** Graphql server URL */
  gauge: string;
  mantle: string;
  factory: string;
}
