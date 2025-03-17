import { errorToastingFunction } from "../common/commonFunctions";
import {
  baseInstance,
  logOutFunction,
  successToastingFunction,
} from "@/common/commonFunctions";
import { headerOptions } from "@/common/commonFunctions";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type TechnicalDataType = {
  id: number;
  customer: any;
  technicalTask: string;
  status: string;
  priority: string;
  timeTakenMinutes: string;
};

export type TechnicalState = {
  technicalData: TechnicalDataType[] | any;
  message?: string;
  loading: boolean;
};

export type TechnicalActions = {
  fetchTechnicalData: ({
    page,
    limit,
    searchInput,
    filters,
  }: any) => Promise<void>;
  addTechnicalData: (data: any, customerId: string) => void;
};

export const useTechnicalStore = create<TechnicalState & TechnicalActions>()(
  devtools((set) => ({
    technicalData: [],
    loading: false,

    fetchTechnicalData: async (params) => {
      set({ loading: true });
      const {
        page = 1,
        limit = 20,
        searchInput = "",
        filters = [],
      } = params || {};

      try {
        const queryParams = new URLSearchParams();
        if (page) queryParams.append("page", String(page));
        if (limit) queryParams.append("limit", String(limit));
        if (searchInput) queryParams.append("search", searchInput);
        if (filters?.status?.length > 0) {
          queryParams.append("status", filters?.status); 
        }

        const response = await baseInstance.get(
          `/technicaltrackers?${queryParams.toString()}`
        );

        if (response.status === 200) {
          set({ technicalData: response.data?.data, loading: false });
        } else {
          set({ technicalData: response.data?.message, loading: false });
        }
      } catch (error: any) {
        logOutFunction(error?.response?.data?.message);
        set({ technicalData: error?.response?.data?.message, loading: false });
      }
    },

    addTechnicalData: async (data: any, customerId: string) => {
      set({ loading: true });
      try {
        const response = await baseInstance.post(
          `/technicaltrackers/${customerId}`,
          data
        );
        if (response?.status === 201) {
          set({ technicalData: response.data?.data, loading: false });
          successToastingFunction(response.data.message);
        } else {
          errorToastingFunction("Something Went Wrong"),
            set({
              loading: false,
            });
        }
      } catch (error: any) {
        set({ loading: false });
        errorToastingFunction(error?.response?.data?.message);
      }
    },
  }))
);
