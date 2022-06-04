import { renderHook } from "@testing-library/react-hooks";
import {
  UserDenied,
  CreateTxFailed,
  TxFailed,
  Timeout,
  TxUnspecifiedError,
} from "@terra-money/wallet-types";
import { useTx, TxPostError } from "modules/common/hooks/useTx";

const mockPost = jest.fn();
const mockAddNotification = jest.fn();

jest.mock("@terra-money/wallet-provider", () => ({
  useWallet: jest.fn(() => ({
    post: mockPost,
  })),
}));

jest.mock("modules/common", () => ({
  useAstroswap: jest.fn(() => ({
    addNotification: mockAddNotification,
  })),
  useTokenInfo: jest.fn(() => ({
    getSymbol: jest.fn((token) => {
      return {
        uusd: "USTC",
        uluna: "LUNAC",
      }[token];
    }),
  })),
}));

beforeEach(() => {
  mockPost.mockReset();
  mockAddNotification.mockReset();
});

describe("useTx submit", () => {
  let onPosting, onBroadcasting, onError;
  let mockMsg, mockFee;

  beforeEach(() => {
    onPosting = jest.fn();
    onBroadcasting = jest.fn();
    onError = jest.fn();

    mockMsg = jest.fn();
    mockFee = jest.fn();
  });

  describe("short-circuit", () => {
    const render = () => {
      const { result } = renderHook(() =>
        useTx({ onPosting, onBroadcasting, onError })
      );
      return result.current;
    };

    const expectNoPostOrCallbacks = () => {
      expect(mockPost).not.toHaveBeenCalled();
      expect(onPosting).not.toHaveBeenCalled();
      expect(onBroadcasting).not.toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    };

    it("does not post or invoke callbacks when fee is null", () => {
      const { submit } = render();

      submit({
        msgs: [mockMsg],
        fee: null,
      });

      expectNoPostOrCallbacks();
    });

    it("does not post or invoke callbacks when fee is undefined", () => {
      const { submit } = render();

      submit({
        msgs: [mockMsg],
        fee: undefined,
      });

      expectNoPostOrCallbacks();
    });

    it("does not post or invoke callbacks when messages are null", () => {
      const { submit } = render();

      submit({
        msgs: null,
        fee: mockFee,
      });

      expectNoPostOrCallbacks();
    });

    it("does not post or invoke callbacks when messages are undefined", () => {
      const { submit } = render();

      submit({
        msgs: undefined,
        fee: jest.fn(),
      });

      expectNoPostOrCallbacks();
    });

    it("does not post or invoke callbacks when messages are empty", () => {
      const { submit } = render();

      submit({
        msgs: [],
        fee: mockFee,
      });

      expectNoPostOrCallbacks();
    });
  });

  describe("successful post", () => {
    it("posts and adds started notification when no callbacks are specified", async () => {
      const { result } = renderHook(() =>
        useTx({
          notification: {
            type: "claimRewards",
          },
        })
      );

      const { submit } = result.current;

      mockPost.mockResolvedValue({
        result: {
          txhash: "ABCD123",
        },
      });

      await submit({
        msgs: [mockMsg],
        fee: mockFee,
      });

      expect(mockPost).toHaveBeenCalledWith({
        msgs: [mockMsg],
        fee: mockFee,
        isClassic: true,
      });

      expect(mockAddNotification).toHaveBeenCalledAfter(mockPost);
      expect(mockAddNotification).toHaveBeenCalledWith({
        notification: {
          type: "started",
          txType: "claimRewards",
          txHash: "ABCD123",
        },
      });
    });

    it("invokes onPosting callback, posts, adds started notification, invokes onBroadcasting (with txhash), and does not invoke onError when post is successful", async () => {
      const { result } = renderHook(() =>
        useTx({
          onPosting,
          onBroadcasting,
          onError,
          notification: {
            type: "swap",
            data: {
              token1: "uusd",
              token2: "uluna",
            },
          },
        })
      );

      const { submit } = result.current;

      mockPost.mockResolvedValue({
        result: {
          txhash: "1234ABCD",
        },
      });

      await submit({
        msgs: [mockMsg],
        fee: mockFee,
      });

      expect(onPosting).toHaveBeenCalledBefore(mockPost);

      expect(mockPost).toHaveBeenCalledWith({
        msgs: [mockMsg],
        fee: mockFee,
        isClassic: true,
      });

      expect(onBroadcasting).toHaveBeenCalledWith("1234ABCD");
      expect(onBroadcasting).toHaveBeenCalledAfter(mockPost);

      expect(mockAddNotification).toHaveBeenCalledAfter(mockPost);
      expect(mockAddNotification).toHaveBeenCalledWith({
        notification: {
          type: "started",
          txHash: "1234ABCD",
          txType: "swap",
          data: {
            token1: "uusd",
            token2: "uluna",
          },
        },
      });

      expect(onError).not.toHaveBeenCalled();
    });
  });

  describe("failed post", () => {
    const render = ({ onPosting, onBroadcasting, onError, notification }) => {
      const { result } = renderHook(() =>
        useTx({ onPosting, onBroadcasting, onError, notification })
      );
      return result.current;
    };

    const submitWithError = async (
      {
        onPosting,
        onBroadcasting,
        onError,
        notification = {
          type: "swap",
          data: {
            token1: "uusd",
            token2: "uluna",
          },
        },
      },
      error
    ) => {
      const { submit } = render({
        onPosting,
        onBroadcasting,
        onError,
        notification,
      });

      mockPost.mockRejectedValue(error);

      await submit({
        msgs: [mockMsg],
        fee: mockFee,
      });
    };

    it("invokes onPosting callback, posts, adds error notification, and invokes onError with error when post fails, and never invokes onBroadcasting", async () => {
      const error = new Error();
      await submitWithError({ onPosting, onBroadcasting, onError }, error);

      expect(onPosting).toHaveBeenCalledBefore(mockPost);

      expect(mockPost).toHaveBeenCalledWith({
        msgs: [mockMsg],
        fee: mockFee,
        isClassic: true,
      });

      expect(mockAddNotification).toHaveBeenCalledAfter(mockPost);
      expect(mockAddNotification).toHaveBeenCalledWith({
        notification: {
          type: "error",
          title: "Swap from USTC to LUNAC failed",
          description: "There was an unexpected error.",
        },
      });

      expect(onError).toHaveBeenCalledWith(TxPostError.UnknownError, error);
      expect(onError).toHaveBeenCalledAfter(mockPost);

      expect(onBroadcasting).not.toHaveBeenCalled();
    });

    it("invokes onError callback with UserDenied error and does not add error notification", async () => {
      const error = new UserDenied();
      await submitWithError({ onError }, error);
      expect(onError).toHaveBeenCalledWith(TxPostError.UserDenied, error);

      expect(mockAddNotification).not.toHaveBeenCalled();
    });

    it("invokes onError callback with CreateTxFailed error and adds appropriate error notification", async () => {
      const error = new CreateTxFailed(jest.fn(), "failed to create tx");
      await submitWithError({ onError }, error);
      expect(onError).toHaveBeenCalledWith(TxPostError.CreateTxFailed, error);

      expect(mockAddNotification).toHaveBeenCalledWith({
        notification: {
          type: "error",
          title: "Swap from USTC to LUNAC failed",
          description: "failed to create tx",
        },
      });
    });

    it("invokes onError callback with Timeout error and adds appropriate error notification when CreateTxError due to a timeout is encountered", async () => {
      const error = new CreateTxFailed(
        jest.fn(),
        "timeout of 42000ms exceeded"
      );
      await submitWithError({ onError }, error);
      expect(onError).toHaveBeenCalledWith(TxPostError.Timeout, error);

      expect(mockAddNotification).toHaveBeenCalledWith({
        notification: {
          type: "error",
          title: "Swap from USTC to LUNAC failed",
          description: "Timed out. Please try again.",
        },
      });
    });

    it("invokes onError callback with InsufficientFee error and adds appropriate error notification when CreateTxError due to a insufficient fee is encountered", async () => {
      const error = new CreateTxFailed(
        jest.fn(),
        'insufficient fees; got: "42uusd", required: "..." = "..."(gas) +""(stability): insufficient fee'
      );
      await submitWithError({ onError }, error);
      expect(onError).toHaveBeenCalledWith(TxPostError.InsufficientFee, error);

      expect(mockAddNotification).toHaveBeenCalledWith({
        notification: {
          type: "error",
          title: "Swap from USTC to LUNAC failed",
          description:
            "Sorry, the specified fee was not enough to cover the cost of this transaction. Please try again.",
        },
      });
    });

    it("invokes onError callback with InsufficientFunds error and adds appropriate error notification when CreateTxError due to a insufficient funds is encountered", async () => {
      const error = new CreateTxFailed(
        jest.fn(),
        "0uusd is smaller than 42uusd: insufficient funds: insufficient funds"
      );
      await submitWithError({ onError }, error);
      expect(onError).toHaveBeenCalledWith(
        TxPostError.InsufficientFunds,
        error
      );

      expect(mockAddNotification).toHaveBeenCalledWith({
        notification: {
          type: "error",
          title: "Swap from USTC to LUNAC failed",
          description:
            "We're sorry, you don't have enough funds to complete this request. Please try again when you have more funds available.",
        },
      });
    });

    it("invokes onError callback with TxFailed error and adds appropriate error notification", async () => {
      const error = new TxFailed(
        jest.fn(),
        "123ABC",
        "failed to create tx",
        null
      );
      await submitWithError({ onError }, error);
      expect(onError).toHaveBeenCalledWith(TxPostError.TxFailed, error);

      expect(mockAddNotification).toHaveBeenCalledWith({
        notification: {
          type: "error",
          title: "Swap from USTC to LUNAC failed",
          description: "There was an unexpected error.",
        },
      });
    });

    it("invokes onError callback with Timeout error and adds appropriate error notification", async () => {
      const error = new Timeout("timed out");
      await submitWithError({ onError }, error);
      expect(onError).toHaveBeenCalledWith(TxPostError.Timeout, error);

      expect(mockAddNotification).toHaveBeenCalledWith({
        notification: {
          type: "error",
          title: "Swap from USTC to LUNAC failed",
          description: "Timed out. Please try again.",
        },
      });
    });

    it("invokes onError callback with TxUnspecifiedError error and adds appropriate error notification", async () => {
      const error = new TxUnspecifiedError(jest.fn(), "unspecified error");
      await submitWithError({ onError }, error);
      expect(onError).toHaveBeenCalledWith(
        TxPostError.TxUnspecifiedError,
        error
      );

      expect(mockAddNotification).toHaveBeenCalledWith({
        notification: {
          type: "error",
          title: "Swap from USTC to LUNAC failed",
          description: "There was an unexpected error.",
        },
      });
    });

    it("invokes onError callback with UnknownError error when error type is not recognized and adds appropriate error notification", async () => {
      class FooError extends Error {
        constructor() {
          super("Something went wrong");
          this.name = "FooError";
        }
      }

      const error = new FooError();
      await submitWithError({ onError }, error);
      expect(onError).toHaveBeenCalledWith(TxPostError.UnknownError, error);

      expect(mockAddNotification).toHaveBeenCalledWith({
        notification: {
          type: "error",
          title: "Swap from USTC to LUNAC failed",
          description: "There was an unexpected error.",
        },
      });
    });

    describe("error notification titles", () => {
      const description = "There was an unexpected error.";

      it("uses correct title for swap error notifications", async () => {
        await submitWithError({
          notification: {
            type: "swap",
            data: {
              token1: "uluna",
              token2: "uusd",
            },
          },
        });

        expect(mockAddNotification).toHaveBeenCalledWith({
          notification: {
            type: "error",
            title: "Swap from LUNAC to USTC failed",
            description,
          },
        });
      });

      it("uses correct title for provide error notifications", async () => {
        await submitWithError({
          notification: {
            type: "provide",
            data: {
              token1: "uluna",
              token2: "uusd",
            },
          },
        });

        expect(mockAddNotification).toHaveBeenCalledWith({
          notification: {
            type: "error",
            title: "Provide liquidity for LUNAC and USTC failed",
            description,
          },
        });
      });

      it("uses correct title for withdraw error notifications", async () => {
        await submitWithError({
          notification: {
            type: "withdraw",
            data: {
              token1: "uluna",
              token2: "uusd",
            },
          },
        });

        expect(mockAddNotification).toHaveBeenCalledWith({
          notification: {
            type: "error",
            title: "Withdraw liquidity for LUNAC and USTC failed",
            description,
          },
        });
      });

      it("uses correct title for unstakeLp error notifications", async () => {
        await submitWithError({
          notification: {
            type: "unstakeLp",
            data: {
              token: "uluna",
            },
          },
        });

        expect(mockAddNotification).toHaveBeenCalledWith({
          notification: {
            type: "error",
            title: "Unstake LP tokens failed",
            description,
          },
        });
      });

      it("uses correct title for lockdropUnlockLp error notifications", async () => {
        await submitWithError({
          notification: {
            type: "lockdropUnlockLp",
            data: {
              token: "uluna",
            },
          },
        });

        expect(mockAddNotification).toHaveBeenCalledWith({
          notification: {
            type: "error",
            title: "Failed", // default message
            description,
          },
        });
      });

      it("uses correct title for govStake error notifications", async () => {
        await submitWithError({
          notification: {
            type: "govStake",
          },
        });

        expect(mockAddNotification).toHaveBeenCalledWith({
          notification: {
            type: "error",
            title: "Failed", // default message
            description,
          },
        });
      });

      it("uses correct title for govUnstake error notifications", async () => {
        await submitWithError({
          notification: {
            type: "govUnstake",
          },
        });

        expect(mockAddNotification).toHaveBeenCalledWith({
          notification: {
            type: "error",
            title: "Failed", // default message
            description,
          },
        });
      });

      it("uses correct title for claimRewards error notifications", async () => {
        await submitWithError({
          notification: {
            type: "claimRewards",
          },
        });

        expect(mockAddNotification).toHaveBeenCalledWith({
          notification: {
            type: "error",
            title: "Failed to claim rewards",
            description,
          },
        });
      });

      it("uses correct title for auctionUnlockLp error notifications", async () => {
        await submitWithError({
          notification: {
            type: "auctionUnlockLp",
          },
        });

        expect(mockAddNotification).toHaveBeenCalledWith({
          notification: {
            type: "error",
            title: "Failed to unlock LP token",
            description,
          },
        });
      });

      it("uses correct title for stakeLp error notifications", async () => {
        await submitWithError({
          notification: {
            type: "stakeLp",
          },
        });

        expect(mockAddNotification).toHaveBeenCalledWith({
          notification: {
            type: "error",
            title: "Stake LP tokens failed",
            description,
          },
        });
      });

      it("uses correct title for claimRewards error notifications", async () => {
        await submitWithError({
          notification: {
            type: "claimRewards",
          },
        });

        expect(mockAddNotification).toHaveBeenCalledWith({
          notification: {
            type: "error",
            title: "Failed to claim rewards",
            description,
          },
        });
      });
    });
  });
});
