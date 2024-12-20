import { errorToastingFunction } from "../common/commonFunctions";
import {
  baseInstance,
  logOutFunction,
  successToastingFunction,
} from "@/common/commonFunctions";
import { headerOptions } from "@/common/commonFunctions";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ProductFlowDataType = {
  id: number;
  customer: any;
  currentStage:string;
  datePhase1Instructed:string,
  datePhase2Instructed:string,
  demoLink:string,
  demoCompletedDate:string,
  liveDate:string,
  notes:string


};

export type ProductFlowState = {
productFlowData: ProductFlowDataType[] | any;
  message?: string;
  loading: boolean;
};

export type ProductFlowActions = {
  fetchProductFlowData: () => void;
  addProductFlowData: (data: any, customerId: string) => void;
};

export const useProductflowStore = create<ProductFlowState & ProductFlowActions>()(
  devtools((set) => ({
    productFlowData: [],
    loading: false,

    fetchProductFlowData: async () => {
      set({ loading: true });
      try {
        const response = await baseInstance.get("/productflows");
        if (response.status === 200) {
          set({ productFlowData: response.data?.data?.productFlows, loading: false });
        } else {
          set({ productFlowData: response.data?.message, loading: false });
        }
      } catch (error: any) {
        logOutFunction(error?.response?.data?.message);
        set({ productFlowData: error?.response?.data?.message, loading: false });
      }
    },

    addProductFlowData: async (data: any, customerId: string) => {
      set({ loading: true });
      try {
        const response = await baseInstance.post(
          `/productflows/${customerId}`,
          data
        );
        if (response?.status === 201) {
          set({ productFlowData: response.data?.data, loading: false });
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
