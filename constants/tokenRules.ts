export type TokenRules = {
  mainnet: { [token: string]: string };
  testnet: { [token: string]: string };
  classic: { [token: string]: string };
};

const tokenRules: TokenRules = {
  mainnet: {
    "": "STT has a 5% sales tax on swaps to other tokens",
  },
  testnet: {
    "": "STT has a 5% sales tax on swaps to other tokens",
  },
  classic: {
    terra13xujxcrc9dqft4p9a8ls0w3j0xnzm6y2uvve8n:
      "STT has a 5% sales tax on swaps to other tokens",
  },
};

export default tokenRules;
