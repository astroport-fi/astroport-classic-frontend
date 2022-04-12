import { useTokenInfo } from "modules/common";
import { useAstroswap } from "modules/common/context";
import { renderHook } from "@testing-library/react-hooks";

jest.mock("modules/common/context", () => ({
  useAstroswap: jest.fn(),
}));

beforeEach(() => {
  useAstroswap.mockReset();
  useAstroswap.mockImplementation(() => ({}));
});

describe("useTokenInfo", () => {
  describe("getProtocol", () => {
    it("returns protocol for token from tokens state", () => {
      useAstroswap.mockReturnValue({
        tokens: {
          terratoken1: {
            protocol: "Foo Protocol",
          },
        },
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.getProtocol("terratoken1")).toEqual("Foo Protocol");
    });

    it("returns token address if tokens state is nullish", () => {
      const { result } = renderHook(useTokenInfo);

      expect(result.current.getProtocol("terratoken1")).toEqual("terratoken1");
    });

    it("returns truncated token address if protocol is not present on token", () => {
      useAstroswap.mockReturnValue({
        tokens: {
          terratoken1: {
            symbol: "FOO",
          },
        },
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.getProtocol("terratoken1")).toEqual("ter...en1");
    });

    it("returns truncated token address if token is not in state", () => {
      useAstroswap.mockReturnValue({
        tokens: {},
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.getProtocol("terratoken1")).toEqual("ter...en1");
    });
  });

  describe("getSymbol", () => {
    it("returns symbol for token from tokens state", () => {
      useAstroswap.mockReturnValue({
        tokens: {
          terratoken1: {
            symbol: "FOO",
          },
        },
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.getSymbol("terratoken1")).toEqual("FOO");
    });

    it("returns token address if tokens state is nullish", () => {
      const { result } = renderHook(useTokenInfo);

      expect(result.current.getSymbol("terratoken1")).toEqual("terratoken1");
    });

    it("returns truncated token address if symbol is not present on token", () => {
      useAstroswap.mockReturnValue({
        tokens: {
          terratoken1: {
            protocol: "Foo Protocol",
          },
        },
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.getSymbol("terratoken1")).toEqual("ter...en1");
    });

    it("returns truncated token address if token is not in state", () => {
      useAstroswap.mockReturnValue({
        tokens: {},
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.getSymbol("terratoken1")).toEqual("ter...en1");
    });
  });

  describe("getDecimals", () => {
    it("returns decimals for token from tokens state", () => {
      useAstroswap.mockReturnValue({
        tokens: {
          terratoken1: {
            decimals: 7,
          },
        },
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.getDecimals("terratoken1")).toEqual(7);
    });

    it("returns 6 if tokens state is nullish", () => {
      const { result } = renderHook(useTokenInfo);

      expect(result.current.getDecimals("terratoken1")).toEqual(6);
    });

    it("returns 6 if decimals are not present on token", () => {
      useAstroswap.mockReturnValue({
        tokens: {
          uusd: {
            protocol: "Terra USD",
          },
        },
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.getDecimals("uusd")).toEqual(6);
    });

    it("returns 6 if token is not in state", () => {
      useAstroswap.mockReturnValue({
        tokens: {},
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.getDecimals("uusd")).toEqual(6);
    });
  });

  describe("getIcon", () => {
    it("returns icon for token from tokens state", () => {
      useAstroswap.mockReturnValue({
        tokens: {
          terratoken1: {
            icon: "http://example.com/terratoken1.png",
          },
        },
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.getIcon("terratoken1")).toEqual(
        "http://example.com/terratoken1.png"
      );
    });

    it("returns an empty string if tokens state is nullish", () => {
      const { result } = renderHook(useTokenInfo);

      expect(result.current.getIcon("terratoken1")).toEqual("");
    });

    it("returns default icon path if icon are not present on token", () => {
      useAstroswap.mockReturnValue({
        tokens: {
          uusd: {
            protocol: "Terra USD",
          },
        },
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.getIcon("uusd")).toEqual("/tokens/default.png");
    });

    it("returns default icon path if token is not in state", () => {
      useAstroswap.mockReturnValue({
        tokens: {},
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.getIcon("uusd")).toEqual("/tokens/default.png");
    });
  });

  describe("isHidden", () => {
    it("returns false if token is the first asset of any pool", () => {
      useAstroswap.mockReturnValue({
        tokens: {},
        pools: [
          {
            assets: [
              {
                token: {
                  contract_addr: "terratoken1",
                },
              },
              {
                native_token: {
                  denom: "uusd",
                },
              },
            ],
          },
        ],
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.isHidden("terratoken1")).toEqual(false);
    });

    it("returns false if token is the second asset of any pool", () => {
      useAstroswap.mockReturnValue({
        tokens: {},
        pools: [
          {
            assets: [
              {
                token: {
                  contract_addr: "terratoken1",
                },
              },
              {
                token: {
                  contract_addr: "terratoken2",
                },
              },
            ],
          },
        ],
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.isHidden("terratoken2")).toEqual(false);
    });

    it("returns true if tokens state is nullish", () => {
      useAstroswap.mockReturnValue({
        pools: [],
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.isHidden("terratoken1")).toEqual(true);
    });

    it("returns true if pools state is nullish", () => {
      useAstroswap.mockReturnValue({
        tokens: {},
      });

      const { result } = renderHook(useTokenInfo);

      expect(result.current.isHidden("terratoken1")).toEqual(true);
    });

    it("returns true if token and pools state are both nullish", () => {
      const { result } = renderHook(useTokenInfo);

      expect(result.current.isHidden("terratoken1")).toEqual(true);
    });
  });
});
