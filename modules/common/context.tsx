import {
  FC,
  ReactNode,
  useReducer,
  useMemo,
  Context,
  createContext,
  useContext,
  Consumer,
  useCallback,
} from "react";
import { nanoid } from "nanoid";

import {
  pairsToGraph,
  PairResponse,
  TokenGraphAdjacencyList,
  Tokens,
  useAllPairs,
  useAllTokens,
} from "modules/common";

import { notificationReducer } from "modules/common/notifications/reducer";
import {
  Notifications,
  DEFAULT_NOTIFICATIONS,
  AddNotificationPayload,
  RemoveNotificationPayload,
} from "modules/common/notifications/model";

type Astroswap = {
  isLoading: boolean;
  pairs: PairResponse[] | null;
  tokenGraph: TokenGraphAdjacencyList | null;
  tokens: Tokens | null;
  notifications: Notifications;
  addNotification: (payload: AddNotificationPayload) => void;
  removeNotification: (payload: RemoveNotificationPayload) => void;
};

export const AstroswapContext: Context<Astroswap> = createContext<Astroswap>({
  isLoading: true,
  pairs: [],
  tokenGraph: null,
  tokens: null,
  notifications: {},
  addNotification: () => undefined,
  removeNotification: () => undefined,
});

type Props = {
  children: ReactNode;
};

export const AstroswapProvider: FC<Props> = ({ children }) => {
  const [notifications, dispatch] = useReducer(
    notificationReducer,
    DEFAULT_NOTIFICATIONS
  );

  const { pairs, isLoading: isLoadingPairs } = useAllPairs();
  const { tokens, isLoading: isLoadingTokens } = useAllTokens();

  const isLoading = useMemo(
    () => isLoadingPairs || isLoadingTokens,
    [isLoadingPairs, isLoadingTokens]
  );

  const tokenGraph = useMemo(() => {
    if (pairs === undefined || pairs.length == 0) {
      return null;
    }

    return pairsToGraph(pairs);
  }, [pairs]);

  const addNotification = useCallback(
    ({ notification }: AddNotificationPayload) => {
      dispatch({
        type: "ADD_NOTIFICATION",
        notification: { ...notification, id: nanoid() },
      });
    },
    [dispatch]
  );

  const removeNotification = useCallback(
    ({ notificationId }: RemoveNotificationPayload) => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
        notificationId,
      });
    },
    [dispatch]
  );

  return (
    <AstroswapContext.Provider
      value={{
        isLoading,
        pairs,
        tokenGraph,
        tokens,
        addNotification,
        notifications,
        removeNotification,
      }}
    >
      {children}
    </AstroswapContext.Provider>
  );
};

export function useAstroswap(): Astroswap {
  return useContext(AstroswapContext);
}

export const AstroswapConsumer: Consumer<Astroswap> = AstroswapContext.Consumer;
