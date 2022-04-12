import { poolsToGraph, getSwapRoute } from "modules/common";

const buildPool = (
  pool_address = "terrapool1",
  assets = ["uluna", "uust"],
  pool_type = "xyk",
  lp_address = "terralp1"
) => {
  const buildAssets = assets.map((asset) => {
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
    lp_address,
    pool_address,
    pool_type,
    assets: buildAssets,
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
  const terrapool1 = buildPool("terrapool1", ["uusd", "uluna"]);
  const terrapool2 = buildPool("terrapool2", ["uusd", "terratoken1"]);
  const terrapool3 = buildPool("terrapool3", ["uusd", "terratoken2"]);
  const terrapool4 = buildPool("terrapool4", ["terratoken2", "terratoken3"]);
  const terrapool5 = buildPool(
    "terrapool5",
    ["terratoken3", "terratoken4"],
    "stable"
  );
  const terrapool6 = buildPool("terrapool6", ["terratoken3", "terratoken5"]);
  const terrapool7 = buildPool("terrapool7", ["terratoken4", "uluna"]);
  const terrapool8 = buildPool("terrapool8", ["terratoken4", "terratoken2"]);
  const terrapool9 = buildPool("terrapool9", ["terratoken1", "terratoken2"]);

  let pools;

  beforeEach(() => {
    // Shuffle pools to add some entropy to our tests and ensure we're never reliant on pool order
    pools = shuffle([
      terrapool1,
      terrapool2,
      terrapool3,
      terrapool4,
      terrapool5,
      terrapool6,
      terrapool7,
      terrapool8,
      terrapool9,
    ]);
  });

  describe("poolsToGraph", () => {
    it("returns adjacency list of all tokens in all pools and the tokens they can swap to", () => {
      const graph = poolsToGraph(pools);

      expect(graph).toEqual({
        uusd: new Set([
          { pool: terrapool1, token: "uluna" },
          { pool: terrapool2, token: "terratoken1" },
          { pool: terrapool3, token: "terratoken2" },
        ]),
        uluna: new Set([
          { pool: terrapool1, token: "uusd" },
          { pool: terrapool7, token: "terratoken4" },
        ]),
        terratoken1: new Set([
          { pool: terrapool2, token: "uusd" },
          { pool: terrapool9, token: "terratoken2" },
        ]),
        terratoken2: new Set([
          { pool: terrapool3, token: "uusd" },
          { pool: terrapool4, token: "terratoken3" },
          { pool: terrapool8, token: "terratoken4" },
          { pool: terrapool9, token: "terratoken1" },
        ]),
        terratoken3: new Set([
          { pool: terrapool4, token: "terratoken2" },
          { pool: terrapool5, token: "terratoken4" },
          { pool: terrapool6, token: "terratoken5" },
        ]),
        terratoken4: new Set([
          { pool: terrapool5, token: "terratoken3" },
          { pool: terrapool7, token: "uluna" },
          { pool: terrapool8, token: "terratoken2" },
        ]),
        terratoken5: new Set([{ pool: terrapool6, token: "terratoken3" }]),
      });
    });
  });

  describe("getSwapRoute", () => {
    it("returns single hop route between native tokens (uluna/uusd)", () => {
      const route = getSwapRoute({
        tokenGraph: poolsToGraph(pools),
        from: "uluna",
        to: "uusd",
      });

      expect(route).toEqual([
        {
          contract_addr: "terrapool1",
          from: "uluna",
          to: "uusd",
          type: "xyk",
        },
      ]);
    });

    it("returns route from/to in requested order (uusd/uluna and not uluna/uusd) for single hop route", () => {
      const route = getSwapRoute({
        tokenGraph: poolsToGraph(pools),
        from: "uusd",
        to: "uluna",
      });

      expect(route).toEqual([
        {
          contract_addr: "terrapool1",
          from: "uusd",
          to: "uluna",
          type: "xyk",
        },
      ]);
    });

    it("returns single hop route with mixed native and contract tokens", () => {
      const route = getSwapRoute({
        tokenGraph: poolsToGraph(pools),
        from: "terratoken1",
        to: "uusd",
      });

      expect(route).toEqual([
        {
          contract_addr: "terrapool2",
          from: "terratoken1",
          to: "uusd",
          type: "xyk",
        },
      ]);
    });

    it("returns single hop route with contract tokens", () => {
      const route = getSwapRoute({
        tokenGraph: poolsToGraph(pools),
        from: "terratoken2",
        to: "terratoken3",
      });

      expect(route).toEqual([
        {
          contract_addr: "terrapool4",
          from: "terratoken2",
          to: "terratoken3",
          type: "xyk",
        },
      ]);
    });

    it("returns shortest multi-hop route when there are multiple possible routes", () => {
      const route = getSwapRoute({
        tokenGraph: poolsToGraph(pools),
        from: "uluna",
        to: "terratoken5",
      });

      // This is the shortest route, but longer routes are:
      //  uluna -> uusd -> terratoken2 -> terratoken3 -> terratoken5
      //  uluna -> uusd -> terratoken2 -> terratoken4 -> terratoken3 -> terratoken5
      //  uluna -> uusd -> terratoken1 -> terratoken2 -> terratoken3 -> terratoken5
      //  uluna -> uusd -> terratoken1 -> terratoken2 -> terratoken4 -> terratoken3 -> terratoken5

      expect(route).toEqual([
        {
          contract_addr: "terrapool7",
          from: "uluna",
          to: "terratoken4",
          type: "xyk",
        },
        {
          contract_addr: "terrapool5",
          from: "terratoken4",
          to: "terratoken3",
          type: "stable",
        },
        {
          contract_addr: "terrapool6",
          from: "terratoken3",
          to: "terratoken5",
          type: "xyk",
        },
      ]);
    });

    it("returns only route when there is only one possible route", () => {
      const route = getSwapRoute({
        tokenGraph: poolsToGraph(pools),
        from: "terratoken1",
        to: "uluna",
      });

      expect(route).toEqual([
        {
          contract_addr: "terrapool2",
          from: "terratoken1",
          to: "uusd",
          type: "xyk",
        },
        {
          contract_addr: "terrapool1",
          from: "uusd",
          to: "uluna",
          type: "xyk",
        },
      ]);
    });

    it("returns empty array when pairs are null", () => {
      const route = getSwapRoute({
        tokenGraph: null,
        from: "uusd",
        to: "uluna",
      });

      expect(route).toEqual([]);
    });

    it("returns empty array when from token is null", () => {
      const route = getSwapRoute({
        tokenGraph: poolsToGraph(pools),
        from: null,
        to: "uluna",
      });

      expect(route).toEqual([]);
    });

    it("returns empty array when to token is null", () => {
      const route = getSwapRoute({
        tokenGraph: poolsToGraph(pools),
        from: "uusd",
        to: null,
      });

      expect(route).toEqual([]);
    });

    it("returns empty array when from and to token are the same", () => {
      const route = getSwapRoute({
        tokenGraph: poolsToGraph(pools),
        from: "uluna",
        to: "uluna",
      });

      expect(route).toEqual([]);
    });

    it("returns empty array when from token is not in graph", () => {
      const route = getSwapRoute({
        tokenGraph: poolsToGraph(pools),
        from: "foo",
        to: "uluna",
      });

      expect(route).toEqual([]);
    });

    it("returns empty array when to token is not in graph", () => {
      const route = getSwapRoute({
        tokenGraph: poolsToGraph(pools),
        from: "uluna",
        to: "foo",
      });

      expect(route).toEqual([]);
    });

    it("returns empty array when a route does not exist", () => {
      const route = getSwapRoute({
        tokenGraph: poolsToGraph([terrapool1, terrapool9]),
        from: "uluna",
        to: "terratoken2",
      });

      expect(route).toEqual([]);
    });
  });
});
