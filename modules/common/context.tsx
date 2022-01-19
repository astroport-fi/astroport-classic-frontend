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
import { useTerraWebapp } from "@arthuryeti/terra";
import { nanoid } from "nanoid";

import {
  formatPairsToRoutes,
  PairResponse,
  Route,
  Tokens,
  Data,
} from "modules/common";

import { notificationReducer } from "modules/common/notifications/reducer";
import {
  Notifications,
  DEFAULT_NOTIFICATIONS,
  AddNotificationPayload,
  RemoveNotificationPayload,
} from "modules/common/notifications/model";
import { usePrice } from "modules/swap";

type Astroswap = {
  pairs: PairResponse[] | null;
  routes: Route[] | null;
  tokens: Tokens | null;
  data: Data | null;
  notifications: Notifications;
  addNotification: (payload: AddNotificationPayload) => void;
  removeNotification: (payload: RemoveNotificationPayload) => void;
};

export const AstroswapContext: Context<Astroswap> = createContext<Astroswap>({
  pairs: [],
  routes: null,
  tokens: null,
  data: null,
  notifications: {},
  addNotification: () => undefined,
  removeNotification: () => undefined,
});

type Props = {
  children: ReactNode;
  data: Data;
};

export const AstroswapProvider: FC<Props> = ({ children, data }) => {
  const [notifications, dispatch] = useReducer(
    notificationReducer,
    DEFAULT_NOTIFICATIONS
  );
  const {
    network: { name },
  } = useTerraWebapp();

  const pairs = useMemo(() => {
    return data[name].pairs;
  }, [data, name]);

  const tokens = useMemo(() => {
    return data[name].tokens;
  }, [data, name]);

  const routes = useMemo(() => {
    if (pairs.length == 0) {
      return null;
    }

    return formatPairsToRoutes(pairs);
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
        pairs,
        routes,
        tokens,
        data,
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
