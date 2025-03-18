import { baseInstance, logOutFunction } from "@/common/commonFunctions";
import { headerOptions } from "@/common/commonFunctions";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type NotificationDataType = {
  id: number;
  additionalData: string;
  email: string;
  name: string;
  userRoles: string;
  isComplete: boolean;
  message: any;
};

export type NotificationState = {
  notificationData: NotificationDataType[] | any;
  notificationSingleData: NotificationDataType[] | any;
  notificationReadData: NotificationDataType[] | any;
  message?: string;
  loading: boolean;
  hasMore?:boolean;
};


export type NotificationActions = {
  // fetchNotificationData: () => void;
  fetchNotificationData: ({ page, limit }: any) => Promise<void>;
  fetchSingleNotificationData: (notificationId: string) => void;
  fetchSingleReadNotificationData: (notificationId: string) => void;
};

export const useNotificationStore = create<NotificationState & NotificationActions>()(
  devtools((set) => ({
    notificationData: [],
    notificationSingleData: {},
    notificationReadData: {},
    loading: false,
    hasMore: true,  // Track whether there are more notifications to fetch

    fetchNotificationData: async (params) => {
      set({ loading: true });
      const { page = 1, limit = 20 } = params || {};
      try {
        const queryParams = new URLSearchParams();
        if (page) queryParams.append('page', String(page));
        if (limit) queryParams.append('limit', String(limit));

        const response = await baseInstance.get(
          `/notifications?${queryParams.toString()}`
        );

        if (response.status === 200) {
          const newNotifications = response.data?.data || [];
          const hasMore = newNotifications.length === limit;  // If the returned data length equals the limit, more data is available

          set({ 
            notificationData: page === 1 ? newNotifications : [...response.data.data],
            hasMore, // Set hasMore based on the length of returned notifications
            loading: false 
          });
        } else {
          set({ notificationData: response.data?.message, loading: false });
        }
      } catch (error: any) {
        logOutFunction(error?.response?.data?.message);
        set({
          notificationData: error?.response?.data?.message,
          loading: false,
        });
      }
    },
// export const useNotificationStore = create<
//   NotificationState & NotificationActions
// >()(
//   devtools((set) => ({
//     notificationData: [],
//     notificationSingleData: {},
//     notificationReadData: {},
//     loading: false,
//     fetchNotificationData: 
    
//     async () => {
//       set({ loading: true });
//       try {
//         const response = await baseInstance.get("/notifications");
//         if (response.status === 200) {
//           set({ notificationData: response.data?.data, loading: false });
//         } else {
//           set({ notificationData: response.data?.message, loading: false });
//         }
//       } catch (error: any) {
//         logOutFunction(error?.response?.data?.message);
//         set({
//           notificationData: error?.response?.data?.message,
//           loading: false,
//         });
//       }
//     },
    fetchSingleNotificationData: async (notificationId) => {
      set({ loading: true });
      try {
        const response = await baseInstance.get(
          `/notifications/${notificationId}`
        );
        if (response.status === 200) {
          set({ notificationSingleData: response.data?.data, loading: false });
        } else {
          set({
            notificationSingleData: response.data?.message,
            loading: false,
          });
        }
      } catch (error: any) {
        logOutFunction(error?.response?.data?.message);
        set({
          notificationSingleData: error?.response?.data?.message,
          loading: false,
        });
      }
    },
    fetchSingleReadNotificationData: async (notificationId) => {
      set({ loading: true });
      try {
        const response = await baseInstance.patch(
          `/notifications/${notificationId}/read`
        );
        if (response.status === 200) {
          set({ notificationReadData: response.data?.data, loading: false });
        } else {
          set({
            notificationReadData: response.data?.message,
            loading: false,
          });
        }
      } catch (error: any) {
        logOutFunction(error?.response?.data?.message);
        set({
          notificationReadData: error?.response?.data?.message,
          loading: false,
        });
      }
    },
  }))
);
