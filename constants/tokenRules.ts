export type TokenRules = {
  classic: { [token: string]: string };
  testnet: { [token: string]: string };
};

const tokenRules: TokenRules = {
  classic: {
    terra13xujxcrc9dqft4p9a8ls0w3j0xnzm6y2uvve8n:
      "STT has a 5% sales tax on swaps to other tokens",
  },
  testnet: {
    terra1szee0j4m8c75etfs9le9tepa4mc80t3vpf72ls:
      "STT has a 5% sales tax on swaps to other tokens",
  },
};

export default tokenRules;
