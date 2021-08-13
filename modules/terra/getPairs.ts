import { LCDClient } from "@terra-money/terra.js";

const maxPairsLimit = 30;

export const getPairs = async (network): Promise<any> => {
  const client = new LCDClient({
    URL: network.lcd,
    chainID: network.chainID,
  });

  const request = async (lastPairs: any[] = []): Promise<any[]> => {
    const lastPair = lastPairs[lastPairs.length - 1];

    const response: { pairs: any[] } = await client.wasm.contractQuery(
      network.factory,
      {
        pairs: {
          start_after: lastPair && lastPair.asset_infos,
          limit: maxPairsLimit,
        },
      }
    );

    if (response.pairs.length < maxPairsLimit) {
      return [...lastPairs, ...response.pairs];
    }

    return request([...lastPairs, ...response.pairs]);
  };

  return request();
};
