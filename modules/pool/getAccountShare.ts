import { LCDClient } from "@terra-money/terra.js";

type Response = {
  balance: string;
};

export const getAccountShare = async (
  client: LCDClient,
  lpToken: string,
  address: string
): Promise<string> => {
  try {
    const response = await client.wasm.contractQuery<Response>(lpToken, {
      balance: {
        address,
      },
    });

    return response.balance;
  } catch (e) {
    return "0";
  }
};
