import {
  baseInstance,
  logOutFunction,
  errorToastingFunction,
  successToastingFunction,
} from "@/common/commonFunctions";
import { headerOptions } from "@/common/commonFunctions";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type LeadDataType = {
  id: number;
  company_name: string;
  contact_name: string;
  customer_id: string;
  rep_name: string;
  rep_pic: string;
  status: string;
  isComplete: boolean;
};

export type LeadState = {
  leadData: LeadDataType[];
  addedLead: any;
  loading: boolean;
};

export type LeadActions = {
  fetchAllLeadData: () => Promise<void>;
  fetchMyLeadData: () => Promise<void>;
  addLeadData: (formData: any) => Promise<void>;
};

export const useLeadStore = create<LeadState & LeadActions>()(
  devtools((set) => ({
    leadData: [],
    loading: false,
    addedLead: {},
    fetchAllLeadData: async () => {
      set({ loading: true });
      try {
        const response = await baseInstance.get("/leads");
        if (response.status === 200) {
          set({ leadData: response?.data?.data, loading: false });
        } else {
          set({ leadData: response?.data?.message, loading: false });
        }
      } catch (error: any) {
        logOutFunction(error?.response?.data?.message);
        set({ leadData: error?.response?.data?.message, loading: false });
      }
    },
    fetchMyLeadData: async () => {
      try {
        const response = await baseInstance.get("/my-leads", {
          headers: headerOptions(true),
        });
        if (response.status === 200) {
          set({ leadData: response?.data });
        }
      } catch (error: any) {
        logOutFunction(error?.response?.data?.message);
        // set({ leadData: error?.response });
        set((state) => ({ ...state, leadData: [] }));
      }
    },
    addLeadData: async (formData: any) => {
      try {
        const response = await baseInstance.post("/leads", formData, {
          headers: headerOptions(true),
        });

        if (response?.status === 201) {
          set({ addedLead: response });
          successToastingFunction(response?.data?.message);
        } else {
          alert("Something went Wrong !!");
        }
      } catch (error: any) {
        errorToastingFunction(error?.response?.data?.message);
        // set({ addedLead: error?.response });
        set((state) => ({ ...state, addedLead: {} }));
      }
    },
  }))
);
