// @ts-nocheck

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { useAuctionPools } from "modules/auction";
import { useTokenInfo } from "modules/common";
import MyAuctionLockedPool from "components/MyAuctionLockedPool";

jest.mock("@terra-money/wallet-provider", () => ({
  useWallet: () => ({
    network: {
      name: "foonet",
    },
  }),
}));

jest.mock("hooks/useAddress", () => jest.fn(() => "terra123"));

jest.mock("modules/auction", () => ({
  useAuctionPools: jest.fn(),
}));

jest.mock("modules/common", () => {
  const original = jest.requireActual("modules/common");

  return {
    useTokenTooltip: jest.fn(() => []),
    useNotEnoughUSTBalanceToPayFees: jest.fn(() => false),
    handleBigAndTinyAmount: original.handleBigAndTinyAmount,
    useTokenInfo: jest.fn(),
  };
});

jest.mock("modules/pool", () => {
  const original = jest.requireActual("modules/pool");

  return {
    ...original,
    usePoolFee: jest.fn((poolType) => (poolType === "xyk" ? 30 : 5)),
  };
});

jest.mock("modules/swap", () => {
  const original = jest.requireActual("modules/swap");

  return {
    ...original,
    usePrice: jest.fn(() => ({
      getPriceInUst: jest.fn(() => 0),
    })),
  };
});

jest.mock("modules/reward", () => ({
  ClaimAuctionRewardBtn: () => <button></button>,
}));

// Stub entire RewardsTd component to render static rewards amount for all pools
jest.mock("components/table/RewardsTd", () => ({
  __esModule: true,
  default: () => <div>42.42 UST</div>,
}));

const mockPool = (
  contract: string,
  astroToken: string,
  totalLiquidityInUst: number,
  myLiquidityInUst: number,
  myUnlockableLiquidityInUst: number,
  lockEnd: number,
  isClaimable: boolean = false
) => ({
  name: contract,
  contract,
  assets: [astroToken, "uusd"],
  pairType: "xyk",
  totalLiquidty: 0, // Not used on this table
  totalLiquidityInUst,
  myLiquidity: 0, // Not used on this table
  myLiquidityInUst,
  myUnlockableLiquidity: 0, // Not used on this table
  myUnlockableLiquidityInUst,
  isClaimable,
  lockEnd,
});

