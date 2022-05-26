import { render, screen, within } from "@testing-library/react";
import MyPools from "components/pool/MyPools";
import { useAllPools } from "modules/pool";
import { useTokenInfo } from "modules/common";
import userEvent from "@testing-library/user-event";

jest.mock("@terra-money/wallet-provider", () => ({
  useWallet: () => ({
    network: {
      name: "foonet",
    },
  }),
}));

jest.mock("@arthuryeti/terra", () => {
  const original = jest.requireActual("@arthuryeti/terra");

  return {
    ...original,
    useAddress: jest.fn(() => "terra123"),
    useBalance: jest.fn(() => 0),
  };
});

jest.mock("modules/common", () => {
  const original = jest.requireActual("modules/common");

  return {
    ...original,
    useTokenTooltip: jest.fn(() => []),
    useTokenInfo: jest.fn(),
  };
});

jest.mock("modules/pool", () => {
  const original = jest.requireActual("modules/pool");

  return {
    ...original,
    useAllPools: jest.fn(),
    usePoolFee: jest.fn((poolType) => (poolType === "xyk" ? 30 : 5)),
  };
});

const mockPool = (
  contract,
  assets,
  apr,
  myLiquidityInUst,
  totalLiquidityInUst,
  pairType,
  myPool = true
) => ({
  inUse: myPool,
  contract,
  assets,
  rewards: { total: apr },
  myLiquidityInUst,
  totalLiquidityInUst,
  pairType,
});

