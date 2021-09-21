export const getAccountShare = async (client, lpToken, address) => {
  const response: any = await client.wasm.contractQuery(lpToken, {
    balance: {
      address,
    },
  });

  return response.balance;
};
