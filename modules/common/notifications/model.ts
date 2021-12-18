import { TxInfo } from "@terra-money/terra.js";

type NotificationPayload =
  | {
      type: "started";
      txHash: string;
      txInfo?: TxInfo;
      txType?: string;
    }
  | {
      type: "succeed";
      txHash: string;
      txInfo?: TxInfo;
      txType?: string;
      originalTransaction?: string;
    }
  | {
      type: "failed";
      txHash: string;
      txInfo?: TxInfo;
      txType?: string;
      originalTransaction?: string;
    };

export type Notification = { id: string } & NotificationPayload;

export type AddNotificationPayload = {
  notification: NotificationPayload;
};

export type RemoveNotificationPayload = {
  notificationId: string;
};

export type Notifications = {
  items?: Notification[];
};

export const DEFAULT_NOTIFICATIONS: Notifications = {};
