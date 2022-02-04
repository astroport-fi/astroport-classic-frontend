import { useAddress } from "@arthuryeti/terra";
import { renderHook } from "@testing-library/react-hooks";
import useBalances from "modules/common/hooks/useBalances";
import { useHive } from "modules/common";
import { gql } from "graphql-request";

jest.mock("@arthuryeti/terra", () => ({
  useAddress: jest.fn(),
}));

jest.mock("modules/common", () => ({
  useHive: jest.fn(),
}));

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

    it("queries for native balances and all provided contract token balances and returns requested token balances", () => {
      (useHive as jest.Mock).mockReturnValue({
        bank: {
          balance: [
            {
              denom: "uusd",
              amount: "1000000",
            },
            {
              denom: "ufoo",
              amount: "1",
            },
            {
              denom: "uluna",
              amount: "42000000",
            },
          ],
        },
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
        uusd: "1000000",
        uluna: "42000000",
        terra2: "0",
        terra3: "7000000",
      });

      expect(useHive).toHaveBeenCalledWith({
        name: ["balances", "terra123", "terra2", "uusd", "terra3", "uluna"],
        // NOTE: Indenting unfortunately matters here
        // prettier-ignore
        query: gql`
    {
      bank {
        balance(address: "terra123") {
          denom, amount
        }
      }
      
        terra2: wasm {
          contractQuery(
            contractAddress: \"terra2\",
            query: {
              balance: {
                address: \"terra123\"
              }
            }
          )
        }
      
        terra3: wasm {
          contractQuery(
            contractAddress: \"terra3\",
            query: {
              balance: {
                address: \"terra123\"
              }
            }
          )
        }
      
    }
  `,
        options: {
          enabled: true,
        },
      });
    });

    it("queries for just native balances when no contract token addresses are included and returns their balances", () => {
      (useHive as jest.Mock).mockReturnValue({
        bank: {
          balance: [
            {
              denom: "uusd",
              amount: "1000000",
            },
            {
              denom: "ufoo",
              amount: "1",
            },
            {
              denom: "uluna",
              amount: "42000000",
            },
          ],
        },
      });

      const { result } = renderHook(() => useBalances(["uusd", "ufoo"]));

      expect(result.current).toEqual({
        uusd: "1000000",
        ufoo: "1",
      });

      expect(useHive).toHaveBeenCalledWith({
        name: ["balances", "terra123", "uusd", "ufoo"],
        // NOTE: Indenting unfortunately matters here
        // prettier-ignore
        query: gql`
    {
      bank {
        balance(address: "terra123") {
          denom, amount
        }
      }
      
    }
  `,
        options: {
          enabled: true,
        },
      });
    });

    it("returns just contract tokens if only contract tokens are requested", () => {
      (useHive as jest.Mock).mockReturnValue({
        terra2: {
          contractQuery: {
            balance: "42",
          },
        },
      });

      const { result } = renderHook(() => useBalances(["terra2"]));

      expect(result.current).toEqual({
        terra2: "42",
      });
    });

    it("returns 0 balance for requested tokens that are not included in response (i.e. 0 balance)", () => {
      (useHive as jest.Mock).mockReturnValue({
        bank: {
          balance: [
            {
              denom: "uusd",
              amount: "1000000",
            },
          ],
        },
      });

      const { result } = renderHook(() =>
        useBalances(["uusd", "uluna", "ufoo"])
      );

      expect(result.current).toEqual({
        uusd: "1000000",
        ufoo: "0",
        uluna: "0",
      });
    });
  });
});
