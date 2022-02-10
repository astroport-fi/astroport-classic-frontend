import useTx from "modules/common/hooks/useTx";
import { renderHook } from "@testing-library/react-hooks";
import {
  UserDenied,
  CreateTxFailed,
  TxFailed,
  Timeout,
  TxUnspecifiedError,
} from "@terra-money/wallet-types";
import { PostError } from "modules/common";

const mockPost = jest.fn();

jest.mock("@terra-money/wallet-provider", () => ({
  useWallet: jest.fn(() => ({
    post: mockPost,
  })),
}));

beforeEach(() => {
  mockPost.mockReset();
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
    it("posts when no callbacks are specified", () => {
      const { result } = renderHook(() => useTx({}));
      const { submit } = result.current;

      submit({
        msgs: [mockMsg],
        fee: mockFee,
      });

      expect(mockPost).toHaveBeenCalledWith({
        msgs: [mockMsg],
        fee: mockFee,
      });
    });

    it("invokes onPosting callback, posts, invokes onBroadcasting (with txhash), and does not invoke onError when post is successful", async () => {
      const { result } = renderHook(() =>
        useTx({ onPosting, onBroadcasting, onError })
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
      });

      expect(onBroadcasting).toHaveBeenCalledWith("1234ABCD");
      expect(onBroadcasting).toHaveBeenCalledAfter(mockPost);

      expect(onError).not.toHaveBeenCalled();
    });
  });

  describe("failed post", () => {
    const render = ({ onPosting, onBroadcasting, onError }) => {
      const { result } = renderHook(() =>
        useTx({ onPosting, onBroadcasting, onError })
      );
      return result.current;
    };

    const submitWithError = async (
      { onPosting, onBroadcasting, onError },
      error
    ) => {
      const { submit } = render({ onPosting, onBroadcasting, onError });

      mockPost.mockRejectedValue(error);

      await submit({
        msgs: [mockMsg],
        fee: mockFee,
      });
    };

    it("invokes onPosting callback, posts, then invokes onError with error when post fails, and never invokes onBroadcasting", async () => {
      const error = new Error();
      await submitWithError({ onPosting, onBroadcasting, onError }, error);

      expect(onPosting).toHaveBeenCalledBefore(mockPost);

      expect(mockPost).toHaveBeenCalledWith({
        msgs: [mockMsg],
        fee: mockFee,
      });

      expect(onError).toHaveBeenCalledWith(PostError.UnknownError, error);
      expect(onError).toHaveBeenCalledAfter(mockPost);

      expect(onBroadcasting).not.toHaveBeenCalled();
    });

    it("invokes onError callback with UserDenied error", async () => {
      const error = new UserDenied();
      await submitWithError({ onError }, error);
      expect(onError).toHaveBeenCalledWith(PostError.UserDenied, error);
    });

    it("invokes onError callback with CreateTxFailed error", async () => {
      const error = new CreateTxFailed(jest.fn(), "failed to create tx");
      await submitWithError({ onError }, error);
      expect(onError).toHaveBeenCalledWith(PostError.CreateTxFailed, error);
    });

    it("invokes onError callback with TxFailed error", async () => {
      const error = new TxFailed(
        jest.fn(),
        "123ABC",
        "failed to create tx",
        null
      );
      await submitWithError({ onError }, error);
      expect(onError).toHaveBeenCalledWith(PostError.TxFailed, error);
    });

    it("invokes onError callback with Timeout error", async () => {
      const error = new Timeout("timed out");
      await submitWithError({ onError }, error);
      expect(onError).toHaveBeenCalledWith(PostError.Timeout, error);
    });

    it("invokes onError callback with TxUnspecifiedError error", async () => {
      const error = new TxUnspecifiedError(jest.fn(), "unspecified error");
      await submitWithError({ onError }, error);
      expect(onError).toHaveBeenCalledWith(PostError.TxUnspecifiedError, error);
    });

    it("invokes onError callback with UnknownError error when error type is not recognized", async () => {
      class FooError extends Error {
        constructor() {
          super("Something went wrong");
          this.name = "FooError";
        }
      }

      const error = new FooError();
      await submitWithError({ onError }, error);
      expect(onError).toHaveBeenCalledWith(PostError.UnknownError, error);
    });
  });
});
