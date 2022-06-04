import { useAllTokens } from "modules/common/hooks/useAllTokens";
import { requestInChunks } from "modules/common";
import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";

setLogger({
  error: () => {},
});

jest.mock("graphql-request", () => {
  const original = jest.requireActual("graphql-request");

  return {
    ...original,
    request: jest.fn(),
  };
});

jest.mock("modules/common", () => {
  const original = jest.requireActual("modules/common");

  return {
    ...original,
    useContracts: jest.fn(() => ({ factory: "terrafactoryaddress" })),
    useHiveEndpoint: jest.fn(() => ({
      hiveEndpoint: "https://example.com/hive",
      defaultHiveEndpoint: "https://example.com/hive",
    })),
    requestInChunks: jest.fn(),
  };
});

jest.mock("constants/tokenCache", () => ({
  __esModule: true,
  default: {
    foonet: {
      terratoken1: {
        protocol: "Foo",
        symbol: "FOO",
        token: "terratoken1",
        decimals: 6,
      },
      terratoken4: {
        protocol: "Bar",
        symbol: "BAR",
        token: "terratoken4",
        decimals: 8,
        icon: "http://example.com/bar.png",
      },
      uusd: {
        protocol: "Terra USD",
        symbol: "USTC",
        token: "uusd",
        icon: "http://example.com/uusd.png",
      },
    },
  },
}));

jest.mock("hooks/useAddress", () => jest.fn(() => ""));

jest.mock("context/TerraWebappContext", () => ({
  useTerraWebapp: jest.fn(() => ({
    network: {
      name: "foonet",
    },
  })),
}));

const renderUseAllTokens = (pools) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return renderHook(() => useAllTokens({ pools }), { wrapper });
};

const stubPool = {
  assets: [
    {
      token: {
        contract_addr: "terratoken",
      },
    },
    {
      native_token: {
        denom: "uusd",
      },
    },
  ],
  lp_address: "terralp",
  pool_address: "terrapool",
  pool_type: "xyk",
};

beforeEach(() => {
  requestInChunks.mockReset();
});

describe("useAllTokens", () => {
  it("fetches token info for all uncached contract tokens", async () => {
    const pools = [
      {
        ...stubPool,
        assets: [
          {
            token: {
              contract_addr: "terratoken1", // Cached
            },
          },
          {
            token: {
              contract_addr: "terratoken2",
            },
          },
        ],
      },
      {
        ...stubPool,
        assets: [
          {
            token: {
              contract_addr: "terratoken2",
            },
          },
          {
            native_token: {
              denom: "uusd", // Cached
            },
          },
        ],
      },
      {
        ...stubPool,
        assets: [
          {
            token: {
              contract_addr: "terratoken3",
            },
          },
          {
            token: {
              contract_addr: "terratoken4", // Cached
            },
          },
        ],
      },
      {
        ...stubPool,
        assets: [
          {
            native_token: {
              denom: "uluna", // NOTE: Not cached
            },
          },
          {
            token: {
              contract_addr: "terratoken5",
            },
          },
        ],
      },
    ];

    requestInChunks.mockResolvedValue({
      terratoken2: {
        contractQuery: {
          name: "Foo 2",
          symbol: "FOO2",
          decimals: 6,
        },
      },
      terratoken3: {
        contractQuery: {
          name: "Foo 3",
          symbol: "FOO3",
          decimals: 8,
        },
      },
      terratoken5: {
        contractQuery: {
          name: "Foo 5",
          symbol: "FOO5",
          decimals: 5,
        },
      },
    });

    const { result, waitFor } = renderUseAllTokens(pools);

    expect(result.current.isLoading).toEqual(true);

    await waitFor(() => !result.current.isLoading);

    expect(result.current.tokens).toEqual({
      // Cached tokens
      terratoken1: {
        protocol: "Foo",
        symbol: "FOO",
        token: "terratoken1",
        decimals: 6,
      },
      terratoken4: {
        protocol: "Bar",
        symbol: "BAR",
        token: "terratoken4",
        decimals: 8,
        icon: "http://example.com/bar.png",
      },
      uusd: {
        protocol: "Terra USD",
        symbol: "USTC",
        token: "uusd",
        icon: "http://example.com/uusd.png",
      },

      // Fetched tokens
      terratoken2: {
        protocol: "Foo 2",
        symbol: "FOO2",
        decimals: 6,
        token: "terratoken2",
      },
      terratoken3: {
        protocol: "Foo 3",
        symbol: "FOO3",
        decimals: 8,
        token: "terratoken3",
      },
      terratoken5: {
        protocol: "Foo 5",
        symbol: "FOO5",
        decimals: 5,
        token: "terratoken5",
      },
    });

    expect(requestInChunks).toHaveBeenCalledWith(
      100,
      "https://example.com/hive",
      ["terratoken2", "terratoken3", "terratoken5"],
      expect.any(Function)
    );
  });

  it("does not fetch while pools are null", () => {
    const { result } = renderUseAllTokens(null);

    // Disabled while pools are loading, so is not loading
    expect(result.current.isLoading).toEqual(false);

    expect(requestInChunks).not.toHaveBeenCalled();
  });

  it("does not fetch if pools are empty", () => {
    const { result } = renderUseAllTokens([]);

    // Disabled while pools are empty, so is not loading
    expect(result.current.isLoading).toEqual(false);

    expect(requestInChunks).not.toHaveBeenCalled();
  });

  it("does not fetch when all tokens are cached", async () => {
    const pools = [
      {
        ...stubPool,
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
    ];

    const { result, waitFor } = renderUseAllTokens(pools);

    expect(result.current.isLoading).toEqual(true);

    await waitFor(() => !result.current.isLoading);

    expect(result.current.tokens).toEqual({
      terratoken1: {
        protocol: "Foo",
        symbol: "FOO",
        token: "terratoken1",
        decimals: 6,
      },
      terratoken4: {
        protocol: "Bar",
        symbol: "BAR",
        token: "terratoken4",
        decimals: 8,
        icon: "http://example.com/bar.png",
      },
      uusd: {
        protocol: "Terra USD",
        symbol: "USTC",
        token: "uusd",
        icon: "http://example.com/uusd.png",
      },
    });
  });

  it("sets isError to true when there's an error fetching tokens", async () => {
    requestInChunks.mockRejectedValue();

    const { result, waitFor } = renderUseAllTokens([stubPool]);

    // Wait for data to fail to load. Added more time sinse have 1 retry now
    await waitFor(() => !result.current.isLoading, { timeout: 2000 });

    expect(result.current.isError).toEqual(true);
  });
});
