type Token = {
  asset: string;
  symbol: string;
};

export const shouldReverseTokenOrder = (symbol1: string, symbol2: string) => {
  // Should always reverse order if UST is first.
  // Should also reverse order if LUNA appears first,
  // unless it's the LUNA-UST pool.
  return (
    symbol1.toUpperCase() == "UST" ||
    (symbol1.toUpperCase() == "LUNA" && symbol2.toUpperCase() != "UST")
  );
};

export const orderPoolTokens = (token1: Token, token2: Token) => {
  const tokens = [token1, token2];

  if (shouldReverseTokenOrder(token1.symbol, token2.symbol)) {
    tokens.reverse();
  }

  return tokens.map((t) => t.asset);
};

// TODO: remove
export const findRegularToken = (tokens: any) => {
  if (tokens[0] === "uusd") {
    return tokens[1];
  }

  return tokens[0];
};

// TODO: remove
export const enumToArray = (enumeration: any) => {
  return Object.keys(enumeration)
    .map((key) => enumeration[key])
    .filter((value) => typeof value === "string");
};
