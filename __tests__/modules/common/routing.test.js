import { pairsToGraph, getSwapRoute } from "modules/common/routing";

const buildPair = (
  contract_addr = "terrapair1",
  assets = ["uluna", "uust"],
  pair_type = "xyk",
  liquidity_token = "terralp1"
) => {
  const asset_infos = assets.map((asset) => {
    if (asset.startsWith("u")) {
      return {
        native_token: {
          denom: asset,
        },
      };
    } else {
      return {
        token: {
          contract_addr: asset,
        },
      };
    }
  });

  return {
    contract_addr,
    asset_infos,
    liquidity_token,
    pair_type: {
      [pair_type]: {},
    },
  };
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

describe("routing", () => {
  const terrapair1 = buildPair("terrapair1", ["uusd", "uluna"]);
  const terrapair2 = buildPair("terrapair2", ["uusd", "terratoken1"]);
  const terrapair3 = buildPair("terrapair3", ["uusd", "terratoken2"]);
  const terrapair4 = buildPair("terrapair4", ["terratoken2", "terratoken3"]);
  const terrapair5 = buildPair(
    "terrapair5",
    ["terratoken3", "terratoken4"],
    "stable"
  );
  const terrapair6 = buildPair("terrapair6", ["terratoken3", "terratoken5"]);
  const terrapair7 = buildPair("terrapair7", ["terratoken4", "uluna"]);

  let pairs;

  beforeEach(() => {
    // Shuffle pairs to add some entropy to our tests and ensure we're never reliant on pair order
    pairs = shuffle([
      terrapair1,
      terrapair2,
      terrapair3,
      terrapair4,
      terrapair5,
      terrapair6,
      terrapair7,
    ]);
  });

  describe("pairsToGraph", () => {
    it("returns adjacency list of all tokens in all pairs and the tokens they can swap to", () => {
      const graph = pairsToGraph(pairs);

      expect(graph).toEqual({
        uusd: new Set([
          { pair: terrapair1, token: "uluna" },
          { pair: terrapair2, token: "terratoken1" },
          { pair: terrapair3, token: "terratoken2" },
        ]),
        uluna: new Set([
          { pair: terrapair1, token: "uusd" },
          { pair: terrapair7, token: "terratoken4" },
        ]),
        terratoken1: new Set([{ pair: terrapair2, token: "uusd" }]),
        terratoken2: new Set([
          { pair: terrapair3, token: "uusd" },
          { pair: terrapair4, token: "terratoken3" },
        ]),
        terratoken3: new Set([
          { pair: terrapair4, token: "terratoken2" },
          { pair: terrapair5, token: "terratoken4" },
          { pair: terrapair6, token: "terratoken5" },
        ]),
        terratoken4: new Set([
          { pair: terrapair5, token: "terratoken3" },
          { pair: terrapair7, token: "uluna" },
        ]),
        terratoken5: new Set([{ pair: terrapair6, token: "terratoken3" }]),
      });
    });
  });

  describe("getSwapRoute", () => {
    it("returns single hop route between native tokens (uluna/uusd)", () => {
      const route = getSwapRoute({
        tokenGraph: pairsToGraph(pairs),
        from: "uluna",
        to: "uusd",
      });

      expect(route).toEqual([
        {
          contract_addr: "terrapair1",
          from: "uluna",
          to: "uusd",
          type: "xyk",
        },
      ]);
    });

    it("returns route from/to in requested order (uusd/uluna and not uluna/uusd) for single hop route", () => {
      const route = getSwapRoute({
        tokenGraph: pairsToGraph(pairs),
        from: "uusd",
        to: "uluna",
      });

      expect(route).toEqual([
        {
          contract_addr: "terrapair1",
          from: "uusd",
          to: "uluna",
          type: "xyk",
        },
      ]);
    });

    it("returns single hop route with mixed native and contract tokens", () => {
      const route = getSwapRoute({
        tokenGraph: pairsToGraph(pairs),
        from: "terratoken1",
        to: "uusd",
      });

      expect(route).toEqual([
        {
          contract_addr: "terrapair2",
          from: "terratoken1",
          to: "uusd",
          type: "xyk",
        },
      ]);
    });

    it("returns single hop route with contract tokens", () => {
      const route = getSwapRoute({
        tokenGraph: pairsToGraph(pairs),
        from: "terratoken2",
        to: "terratoken3",
      });

      expect(route).toEqual([
        {
          contract_addr: "terrapair4",
          from: "terratoken2",
          to: "terratoken3",
          type: "xyk",
        },
      ]);
    });

    it("returns shortest multi-hop route when there are multiple possible routes", () => {
      const route = getSwapRoute({
        tokenGraph: pairsToGraph(pairs),
        from: "uluna",
        to: "terratoken5",
      });

      // This is the shortest route, but the longer route is:
      //  uluna -> uusd -> terratoken2 -> terratoken3 -> terratoken5

      expect(route).toEqual([
        {
          contract_addr: "terrapair7",
          from: "uluna",
          to: "terratoken4",
          type: "xyk",
        },
        {
          contract_addr: "terrapair5",
          from: "terratoken4",
          to: "terratoken3",
          type: "stable",
        },
        {
          contract_addr: "terrapair6",
          from: "terratoken3",
          to: "terratoken5",
          type: "xyk",
        },
      ]);
    });

    it("returns only route when there is only one possible route", () => {
      const route = getSwapRoute({
        tokenGraph: pairsToGraph(pairs),
        from: "terratoken1",
        to: "uluna",
      });

      expect(route).toEqual([
        {
          contract_addr: "terrapair2",
          from: "terratoken1",
          to: "uusd",
          type: "xyk",
        },
        {
          contract_addr: "terrapair1",
          from: "uusd",
          to: "uluna",
          type: "xyk",
        },
      ]);
    });

    it("returns null when pairs are null", () => {
      const route = getSwapRoute({
        tokenGraph: null,
        from: "uusd",
        to: "uluna",
      });

      expect(route).toEqual(null);
    });

    it("returns null when from token is null", () => {
      const route = getSwapRoute({
        tokenGraph: pairsToGraph(pairs),
        from: null,
        to: "uluna",
      });

      expect(route).toEqual(null);
    });

    it("returns null when to token is null", () => {
      const route = getSwapRoute({
        tokenGraph: pairsToGraph(pairs),
        from: "uusd",
        to: null,
      });

      expect(route).toEqual(null);
    });

    it("returns empty array when from and to token are the same", () => {
      const route = getSwapRoute({
        tokenGraph: pairsToGraph(pairs),
        from: "uluna",
        to: "uluna",
      });

      expect(route).toEqual([]);
    });

    it("returns null when from token is not in graph", () => {
      const route = getSwapRoute({
        tokenGraph: pairsToGraph(pairs),
        from: "foo",
        to: "uluna",
      });

      expect(route).toEqual(null);
    });

    it("returns null when to token is not in graph", () => {
      const route = getSwapRoute({
        tokenGraph: pairsToGraph(pairs),
        from: "uluna",
        to: "foo",
      });

      expect(route).toEqual(null);
    });
  });
});
