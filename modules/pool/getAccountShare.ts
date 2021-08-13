export const getAccountShare = async (client, pair, address) => {
  const response: any = await client.wasm.contractQuery(pair.liquidity_token, {
    balance: {
      address,
    },
  });

  return response.balance;
};
