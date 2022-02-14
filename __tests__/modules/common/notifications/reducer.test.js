import { notificationReducer } from "modules/common";

describe("notificationReducer", () => {
  describe("ADD_NOTIFICATION", () => {
    it("adds new notification to existing notifications", () => {
      const existingNotification = {
        id: "1",
        type: "started",
        txHash: "1234",
      };

      const state = {
        items: [existingNotification],
      };

      const newNotification = {
        id: "2",
        type: "succeed",
        txHash: "4567",
      };

      const newState = notificationReducer(state, {
        type: "ADD_NOTIFICATION",
        notification: newNotification,
      });

      expect(newState).toEqual({
        items: [newNotification, existingNotification],
      });
    });

    it("adds first notification", () => {
      const newNotification = {
        id: "1",
        type: "started",
        txHash: "4567",
      };

      const newState = notificationReducer(
        {},
        {
          type: "ADD_NOTIFICATION",
          notification: newNotification,
        }
      );

      expect(newState).toEqual({
        items: [newNotification],
      });
    });

    it("does not add succeed notification when succeed notification already exists for txHash", () => {
      const existingNotification = {
        id: "1",
        type: "succeed",
        txHash: "1234",
      };

      const state = {
        items: [existingNotification],
      };

      const newState = notificationReducer(state, {
        type: "ADD_NOTIFICATION",
        notification: {
          id: "2",
          type: "succeed",
          txHash: "1234",
        },
      });

      expect(newState).toEqual({
        items: [existingNotification],
      });
    });

    it("does not add failed notification when failed notification already exists for txHash", () => {
      const existingNotification = {
        id: "1",
        type: "failed",
        txHash: "1234",
      };

      const state = {
        items: [existingNotification],
      };

      const newState = notificationReducer(state, {
        type: "ADD_NOTIFICATION",
        notification: {
          id: "2",
          type: "failed",
          txHash: "1234",
        },
      });

      expect(newState).toEqual({
        items: [existingNotification],
      });
    });

    it("does not add started notification when succeed notification already exists for txHash", () => {
      const existingNotification = {
        id: "1",
        type: "succeed",
        txHash: "1234",
      };

      const state = {
        items: [existingNotification],
      };

      const newState = notificationReducer(state, {
        type: "ADD_NOTIFICATION",
        notification: {
          id: "2",
          type: "started",
          txHash: "1234",
        },
      });

      expect(newState).toEqual({
        items: [existingNotification],
      });
    });

    it("does not add started notification when failed notification already exists for txHash", () => {
      const existingNotification = {
        id: "1",
        type: "failed",
        txHash: "1234",
      };

      const state = {
        items: [existingNotification],
      };

      const newState = notificationReducer(state, {
        type: "ADD_NOTIFICATION",
        notification: {
          id: "2",
          type: "started",
          txHash: "1234",
        },
      });

      expect(newState).toEqual({
        items: [existingNotification],
      });
    });

    it("does not add succeed notification when failed notification already exists for txHash", () => {
      const existingNotification = {
        id: "1",
        type: "failed",
        txHash: "1234",
      };

      const state = {
        items: [existingNotification],
      };

      const newState = notificationReducer(state, {
        type: "ADD_NOTIFICATION",
        notification: {
          id: "2",
          type: "succeed",
          txHash: "1234",
        },
      });

      expect(newState).toEqual({
        items: [existingNotification],
      });
    });
  });

  describe("REMOVE_NOTIFICATION", () => {
    it("removes notification from existing notifications", () => {
      const notification1 = {
        id: "1",
        type: "started",
        txHash: "1234",
      };

      const notification2 = {
        id: "2",
        type: "succeed",
        txHash: "2345",
      };

      const notification3 = {
        id: "3",
        type: "error",
        title: "Something happened",
      };

      const state = {
        items: [notification1, notification2, notification3],
      };

      const newState = notificationReducer(state, {
        type: "REMOVE_NOTIFICATION",
        notificationId: "2",
      });

      expect(newState).toEqual({
        items: [notification1, notification3],
      });
    });
  });
});
