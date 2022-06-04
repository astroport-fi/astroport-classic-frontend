// @ts-nocheck

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { handleDollarTinyAmount, useTokenInfo } from "modules/common";
import { useAstroPools } from "modules/lockdrop";
import MyLockedPools from "components/MyLockedPools";
import rewardsTd from "components/table/RewardsTd";

jest.mock("@terra-money/wallet-provider", () => ({
  useWallet: () => ({
    network: {
      name: "foonet",
    },
  }),
}));

jest.mock("hooks/useEstimateFee", () => jest.fn(() => ({ fee: 0 })));
jest.mock("hooks/useAddress", () => jest.fn(() => "terra123"));

jest.mock("react-query", () => ({
  // Very basic mock that just immediately invokes the query function
  useQuery: (_: any, fn: Function) => ({ data: fn() }),
}));

jest.mock("modules/lockdrop", () => ({
  useAstroPools: jest.fn(),
}));

jest.mock("modules/common", () => {
  const original = jest.requireActual("modules/common");

  return {
    ...original,
    useTokenTooltip: jest.fn(() => []),
    useNotEnoughUSTBalanceToPayFees: jest.fn(() => false),
    handleBigAndTinyAmount: original.handleBigAndTinyAmount,
    handleDollarTinyAmount: original.handleDollarTinyAmount,
    useAstroswap: () => ({
      addNotification: jest.fn(),
    }),
    useTokenInfo: jest.fn(),
    useTx: () => ({
      submit: jest.fn(),
    }),
  };
});

jest.mock("modules/pool", () => {
  const original = jest.requireActual("modules/pool");

  return {
    ...original,
    usePoolFee: jest.fn((poolType) => (poolType === "xyk" ? 30 : 5)),
  };
});

jest.mock("modules/reward", () => {
  const original = jest.requireActual("modules/reward");

  return {
    ClaimLockdropRewardBtn: original.ClaimLockdropRewardBtn,
    useClaimLockdropReward: () => ({
      msgs: [],
    }),
  };
});

jest.mock("components/table/RewardsTd", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockPool = (
  astroLpToken: string,
  assets: string[],
  pairType: string,
  myLiquidityInUst: number,
  totalLiquidityInUst: number,
  rewards: number,
  lockEnd: number
) => ({
  name: astroLpToken,
  astroLpToken: astroLpToken,
  assets,
  pairType,
  totalLiquidty: 0, // Not used on this table
  totalLiquidityInUst,
  myLiquidity: 0, // Not used on this table
  myLiquidityInUst,
  rewards: [
    {
      token: "terraRewardToken",
      amount: rewards,
    },
  ],
  lockEnd,
  duration: 0, // Not used in these tests
  isClaimable: false,
  isClaimed: false,
});

beforeEach(() => {
  // The RewardsTd component is too complex to test here,
  // so we instead mock it with a fixed reward exchange rate of 1.1.
  (rewardsTd as jest.Mock).mockImplementation(
    ({ rewards }: { rewards: { amount: number }[] }) => (
      <div>
        {handleDollarTinyAmount(
          rewards.reduce((total, r) => total + r.amount * 1.1, 0)
        )}
      </div>
    )
  );
});

describe("MyLockedPools", () => {
  describe("when there are pools", () => {
    beforeEach(() => {
      (useAstroPools as jest.Mock).mockReturnValue([
        mockPool(
          "terraLpToken123",
          ["terraToken123", "uusd"],
          "xyk",
          10_000,
          100_000_000,
          42,
          dayjs("2022-09-01T23:00:00.000Z").unix()
        ),
        mockPool(
          "terraLpToken456",
          ["terraToken456", "uusd"],
          "xyk",
          1_000,
          1_000_000,
          100,
          dayjs("2022-01-17T00:00:00.000Z").unix()
        ),
      ]);

      const getSymbol = (token: string) => {
        const tokens: any = {
          uusd: {
            symbol: "USTC",
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

    it("renders all auction pools sorted by Total Liquidity descending by default", () => {
      render(<MyLockedPools />);

      const rows = screen.getAllByRole("row");

      const headers = within(rows[0]).getAllByRole("columnheader");

      expect(within(headers[0]).getByText("Pool Name")).toBeInTheDocument();
      expect(
        within(headers[1]).getByText("Total Liquidity")
      ).toBeInTheDocument();
      expect(within(headers[2]).getByText("My Liquidity")).toBeInTheDocument();
      expect(
        within(headers[3]).getByText("Claimable Rewards")
      ).toBeInTheDocument();
      expect(
        within(headers[4]).getByText("Fully Unlocks On")
      ).toBeInTheDocument();

      const row1 = within(rows[1]).getAllByRole("cell");
      expect(within(row1[0]).getByText("ASTRO - USTC")).toBeInTheDocument();
      expect(within(row1[0]).getByText("(0.30% fee)")).toBeInTheDocument();
      expect(within(row1[1]).getByText("100.00M USTC")).toBeInTheDocument();
      expect(within(row1[2]).getByText("10,000.00 USTC")).toBeInTheDocument();
      expect(within(row1[3]).getByText("46.20 USTC")).toBeInTheDocument();
      expect(within(row1[4]).getByText("Sep/01/22")).toBeInTheDocument();

      const row2 = within(rows[2]).getAllByRole("cell");
      expect(within(row2[0]).getByText("FOO - USTC")).toBeInTheDocument();
      expect(within(row2[0]).getByText("(0.30% fee)")).toBeInTheDocument();
      expect(
        within(row2[1]).getByText("1,000,000.00 USTC")
      ).toBeInTheDocument();
      expect(within(row2[2]).getByText("1,000.00 USTC")).toBeInTheDocument();
      expect(within(row2[3]).getByText("110.00 USTC")).toBeInTheDocument();
      expect(within(row2[4]).getByText("Jan/17/22")).toBeInTheDocument();
    });

    it("sorts by My Liquidity ascending when heading is clicked once and descending when clicked again", async () => {
      render(<MyLockedPools />);

      await userEvent.click(screen.getByText("My Liquidity"));

      let rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("FOO - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("ASTRO - USTC")).toBeInTheDocument();

      await userEvent.click(screen.getByText("My Liquidity"));

      rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("ASTRO - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - USTC")).toBeInTheDocument();
    });

    it("sorts by Total Liquidity ascending when heading is clicked once (it's sorted descending by default on this column)", async () => {
      render(<MyLockedPools />);

      await userEvent.click(screen.getByText("Total Liquidity"));

      const rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("FOO - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("ASTRO - USTC")).toBeInTheDocument();
    });

    it("sorts by unlock date ascending when heading is clicked once and descending when clicked again", async () => {
      render(<MyLockedPools />);

      await userEvent.click(screen.getByText("Fully Unlocks On"));

      let rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("FOO - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("ASTRO - USTC")).toBeInTheDocument();

      await userEvent.click(screen.getByText("Fully Unlocks On"));

      rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("ASTRO - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - USTC")).toBeInTheDocument();
    });
  });

  describe("when there are no pools", () => {
    beforeEach(() => {
      (useAstroPools as jest.Mock).mockReturnValue([]);
    });

    it("renders empty message", () => {
      render(<MyLockedPools />);

      expect(
        screen.getByText("You didn't lock any positions.")
      ).toBeInTheDocument();
    });
  });
});
