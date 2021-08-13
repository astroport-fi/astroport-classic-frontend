export const getPool = async (client, pair) => {
  const response = await client.wasm.contractQuery(pair.contract_addr, {
    pool: {},
  });

  return response;
};
