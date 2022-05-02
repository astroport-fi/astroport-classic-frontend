import { Notification, Notifications, TxNotificationPayload } from "./model";

interface AddNotification {
  type: "ADD_NOTIFICATION";
  notification: Notification;
}

interface RemoveNotification {
  type: "REMOVE_NOTIFICATION";
  notificationId: string;
}

type Action = AddNotification | RemoveNotification;

export function notificationReducer(
  state: Notifications,
  action: Action
): Notifications {
  const chainState = state.items ?? [];

  switch (action.type) {
    case "ADD_NOTIFICATION":
      if (["started", "succeed", "failed"].includes(action.notification.type)) {
        const { txHash: notificationTxHash } =
          action.notification as TxNotificationPayload;

        const hasAlready = chainState.find((item) => {
          return (
            (item.type == "succeed" || item.type == "failed") &&
            notificationTxHash == (item as TxNotificationPayload).txHash
          );
        });

        if (hasAlready) {
          return state;
        }
      }

      return {
        ...state,
        items: [action.notification, ...chainState],
      };
    case "REMOVE_NOTIFICATION": {
      return {
        ...state,
        items: (state?.items || []).filter(
          (notification) => notification.id !== action.notificationId
        ),
      };
    }
  }
}
