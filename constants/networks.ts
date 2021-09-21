import { NetworkInfo } from "@terra-dev/wallet-types";
import { LocalNetworkConfig } from "types/network";

export type AstroportNetworkInfo = NetworkInfo & LocalNetworkConfig;

const networks: Record<string, AstroportNetworkInfo> = {
  mainnet: {
    name: "mainnet",
    chainID: "columbus-4",
    lcd: "https://lcd.terra.dev",
    mantle: "https://mantle.terra.dev",
    factory: "terra1ulgw0td86nvs4wtpsc80thv6xelk76ut7a7apj",
    gauge: "",
    routeContract: "terra19qx5xe6q9ll4w0890ux7lv2p4mf3csd4qvt3ex",
  },
  testnet: {
    name: "testnet",
    chainID: "tequila-0004",
    lcd: "https://tequila-lcd.terra.dev",
    mantle: "https://tequila-mantle.terra.dev",
    factory: "terra18qpjm4zkvqnpjpw0zn0tdr8gdzvt8au35v45xf",
    gauge: "",
    routeContract: "terra1dtzpdj3lc7prd46tuxj2aqy40uv4v4xsphwcpx",
  },
  bombay: {
    name: "bombay",
    chainID: "bombay-10",
    lcd: "https://bombay-lcd.terra.dev",
    mantle: "https://tequila-mantle.terra.dev",
    factory: "terra128enpag6zr6zeruvp4444kjp3ucc4fsghud53g",
    gauge: "terra1crzn2rpjmfg2u5puuq34mq9qxujtzfp5al7xfp",
    routeContract: "terra19nj7w5uc98vy5wzh5yu3unuzyu08klxnvsmslg",
  },
};

export const defaultNetwork = networks.mainnet;

export default networks;
