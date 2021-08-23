export const getPool = async (client, pair) => {
  const response = await client.wasm.contractQuery(pair, {
    pool: {},
  });

  return response;
};
