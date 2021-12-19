import { Notification, Notifications } from "./model";

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
      const hasAlready = chainState.filter((item) => {
        return (
          action.notification.txHash == item.txHash &&
          (item.type == "succeed" || item.type == "failed")
        );
      });

      if (hasAlready.length > 0) {
        return state;
      }

      return {
        ...state,
        items: [action.notification, ...chainState],
      };
    case "REMOVE_NOTIFICATION": {
      return {
        ...state,
        items: state.items.filter(
          (notification) => notification.id !== action.notificationId
        ),
      };
    }
  }
}
