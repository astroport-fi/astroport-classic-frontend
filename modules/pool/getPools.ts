export const getPools = async (client, pairs) => {
  const pools = await Promise.all(
    pairs.map((pair) => {
      return client.wasm.contractQuery(pair.pair, {
        pool: {},
      });
    })
  );

  return pools;
};
