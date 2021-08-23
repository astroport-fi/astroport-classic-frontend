export interface Coin {
  amount: string;
  denom: string;
}

export interface Asset {
  amount: string;
  token: string;
  symbol?: string;
}

export interface DefaultListedItem {
  symbol: string;
  token: string;
}

export interface ListedItem extends DefaultListedItem {
  name: string;
  pair: string;
  lpToken: string;
  status: ListedItemStatus;
}

export interface ListedItemExternal extends DefaultListedItem {
  pair?: string;
  icon: string;
}

export interface DelistItem {
  symbol: string;
  date: string;
  ratio: string;
}

type ListedItemStatus = "PRE_IPO" | "LISTED" | "DELISTED";
