import { TxInfo } from "@terra-money/terra.js";

type NotificationPayload =
  | {
      type: "started";
      txHash: string;
      txInfo?: TxInfo;
      txType?: string;
      data?: any;
    }
  | {
      type: "succeed";
      txHash: string;
      txInfo?: TxInfo;
      txType?: string;
      originalTransaction?: string;
      data?: any;
    }
  | {
      type: "failed";
      txHash: string;
      txInfo?: TxInfo;
      txType?: string;
      originalTransaction?: string;
      data?: any;
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
