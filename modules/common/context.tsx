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
  useAllTokens,
  Notifications,
  DEFAULT_NOTIFICATIONS,
  AddNotificationPayload,
  RemoveNotificationPayload,
  notificationReducer,
} from "modules/common";
import whitelist from "constants/whitelist";
import { useTerraWebapp } from "context/TerraWebappContext";

type Astroswap = {
  isLoading: boolean;
  isErrorLoadingData: boolean;
  pairs: PairResponse[] | null;
  tokenGraph: TokenGraphAdjacencyList | null;
  tokens?: Tokens | undefined;
  notifications: Notifications;
  addNotification: (payload: AddNotificationPayload) => void;
  removeNotification: (payload: RemoveNotificationPayload) => void;
};

const AstroswapContext: Context<Astroswap> = createContext<Astroswap>({
  isLoading: true,
  isErrorLoadingData: false,
  pairs: [],
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
    network: { name },
  } = useTerraWebapp();

  const pairs = useMemo(() => {
    // @ts-ignore
    return whitelist[name].pairs;
  }, [whitelist, name]);

  const {
    tokens,
    isLoading: isLoadingTokens,
    isError: isErrorLoadingTokens,
  } = useAllTokens({ pairs });

  const isLoading = useMemo(() => isLoadingTokens, [isLoadingTokens]);

  const isErrorLoadingData = useMemo(
    () => isErrorLoadingTokens,
    [isErrorLoadingTokens]
  );

  const tokenGraph = useMemo(() => {
    if (pairs === undefined || pairs.length == 0) {
      return null;
    }

    return pairsToGraph(pairs);
  }, [pairs]);

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
