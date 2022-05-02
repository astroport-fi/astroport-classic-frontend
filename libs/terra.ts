import { getTokenDenom } from "modules/common";

export const getAssetAmountsInPool = (assets: any, token: string) => {
  return assets.reduce(
    (prev: any, a: any) => {
      const key = getTokenDenom(a.info) === token ? "token1" : "token2";

      return {
        ...prev,
        [key]: a.amount,
      };
    },
    { token1: null, token2: null }
  );
};

type EstimateFeeOpts = {
  client: LCDClient;
  address: string;
  msgs: MsgExecuteContract[] | null | undefined;
  opts: { gasAdjustment?: number };
};

export const estimateFee = async ({
  client,
  address,
  msgs,
  opts: { gasAdjustment },
}: EstimateFeeOpts) => {
  if (msgs == null || client == null || address == null) {
    throw new Error("`client`, `address` or `msgs` is null");
  }

  const txOptions: CreateTxOptions = {
    msgs,
    gasPrices: new Coins([new Coin("uusd", 0.15)]),
    feeDenoms: ["uusd"],
  };
  if (gasAdjustment) {
    txOptions.gasAdjustment = gasAdjustment;
  }

  const accountInfo = await client.auth.accountInfo(address);

  return client.tx.estimateFee(
    [
      {
        sequenceNumber: accountInfo.getSequenceNumber(),
        publicKey: accountInfo.getPublicKey(),
      },
    ],
    txOptions
  );
};

export const toBase64 = (obj: object) => {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
};

/**
 * Format Terra amount
 * @param value - string: amount from Terra blockchain
 * @param format - string: numeral format
 * @returns string
 */
export const fromTerraAmount = (
  value: BigNumber.Value = "0",
  format = "0,0.00a"
): string => {
  const amount = new BigNumber(value).div(ONE_TOKEN);
  return numeral(amount).format(format).toUpperCase();
};

export const toTerraAmount = (value: BigNumber.Value = "0"): string => {
  return new BigNumber(value).dp(6).times(ONE_TOKEN).toString();
};
