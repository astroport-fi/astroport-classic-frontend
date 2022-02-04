import { useAddress, useBalance } from "@arthuryeti/terra";
import { renderHook } from "@testing-library/react-hooks";
import useBalances from "modules/common/hooks/useBalances";
import { useHive } from "modules/common";

jest.mock("@arthuryeti/terra", () => {
  const original = jest.requireActual("@arthuryeti/terra");

  return {
    num: original.num,
    useAddress: jest.fn(),
    useBalance: jest.fn(),
  };
});

jest.mock("modules/common", () => ({
  useTokenInfo: () => ({
    getDecimals: jest.fn(() => 1),
  }),
  useHive: jest.fn(),
}));

afterEach(() => {
  jest.resetAllMocks();
});

describe("useBalances", () => {
  it("returns empty object if wallet is not connected", () => {
    (useAddress as jest.Mock).mockReturnValue("");
    (useHive as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useBalances(["uusd"]));

    expect(result.current).toEqual({});

    expect(useHive).toHaveBeenCalledWith({
      name: ["balances", "", "uusd"],
      query: undefined,
      options: {
        enabled: false,
      },
    });
  });

  describe("wallet is connected", () => {
    beforeAll(() => {
      (useAddress as jest.Mock).mockReturnValue("terra123");
    });

    it("queries for native balances (separately) and all provided contract token balances and returns requested token balances", () => {
      (useBalance as jest.Mock).mockImplementation((token) => {
        return {
          uusd: "1000000",
          uluna: "42000000",
        }[token];
      });

      (useHive as jest.Mock).mockReturnValue({
        // bank: {
        //   balance: [
        //     {
        //       denom: "uusd",
        //       amount: "1000000",
        //     },
        //     {
        //       denom: "ufoo",
        //       amount: "1",
        //     },
        //     {
        //       denom: "uluna",
        //       amount: "42000000",
        //     },
        //   ],
        // },
        terra2: {
          contractQuery: {
            balance: "0",
          },
        },
        terra3: {
          contractQuery: {
            balance: "7000000",
          },
        },
      });

      const { result } = renderHook(() =>
        useBalances(["terra2", "uusd", "terra3", "uluna"])
      );

      expect(result.current).toEqual({
        uusd: 1.0,
        uluna: 42.0,
        terra2: 0,
        terra3: 700000,
      });
    });

    it("still fetches native tokens when only contract tokens are requested", () => {
      (useHive as jest.Mock).mockReturnValue({
        terra2: {
          contractQuery: {
            balance: "420",
          },
        },
      });

      const { result } = renderHook(() => useBalances(["terra2"]));

      expect(result.current).toEqual({
        // getBalance (used for native tokens) is a mock fn and returns undefined,
        // which is returned here as 0
        uusd: 0,
        uluna: 0,
        terra2: 42.0,
      });
    });

    it("returns 0 balance for requested tokens that are not included in response (i.e. 0 balance)", () => {
      (useHive as jest.Mock).mockReturnValue({});
      (useBalance as jest.Mock).mockReturnValue(undefined);

      const { result } = renderHook(() =>
        useBalances(["uusd", "uluna", "ufoo"])
      );

      expect(result.current).toEqual({
        uusd: 0,
        ufoo: 0,
        uluna: 0,
      });
    });
  });
});
