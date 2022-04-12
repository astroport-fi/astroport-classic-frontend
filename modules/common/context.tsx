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
  Pool,
  poolsToGraph,
  TokenGraphAdjacencyList,
  Tokens,
  useAllTokens,
  useAllPools,
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
  isErrorLoadingData: boolean;
  pools: Pool[] | null;
  tokenGraph: TokenGraphAdjacencyList | null;
  tokens?: Tokens | undefined;
  notifications: Notifications;
  addNotification: (payload: AddNotificationPayload) => void;
  removeNotification: (payload: RemoveNotificationPayload) => void;
};

const AstroswapContext: Context<Astroswap> = createContext<Astroswap>({
  isLoading: true,
  isErrorLoadingData: false,
  pools: [],
  tokenGraph: null,
  tokens: undefined,
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

  const {
    pools,
    isLoading: isLoadingPools,
    isError: isErrorLoadingPools,
  } = useAllPools();

  const {
    tokens,
    isLoading: isLoadingTokens,
    isError: isErrorLoadingTokens,
  } = useAllTokens({ pools });

  const isLoading = useMemo(
    () => isLoadingPools || isLoadingTokens,
    [isLoadingPools, isLoadingTokens]
  );

  const isErrorLoadingData = useMemo(
    () => isErrorLoadingPools || isErrorLoadingTokens,
    [isErrorLoadingPools, isErrorLoadingTokens]
  );

  const tokenGraph = useMemo(() => {
    if (pools === undefined || pools.length == 0) {
      return null;
    }

    return poolsToGraph(pools);
  }, [pools]);

  const addNotification = useCallback(
    ({ notification }: AddNotificationPayload) => {
      const notificationPayload = { ...notification, id: nanoid() };
      dispatch({
        type: "ADD_NOTIFICATION",
        notification: notificationPayload,
      });

      if (notificationPayload.type === "succeed") {
        // Make notification disappear after 60s
        setTimeout(() => {
          dispatch({
            type: "REMOVE_NOTIFICATION",
            notificationId: notificationPayload.id,
          });
        }, 1000 * 60);
      }
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
        isErrorLoadingData,
        pools,
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