describe("MyPools", () => {
  describe("when there are pools", () => {
    beforeEach(() => {
      const getSymbol = (token) => {
        const tokens = {
          uusd: {
            symbol: "UST",
          },
          uluna: {
            symbol: "LUNA",
          },
          terratoken123: {
            symbol: "FOO",
          },
          terratoken456: {
            symbol: "BAR",
          },
        };

        return tokens[token]?.symbol;
      };

      (useTokenInfo as jest.Mock).mockReturnValue({
        getSymbol,
        getIcon: () => {},
      });

      (useAllPools as jest.Mock).mockReturnValue([
        mockPool(
          "terra123",
          ["uusd", "uluna"],
          0.42,
          100_000,
          200_000_000,
          "xyk"
        ),
        mockPool(
          "terra456",
          ["terratoken123", "uusd"],
          0.5,
          1_000,
          1_000_000,
          "xyk"
        ),
        mockPool(
          "terra789",
          ["uluna", "terratoken123"],
          0.123,
          42,
          100_000_000,
          "stable"
        ),

        // Pool user is not participating in
        mockPool(
          "terra890",
          ["terratoken123", "terratoken456"],
          0,
          0,
          0,
          "xyk",
          false
        ),
      ]);
    });

    it("renders table with all pools sorted by default by pool liquidity descending", () => {
      render(<MyPools />);

      const rows = screen.getAllByRole("row");

      const headers = within(rows[0]).getAllByRole("columnheader");
      expect(within(headers[1]).getByText("Pool Name")).toBeInTheDocument();
      expect(within(headers[2]).getByText("Combined APR")).toBeInTheDocument();
      expect(
        within(headers[3]).getByText("Total Liquidity")
      ).toBeInTheDocument();
      expect(within(headers[4]).getByText("24h Volume")).toBeInTheDocument();
      expect(within(headers[5]).getByText("My Liquidity")).toBeInTheDocument();

      const row1 = within(rows[1]).getAllByRole("cell");
      expect(within(row1[1]).getByText("LUNA - UST")).toBeInTheDocument();
      expect(within(row1[1]).getByText("(0.30% fee)")).toBeInTheDocument();
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        row1[2].querySelector('p[aria-haspopup="dialog"]').innerHTML
      ).toEqual("42.00%");
      expect(within(row1[3]).getByText("200.00M UST")).toBeInTheDocument();
      expect(within(row1[5]).getByText("100,000.00 UST")).toBeInTheDocument();

      const row2 = within(rows[2]).getAllByRole("cell");
      expect(within(row2[1]).getByText("FOO - UST")).toBeInTheDocument();
      expect(within(row2[1]).getByText("(0.30% fee)")).toBeInTheDocument();
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        row2[2].querySelector('p[aria-haspopup="dialog"]').innerHTML
      ).toEqual("50.00%");
      expect(within(row2[3]).getByText("1,000,000.00 UST")).toBeInTheDocument();
      expect(within(row2[5]).getByText("1,000.00 UST")).toBeInTheDocument();

      const row3 = within(rows[3]).getAllByRole("cell");
      expect(within(row3[1]).getByText("FOO - LUNA")).toBeInTheDocument();
      expect(within(row3[1]).getByText("(0.05% fee)")).toBeInTheDocument();
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        row3[2].querySelector('p[aria-haspopup="dialog"]').innerHTML
      ).toEqual("12.30%");
      expect(within(row3[3]).getByText("100.00M UST")).toBeInTheDocument();
      expect(within(row3[5]).getByText("42.00 UST")).toBeInTheDocument();

      // Pools user is not participating in should not be displayed
      expect(screen.queryByText("BAR")).not.toBeInTheDocument();
    });

    it("sorts by total liquidity ascending when heading is clicked once (it's sorted descending by default)", async () => {
      render(<MyPools />);

      await userEvent.click(screen.getByText("Total Liquidity"));

      const rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("FOO - UST")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - LUNA")).toBeInTheDocument();
      expect(within(rows[3]).getByText("LUNA - UST")).toBeInTheDocument();
    });

    it("sorts by APR ascending when heading is clicked once", async () => {
      render(<MyPools />);

      await userEvent.click(screen.getByText("Combined APR"));

      const rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("FOO - LUNA")).toBeInTheDocument();
      expect(within(rows[2]).getByText("LUNA - UST")).toBeInTheDocument();
      expect(within(rows[3]).getByText("FOO - UST")).toBeInTheDocument();
    });

    it("sorts by APR descending when heading is clicked twice", async () => {
      render(<MyPools />);

      await userEvent.click(screen.getByText("Combined APR"));
      await userEvent.click(screen.getByText("Combined APR"));

      const rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("FOO - UST")).toBeInTheDocument();
      expect(within(rows[2]).getByText("LUNA - UST")).toBeInTheDocument();
      expect(within(rows[3]).getByText("FOO - LUNA")).toBeInTheDocument();
    });

    it("sorts by My Liquidity ascending when heading is clicked once", async () => {
      render(<MyPools />);

      await userEvent.click(screen.getByText("My Liquidity"));

      const rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("FOO - LUNA")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - UST")).toBeInTheDocument();
      expect(within(rows[3]).getByText("LUNA - UST")).toBeInTheDocument();
    });

    it("sorts by My Liquidity descending when heading is clicked twice", async () => {
      render(<MyPools />);

      await userEvent.click(screen.getByText("My Liquidity"));
      await userEvent.click(screen.getByText("My Liquidity"));

      const rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("LUNA - UST")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - UST")).toBeInTheDocument();
      expect(within(rows[3]).getByText("FOO - LUNA")).toBeInTheDocument();
    });

    it("removes sort when My Liquidity heading is clicked thrice", async () => {
      render(<MyPools />);

      await userEvent.click(screen.getByText("My Liquidity"));
      await userEvent.click(screen.getByText("My Liquidity"));
      await userEvent.click(screen.getByText("My Liquidity"));

      const rows = screen.getAllByRole("row");
      // This is the order the pools are returned from useMyPools
      expect(within(rows[1]).getByText("LUNA - UST")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - UST")).toBeInTheDocument();
      expect(within(rows[3]).getByText("FOO - LUNA")).toBeInTheDocument();
    });
  });

  describe("when there are no pools that the user is participating in", () => {
    beforeEach(() => {
      (useAllPools as jest.Mock).mockReturnValue([
        mockPool(
          "terra890",
          ["terratoken123", "terratoken456"],
          0,
          0,
          0,
          "xyk",
          false
        ),
      ]);
    });

    it("renders table with empty message", () => {
      render(<MyPools />);

      expect(
        screen.getByText("You need to add liquidity first.")
      ).toBeInTheDocument();
    });
  });
});