describe("MyAuctionLockedPool", () => {
  describe("when there are pools", () => {
    beforeEach(() => {
      (useAuctionPools as jest.Mock).mockReturnValue([
        mockPool(
          "terraPool123",
          "terraToken123",
          100_000_000,
          10_000,
          0,
          dayjs("2022-09-01T23:00:00.000Z").unix()
        ),
        mockPool(
          "terraPool456",
          "terraToken456",
          1_000_000,
          1_000,
          1_000,
          dayjs("2022-01-17T00:00:00.000Z").unix()
        ),
      ]);

      const getSymbol = (token: string) => {
        const tokens: any = {
          uusd: {
            symbol: "UST",
          },
          terraToken123: {
            symbol: "ASTRO",
          },
          terraToken456: {
            symbol: "FOO",
          },
        };

        return tokens[token]?.symbol;
      };

      (useTokenInfo as jest.Mock).mockReturnValue({
        getSymbol,
        getIcon: () => {},
      });
    });

    it("renders all auction pools", () => {
      render(<MyAuctionLockedPool />);

      const rows = screen.getAllByRole("row");

      const headers = within(rows[0]).getAllByRole("columnheader");
      expect(within(headers[0]).getByText("Pool Name")).toBeInTheDocument();
      expect(
        within(headers[1]).getByText("Total Liquidity")
      ).toBeInTheDocument();
      expect(within(headers[2]).getByText("My Liquidity")).toBeInTheDocument();
      expect(
        within(headers[3]).getByText("Unlockable Liquidity")
      ).toBeInTheDocument();
      expect(
        within(headers[4]).getByText("Claimable Rewards")
      ).toBeInTheDocument();
      expect(
        within(headers[5]).getByText("Fully Unlocks On")
      ).toBeInTheDocument();

      // NOTE: Component sorts by totalUnlockedLiquidity column by default,
      //       which doesn't exist, and it's unclear what react-table's behavior
      //       is in that scenario, but it appears to render the FOO - UST table first.

      const row1 = within(rows[1]).getAllByRole("cell");
      expect(within(row1[0]).getByText("FOO - UST")).toBeInTheDocument();
      expect(within(row1[0]).getByText("(0.30% fee)")).toBeInTheDocument();
      expect(within(row1[1]).getByText("1,000,000.00 UST")).toBeInTheDocument();
      expect(within(row1[2]).getByText("1,000.00 UST")).toBeInTheDocument();
      expect(within(row1[3]).getByText("1,000.00 UST")).toBeInTheDocument();
      expect(within(row1[4]).getByText("42.42 UST")).toBeInTheDocument();
      expect(within(row1[5]).getByText("Jan/17/22")).toBeInTheDocument();

      const row2 = within(rows[2]).getAllByRole("cell");
      expect(within(row2[0]).getByText("ASTRO - UST")).toBeInTheDocument();
      expect(within(row2[0]).getByText("(0.30% fee)")).toBeInTheDocument();
      expect(within(row2[1]).getByText("100.00M UST")).toBeInTheDocument();
      expect(within(row2[2]).getByText("10,000.00 UST")).toBeInTheDocument();
      expect(within(row2[3]).getByText("0.00 UST")).toBeInTheDocument();
      expect(within(row2[4]).getByText("42.42 UST")).toBeInTheDocument();
      expect(within(row2[5]).getByText("Sep/01/22")).toBeInTheDocument();
    });

    it("sorts by Total Liquidity ascending when heading is clicked once and descending when clicked again", async () => {
      render(<MyAuctionLockedPool />);

      await userEvent.click(screen.getByText("Total Liquidity"));

      let rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("FOO - UST")).toBeInTheDocument();
      expect(within(rows[2]).getByText("ASTRO - UST")).toBeInTheDocument();

      await userEvent.click(screen.getByText("Total Liquidity"));

      rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("ASTRO - UST")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - UST")).toBeInTheDocument();
    });

    it("sorts by My Liquidity ascending when heading is clicked once and descending when clicked again", async () => {
      render(<MyAuctionLockedPool />);

      await userEvent.click(screen.getByText("My Liquidity"));

      let rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("FOO - UST")).toBeInTheDocument();
      expect(within(rows[2]).getByText("ASTRO - UST")).toBeInTheDocument();

      await userEvent.click(screen.getByText("My Liquidity"));

      rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("ASTRO - UST")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - UST")).toBeInTheDocument();
    });

    it("sorts by Unlockable Liquidity ascending when heading is clicked once and descending when clicked again", async () => {
      render(<MyAuctionLockedPool />);

      await userEvent.click(screen.getByText("Unlockable Liquidity"));

      let rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("ASTRO - UST")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - UST")).toBeInTheDocument();

      await userEvent.click(screen.getByText("Unlockable Liquidity"));

      rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("FOO - UST")).toBeInTheDocument();
      expect(within(rows[2]).getByText("ASTRO - UST")).toBeInTheDocument();
    });

    it("sorts by unlock date ascending when heading is clicked once and descending when clicked again", async () => {
      render(<MyAuctionLockedPool />);

      await userEvent.click(screen.getByText("Fully Unlocks On"));

      let rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("FOO - UST")).toBeInTheDocument();
      expect(within(rows[2]).getByText("ASTRO - UST")).toBeInTheDocument();

      await userEvent.click(screen.getByText("Fully Unlocks On"));

      rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("ASTRO - UST")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - UST")).toBeInTheDocument();
    });
  });

  describe("when there are no pools", () => {
    beforeEach(() => {
      (useAuctionPools as jest.Mock).mockReturnValue([]);
    });

    it("renders empty message", () => {
      render(<MyAuctionLockedPool />);

      expect(
        screen.getByText("You didn't lock any positions.")
      ).toBeInTheDocument();
    });
  });
});
