import { errorToastingFunction } from "../common/commonFunctions";
import {
  baseInstance,
  logOutFunction,
  successToastingFunction,
} from "@/common/commonFunctions";
import { headerOptions } from "@/common/commonFunctions";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type WebsiteContentDataType = {
  id: number;
  customer: any;
  typeOfCustomer: string;
  currentDomain: string;
  newDomain: string;
  domainInfo: string;
  domainTransferred: string[];
  registrarName: string;
  customerEmails: string;
  emailsToBeCreated: string;
  existingEmailsAttached: string;
  theme: string;
  colours: string;
  companyLogo: string;
  images: string;
  notesForDesign: string;
  pageName: string;
  isCopywriterRequired: string;
  contentRequired: string[];
  socialMedia: string;
  keyPhrasesAgreed: string;
  keyAreasAgreed: string;
  blogToBeAdded: string;
  preferredPageNamesForBlog: string;
  googleReviews: string;
  linkToCurrentGoogleReviews: string;
  contactInformation: string;
  newContactInformation: string;
  notesForCopywriter: string;
  selectedCustomerId: string;
};

export type WebsiteContentState = {
  websiteContentData: WebsiteContentDataType[] | any;
  message?: string;
  loading: boolean;
};

export type WebsiteContentActions = {
  fetchWebsiteContentData: ({
    page,
    limit,
    searchInput,
    filters,
  }: any) => Promise<void>;
  addWebsiteContentData: (data: any, customerId: string) => void;
};

export const useWebsiteContentStore = create<
  WebsiteContentState & WebsiteContentActions
>()(
  devtools((set) => ({
    websiteContentData: [],
    loading: false,

    fetchWebsiteContentData: async (params) => {
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
        if (filters?.typeOfCustomer !== undefined)
          queryParams.append("typeOfCustomer", filters?.typeOfCustomer);

        const response = await baseInstance.get(
          `/newwebsite?${queryParams.toString()}`
        );

        if (response.status === 200) {
          set({ websiteContentData: response?.data?.data, loading: false });
        } else {
          set({ websiteContentData: response?.data?.message, loading: false });
        }
      } catch (error: any) {
        logOutFunction(error?.response?.data?.message);
        set({
          websiteContentData: error?.response?.data?.message,
          loading: false,
        });
      }
    },

    addWebsiteContentData: async (data: any, customerId: string) => {
      set({ loading: true });
      try {
        const response = await baseInstance.post(
          `/newwebsite/${customerId}`,
          data
        );
        if (response?.status === 201) {
          set({ websiteContentData: response.data?.data, loading: false });
          successToastingFunction(response.data.message);
        } else {
          errorToastingFunction("Something Went Wrong"),
            set({
              loading: false,
            });
        }
      } catch (error: any) {
        set({
          websiteContentData: error?.response,
          loading: false,
        });
        errorToastingFunction(error?.response?.data?.message);
      }
    },
  }))
);
