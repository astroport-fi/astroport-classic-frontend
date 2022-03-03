import { useAllPairs } from "modules/common";
import { gql, request } from "graphql-request";
import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "react-query";

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
    useHiveEndpoint: jest.fn(() => "https://example.com/hive"),
  };
});

const mockPairResponse = ({
  contract_addr = "terrapair",
  token_addr = "terratoken",
  native_denom = "uusd",
}) => ({
  asset_infos: [
    {
      token: {
        contract_addr: token_addr,
      },
    },
    {
      native_token: {
        denom: native_denom,
      },
    },
  ],
  contract_addr,
  liquidity_token: "terralp",
  pair_type: {
    xyk: {},
  },
});

const query = gql`
  query FetchAllPairs($factory: String!, $startAfter: JSON) {
    wasm {
      contractQuery(
        contractAddress: $factory
        query: { pairs: { limit: 30, start_after: $startAfter } }
      )
    }
  }
`;

const renderUseAllPairs = () => {
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

  return renderHook(() => useAllPairs(), { wrapper });
};

beforeEach(() => {
  request.mockReset();
});

describe("useAllPairs", () => {
  it("fetches all pairs in sequential 30 pair chunks/pages", async () => {
    const terra1 = mockPairResponse({
      contract_addr: "terra1",
      token_addr: "terratoken1",
    });
    const terra2 = mockPairResponse({
      contract_addr: "terra2",
      token_addr: "terratoken2",
    });
    const terra3 = mockPairResponse({
      contract_addr: "terra3",
      token_addr: "terratoken3",
    });
    const terra4 = mockPairResponse({
      contract_addr: "terra4",
      token_addr: "terratoken4",
    });
    const terra5 = mockPairResponse({
      contract_addr: "terra5",
      token_addr: "terratoken5",
    });

    request
      .mockResolvedValueOnce({
        wasm: {
          contractQuery: {
            pairs: [terra1, terra2],
          },
        },
      })
      .mockResolvedValueOnce({
        wasm: {
          contractQuery: {
            pairs: [terra3, terra4],
          },
        },
      })
      .mockResolvedValueOnce({
        wasm: {
          contractQuery: {
            pairs: [terra5],
          },
        },
      })
      .mockResolvedValueOnce({
        wasm: {
          contractQuery: {
            pairs: [],
          },
        },
      });

    const { result, waitFor } = renderUseAllPairs();

    expect(result.current.isLoading).toEqual(true);

    await waitFor(() => !result.current.isLoading);

    expect(result.current.pairs).toEqual([
      terra1,
      terra2,
      terra3,
      terra4,
      terra5,
    ]);

    expect(request.mock.calls).toEqual([
      // First page
      [
        "https://example.com/hive",
        query,
        {
          factory: "terrafactoryaddress",
          startAfter: undefined,
        },
      ],

      // Second page
      [
        "https://example.com/hive",
        query,
        {
          factory: "terrafactoryaddress",
          startAfter: [
            {
              token: {
                contract_addr: "terratoken2",
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

      // Third page
      [
        "https://example.com/hive",
        query,
        {
          factory: "terrafactoryaddress",
          startAfter: [
            {
              token: {
                contract_addr: "terratoken4",
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

      // Fourth and last page
      [
        "https://example.com/hive",
        query,
        {
          factory: "terrafactoryaddress",
          startAfter: [
            {
              token: {
                contract_addr: "terratoken5",
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
    ]);
  });

  it("returns empty array when there are no pairs", async () => {
    request.mockResolvedValueOnce({
      wasm: {
        contractQuery: {
          pairs: [],
        },
      },
    });

    const { result, waitFor } = renderUseAllPairs();

    await waitFor(() => !result.current.isLoading);

    expect(result.current.pairs).toEqual([]);
  });

  it("sets isError to true when there's an error fetching pairs", async () => {
    request.mockRejectedValue();

    const { result, waitFor } = renderUseAllPairs();

    // Wait for data to fail to load
    await waitFor(() => !result.current.isLoading);

    expect(result.current.isError).toEqual(true);
  });
});
