export type TokenRules = {
  "phoenix-1": { [token: string]: string };
  "pisco-1": { [token: string]: string };
  "columbus-5": { [token: string]: string };
};

const tokenRules: TokenRules = {
  "phoenix-1": {
    "": "STT has a 5% sales tax on swaps to other tokens",
  },
  "pisco-1": {
    "": "STT has a 5% sales tax on swaps to other tokens",
  },
  "columbus-5": {
    terra13xujxcrc9dqft4p9a8ls0w3j0xnzm6y2uvve8n:
      "STT has a 5% sales tax on swaps to other tokens",
  },
};

export default tokenRules;
