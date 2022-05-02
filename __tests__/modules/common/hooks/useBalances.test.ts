import { renderHook } from "@testing-library/react-hooks";
// eslint-disable-next-line import/no-named-as-default
import useBalances from "modules/common/hooks/useBalances";
import { useBalance, useHive } from "modules/common";
import useAddress from "hooks/useAddress";

jest.mock("hooks/useAddress", () => jest.fn());

jest.mock("modules/common", () => ({
  useBalance: jest.fn(),
  useTokenInfo: () => ({
    getDecimals: jest.fn(() => 1),
  }),
  isNativeToken: jest.fn(),
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
  });

  describe("wallet is connected", () => {
    beforeAll(() => {
      (useAddress as jest.Mock).mockReturnValue("terra123");
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
