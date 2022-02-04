import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

jest.mock("@arthuryeti/terra", () => {
  const original = jest.requireActual("@arthuryeti/terra");

  return {
    num: original.num,
    useTx: () => ({
      submit: jest.fn(),
    }),
    useEstimateFee: () => ({
      fee: 0,
    }),
    useAddress: jest.fn(() => "terra123"),
  };
});

jest.mock("react-query", () => ({
  // Very basic mock that just immediately invokes the query function
  useQuery: (_, fn) => ({ data: fn() })
}));

jest.mock("modules/lockdrop", () => ({
  useAstroPools: jest.fn(),
}));

jest.mock("modules/common", () => {
  const original = jest.requireActual("modules/common");

  return {
    handleBigAndTinyAmount: original.handleBigAndTinyAmount,
    handleDollarTinyAmount: original.handleDollarTinyAmount,
    useAstroswap: () => ({
      addNotification: jest.fn(),
    }),
    useTokenInfo: jest.fn()
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
      msgs: []
    }),
  };
});

jest.mock("components/table/RewardsTd", () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockPool = (
  astroLpToken,
  assets,
  pairType,
  myLiquidityInUst,
  totalLiquidityInUst,
  rewards,
  lockEnd
) => ({
  name: astroLpToken,
  astroLpToken: astroLpToken,
  assets,
  pairType,
  totalLiquidty: 0, // Not used on this table
  totalLiquidityInUst,
  myLiquidity: 0, // Not used on this table
  myLiquidityInUst,
  rewards: [{
    token: "terraRewardToken",
    amount: rewards
  }],
  lockEnd,
  duration: 0, // Not used in these tests
  isClaimable: false,
  isClaimed: false
});

beforeEach(() => {
  // The RewardsTd component is too complex to test here,
  // so we instead mock it with a fixed reward exchange rate of 1.1.
  (rewardsTd as jest.Mock).mockImplementation(
    ({ rewards }) => (
      <div>{handleDollarTinyAmount(rewards.reduce((total, r) => total + r.amount * 1.1, 0))}</div>
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
          new Date(2022, 8, 1).getTime() / 1000
        ),
        mockPool(
          "terraLpToken456",
          ["terraToken456", "uusd"],
          "xyk",
          1_000,
          1_000_000,
          100,
          new Date(2022, 0, 17).getTime() / 1000
        ),
      ]);

      const getSymbol = (token) => {
        const tokens = {
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

    it("renders all auction pools sorted by Total Liquidity descending by default", () => {
      render(<MyLockedPools />);

      const rows = screen.getAllByRole("row");

      const headers = within(rows[0]).getAllByRole("columnheader");

      expect(within(headers[0]).getByText("Pool Name")).toBeInTheDocument();
      expect(within(headers[1]).getByText("My Liquidity")).toBeInTheDocument();
      expect(
        within(headers[2]).getByText("Total Liquidity")
      ).toBeInTheDocument();
      expect(
        within(headers[3]).getByText("Claimable Rewards")
      ).toBeInTheDocument();
      expect(
        within(headers[4]).getByText("Fully Unlocks On")
      ).toBeInTheDocument();

      const row1 = within(rows[1]).getAllByRole("cell");
      expect(within(row1[0]).getByText("ASTRO - UST")).toBeInTheDocument();
      expect(within(row1[0]).getByText("(0.30% fee)")).toBeInTheDocument();
      expect(within(row1[1]).getByText("$ 10,000.00")).toBeInTheDocument();
      expect(within(row1[2]).getByText("$ 100.00M")).toBeInTheDocument();
      expect(within(row1[3]).getByText("$ 46.20")).toBeInTheDocument();
      expect(within(row1[4]).getByText("Sep/01/22")).toBeInTheDocument();

      const row2 = within(rows[2]).getAllByRole("cell");
      expect(within(row2[0]).getByText("FOO - UST")).toBeInTheDocument();
      expect(within(row2[0]).getByText("(0.30% fee)")).toBeInTheDocument();
      expect(within(row2[1]).getByText("$ 1,000.00")).toBeInTheDocument();
      expect(within(row2[2]).getByText("$ 1,000,000")).toBeInTheDocument();
      expect(within(row2[3]).getByText("$ 110.00")).toBeInTheDocument();
      expect(within(row2[4]).getByText("Jan/17/22")).toBeInTheDocument();
    });

    it("sorts by My Liquidity ascending when heading is clicked once and descending when clicked again", async () => {
      render(<MyLockedPools />);

      await userEvent.click(screen.getByText("My Liquidity"));

      let rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("FOO - UST")).toBeInTheDocument();
      expect(within(rows[2]).getByText("ASTRO - UST")).toBeInTheDocument();

      await userEvent.click(screen.getByText("My Liquidity"));

      rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("ASTRO - UST")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - UST")).toBeInTheDocument();
    });

    it("sorts by Total Liquidity ascending when heading is clicked once (it's sorted descending by default on this column)", async () => {
      render(<MyLockedPools />);

      await userEvent.click(screen.getByText("Total Liquidity"));

      const rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("FOO - UST")).toBeInTheDocument();
      expect(within(rows[2]).getByText("ASTRO - UST")).toBeInTheDocument();
    });

    it("sorts by unlock date ascending when heading is clicked once and descending when clicked again", async () => {
      render(<MyLockedPools />);

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
