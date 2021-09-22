import { NetworkInfo } from "@terra-dev/wallet-types";
import { LocalNetworkConfig } from "types/network";

export type AstroportNetworkInfo = NetworkInfo & LocalNetworkConfig;

const networks: Record<string, AstroportNetworkInfo> = {
  mainnet: {
    name: "mainnet",
    chainID: "columbus-4",
    lcd: "https://lcd.terra.dev",
    mantle: "https://mantle.terra.dev",
    factory: "",
    gauge: "",
    router: "",
    vesting: "",
    staking: "",
    maker: "",
  },
  testnet: {
    name: "testnet",
    chainID: "tequila-0004",
    lcd: "https://tequila-lcd.terra.dev",
    mantle: "https://tequila-mantle.terra.dev",
    factory: "",
    gauge: "",
    router: "",
    vesting: "",
    staking: "",
    maker: "",
  },
  bombay: {
    name: "bombay",
    chainID: "bombay-11",
    lcd: "https://bombay-lcd.terra.dev",
    mantle: "https://tequila-mantle.terra.dev",
    factory: "terra18m9txldd9257km6yt5073dkapz6k2fupeyph9c",
    gauge: "terra1qn3n64k2uwfq88305t4p98mrgre8qvjavmrwtw",
    router: "terra1gy0223u4nu68vtp77k2dkq0wjt7m52tu37lvdr",
    vesting: "terra18kcyyfkmkt84808qfdhwxf4sejh7nnacv2rhpc",
    staking: "terra1j5m6f63hs9f5s3rx7tnu4a750dx9fcvpvt3vq3",
    maker: "terra1whs7psy9lr7xlputhamdvy82t4wylcwuzcehxl",
  },
};

export const defaultNetwork = networks.mainnet;

export default networks;
