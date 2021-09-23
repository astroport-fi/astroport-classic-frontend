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
  },
  bombay: {
    name: "bombay",
    chainID: "bombay-11",
    lcd: "https://bombay-lcd.terra.dev",
    mantle: "https://tequila-mantle.terra.dev",
    factory: "terra1r7pvpgy885tsaytshglvax564u29gjezsy444s",
    router: "terra13xjkn6cu6fpf0mdaj7lh3659ula362amds44ky",
    vesting: "terra17c5aqj76y0y5jkrhazeh0afsusc32r7fwj0k7n",
    staking: "terra1vmetq58w2fcrqfz0v3g6l9ecu6j6ee5004vaz9",
    gauge: "terra108dtc5yp4rwee8s8xesxczx68twdyp26c6w3mf",
  },
};

export const defaultNetwork = networks.mainnet;

export default networks;
