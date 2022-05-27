import {
  FC,
  ReactNode,
  useMemo,
  Context,
  createContext,
  useContext,
  Consumer,
  Provider,
} from "react";
import { Coin, Dec, LCDClient, Account } from "@terra-money/terra.js";
import { useWallet, NetworkInfo } from "@terra-money/wallet-provider";
import { useQuery } from "react-query";
import useAddress from "hooks/useAddress";
import useLocalStorage from "hooks/useLocalStorage";
import { Networks } from "types/common";
import { DEFAULT_NETWORK } from "constants/constants";

const MAINNET_NETWORK = {
  name: "mainnet",
  chainID: "colombus-5",
  lcd: "https://lcd.terra.dev",
};

type TerraWebapp = {
  network: NetworkInfo;
  client: LCDClient;
  taxCap: Coin | undefined;
  taxRate: Dec | undefined;
  accountInfo: Account | undefined;
};

type Config = {
  lcdClientUrl?: string;
};

const TerraWebappContext: Context<TerraWebapp> = createContext<TerraWebapp>({
  network: MAINNET_NETWORK,
  client: new LCDClient({
    URL: MAINNET_NETWORK.lcd,
    chainID: MAINNET_NETWORK.chainID,
  }),
  taxCap: undefined,
  taxRate: undefined,
  accountInfo: undefined,
});

type Props = {
  children: ReactNode;
  config?: Config;
};

export const TerraWebappProvider: FC<Props> = ({ children, config }) => {
  const { network } = useWallet();
  const address = useAddress();
  const [terraNetwork] = useLocalStorage<Networks>("network", DEFAULT_NETWORK);

  const client = useMemo(() => {
    if (config?.lcdClientUrl) {
      return new LCDClient({
        URL: config?.lcdClientUrl,
        chainID: network.chainID,
        isClassic: terraNetwork === "TERRA_CLASSIC" ? true : false,
      });
    }

    return new LCDClient({
      URL: network.lcd,
      chainID: network.chainID,
      isClassic: terraNetwork === "TERRA_CLASSIC" ? true : false,
    });
  }, [network, terraNetwork]);

  const { data: taxCap } = useQuery(
    ["taxCap", network.chainID, terraNetwork],
    () => {
      return client.treasury.taxCap("uusd");
    },
    { refetchOnWindowFocus: false }
  );

  const { data: taxRate } = useQuery(
    ["taxRate", network.chainID, terraNetwork],
    () => {
      return client.treasury.taxRate();
    },
    { refetchOnWindowFocus: false }
  );

  const { data: accountInfo } = useQuery(
    ["accountInfo", network.chainID, terraNetwork],
    () => {
      return client.auth.accountInfo(address || "");
    },
    { refetchOnWindowFocus: false }
  );

  const value = useMemo(() => {
    return {
      network,
      client,
      taxCap,
      taxRate,
      accountInfo,
    };
  }, [network, client, taxCap, taxRate, accountInfo]);

  const TerraWebappProvider: Provider<TerraWebapp> =
    TerraWebappContext.Provider;

  return <TerraWebappProvider value={value}>{children}</TerraWebappProvider>;
};

export function useTerraWebapp(): TerraWebapp {
  return useContext(TerraWebappContext);
}
export const TerraWebappConsumer: Consumer<TerraWebapp> =
  TerraWebappContext.Consumer;

export default TerraWebappContext;
