"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  baseInstance,
  errorToastingFunction,
  formatDate,
  headerOptions,
} from "@/common/commonFunctions";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
interface WebsiteContentDetailType {
  id: number;
  customer: any;
  typeOfCustomer: string;
  currentDomain: string;
  newDomain: string;
  domainInfo: string;
  domainTransferred: string[];
  registrarName: string;
  customerEmails: string[];
  emailsToBeCreated: string;
  existingEmailsAttached: string;
  theme: string;
  colours: string;
  companyLogo: string[];
  images: string[];
  notesForDesign: string;
  pageName: string;
  isCopywriterRequired: string[];
  contentRequired: string[];
  socialMedia: string;
  keyPhrasesAgreed: string[];
  keyAreasAgreed: string[];
  blogToBeAdded: string[];
  preferredPageNamesForBlog: string;
  googleReviews: string[];
  linkToCurrentGoogleReviews: string;
  contactInformation: string[];
  newContactInformation: string;
  notesForCopywriter: string;
  selectedCustomerId: string;
  keywordforblogposts: string;
}

const WebsiteContentDetails = () => {
  const { websiteContentId } = useParams();
  const [websiteContentDetails, setWebsiteContentDetails] =
    React.useState<WebsiteContentDetailType | null>(null);

  const getWebsiteContentDetails = async () => {
    try {
      const result = await baseInstance.get(`/newwebsite/${websiteContentId}`);
      if (result.status === 200) {
        setWebsiteContentDetails(result?.data?.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        errorToastingFunction(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    getWebsiteContentDetails();
  }, []);

  return (
    <div className="px-4 py-0 relative ">
      <div className="text-[1rem] font-semibold absolute top-[-45px]">
        {websiteContentDetails?.customer?.companyName
          ? websiteContentDetails?.customer?.companyName
          : "loading..."}
      </div>
      <div className=" gap-5 mt-2">
        
        <div className="flex justify-center gap-5">
        <div className="my-3 text-[0.9rem] bg-[#fff] hover:bg-gray-300 h-fit px-2 py-1 cursor-pointer hidden text-center sm:block w-fit boxShadow border-0 rounded-lg">
          <Link href={`/websiteContent`} >Back</Link>
        </div>
          <Card className="h-[90vh] overflow-auto">
            <CardHeader>
              <CardTitle className="text-[1rem]">
                New Website Content Data
              </CardTitle>
              <CardDescription>
                Details Of existing New Website Content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="typeOfCustomer"
                      className="text-right font-bold"
                    >
                      Type of Customer:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.typeOfCustomer || "Loading..."}
                    </p>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="currentDomain"
                      className="text-right font-bold"
                    >
                      Current Domain:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.currentDomain || "Loading..."}
                    </p>
                  </div>

                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="domainInfo"
                      className="text-right font-bold"
                    >
                      Domain Info:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.domainInfo || "Loading..."}
                    </p>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="domainTransferred"
                      className="text-right font-bold"
                    >
                      Domain Transferred:
                    </Label>
                    <p className="mx-2">
                      <div className="mx-2">
                        {websiteContentDetails?.domainTransferred &&
                        websiteContentDetails.domainTransferred.length > 0
                          ? websiteContentDetails.domainTransferred.map(
                              (item, index) => <p key={index}>{item}</p>
                            )
                          : "Loading..."}
                      </div>
                    </p>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="customerEmails"
                      className="text-right font-bold"
                    >
                      Customer Emails:
                    </Label>
                    <div className="mx-2">
                      {websiteContentDetails?.customerEmails &&
                      websiteContentDetails.customerEmails.length > 0
                        ? websiteContentDetails.customerEmails.map(
                            (email, index) => <p key={index}>{email}</p>
                          )
                        : "Loading..."}
                    </div>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="customerEmails"
                      className="text-right font-bold"
                    >
                      Blog To Be Added:
                    </Label>
                    <div className="mx-2">
                      {websiteContentDetails?.blogToBeAdded &&
                      websiteContentDetails.blogToBeAdded.length > 0
                        ? websiteContentDetails.blogToBeAdded.map(
                            (item, index) => <p key={index}>{item}</p>
                          )
                        : "Loading..."}
                    </div>
                  </div>

                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="emailsToBeCreated"
                      className="text-right font-bold"
                    >
                      Emails To Be Created:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.emailsToBeCreated || "Loading..."}
                    </p>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="existingEmailsAttached"
                      className="text-right font-bold"
                    >
                      Existing Emails Attached:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.existingEmailsAttached ||
                        "Loading..."}
                    </p>
                  </div>

                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="googleReviews"
                      className="text-right font-bold"
                    >
                      Google Reviews:
                    </Label>
                    <div className="mx-2">
                      {websiteContentDetails?.googleReviews &&
                      websiteContentDetails.googleReviews.length > 0
                        ? websiteContentDetails.googleReviews.map(
                            (item, index) => <p key={index}>{item}</p>
                          )
                        : "Loading..."}
                    </div>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label htmlFor="images" className="text-right font-bold">
                      Images:
                    </Label>

                    <div className="mx-2">
                      {websiteContentDetails?.images &&
                      websiteContentDetails.images.length > 0
                        ? websiteContentDetails.images.map((item, index) => (
                            <p key={index}>{item}</p>
                          ))
                        : "Loading..."}
                    </div>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label htmlFor="images" className="text-right font-bold">
                      Images:
                    </Label>

                    <div className="mx-2">
                      {websiteContentDetails?.companyLogo &&
                      websiteContentDetails.companyLogo.length > 0
                        ? websiteContentDetails.companyLogo.map(
                            (item, index) => <p key={index}>{item}</p>
                          )
                        : "Loading..."}
                    </div>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label htmlFor="images" className="text-right font-bold">
                      Content Required:
                    </Label>

                    <div className="mx-2">
                      {websiteContentDetails?.contentRequired &&
                      websiteContentDetails.contentRequired.length > 0
                        ? websiteContentDetails.contentRequired.map(
                            (item, index) => <p key={index}>{item}</p>
                          )
                        : "Loading..."}
                    </div>
                  </div>

                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="isCopywriterRequired"
                      className="text-right font-bold"
                    >
                      Is Copywriter Required:
                    </Label>

                    <div className="mx-2">
                      {websiteContentDetails?.isCopywriterRequired &&
                      websiteContentDetails.isCopywriterRequired.length > 0
                        ? websiteContentDetails.isCopywriterRequired.map(
                            (item, index) => <p key={index}>{item}</p>
                          )
                        : "N/A"}
                    </div>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="keyAreasAgreed"
                      className="text-right font-bold"
                    >
                      Key Areas Agreed:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.keyAreasAgreed || "Loading..."}
                    </p>
                  </div>

                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="keyPhrasesAgreed"
                      className="text-right font-bold"
                    >
                      Key Phrases Agreed:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.keyPhrasesAgreed || "Loading..."}
                    </p>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="keywordforblogposts"
                      className="text-right font-bold"
                    >
                      Keyword for Blog Posts:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.keywordforblogposts ||
                        "Loading..."}
                    </p>
                  </div>

                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="linkToCurrentGoogleReviews"
                      className="text-right font-bold"
                    >
                      Link to Current Google Reviews:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.linkToCurrentGoogleReviews ||
                        "Loading..."}
                    </p>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="newContactInformation"
                      className="text-right font-bold"
                    >
                      New Contact Information:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.newContactInformation ||
                        "Loading..."}
                    </p>
                  </div>

                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label htmlFor="newDomain" className="text-right font-bold">
                      New Domain:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.newDomain || "Loading..."}
                    </p>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="notesForCopywriter"
                      className="text-right font-bold"
                    >
                      Notes for Copywriter:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.notesForCopywriter ||
                        "Loading..."}
                    </p>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="contactInformation"
                      className="text-right font-bold"
                    >
                      Contact Information:
                    </Label>

                    <div className="mx-2">
                      {websiteContentDetails?.contactInformation &&
                      websiteContentDetails.contactInformation.length > 0
                        ? websiteContentDetails.contactInformation.map(
                            (item, index) => <p key={index}>{item}</p>
                          )
                        : "Loading..."}
                    </div>
                  </div>

                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="notesForDesign"
                      className="text-right font-bold"
                    >
                      Notes for Design:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.notesForDesign || "Loading..."}
                    </p>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label htmlFor="pageName" className="text-right font-bold">
                      Page Name:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.pageName || "Loading..."}
                    </p>
                  </div>

                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="preferredPageNamesForBlog"
                      className="text-right font-bold"
                    >
                      Preferred Page Names for Blog:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.preferredPageNamesForBlog ||
                        "Loading..."}
                    </p>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="registrarName"
                      className="text-right font-bold"
                    >
                      Registrar Name:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.registrarName || "Loading..."}
                    </p>
                  </div>

                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="socialMedia"
                      className="text-right font-bold"
                    >
                      Social Media:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.socialMedia || "Loading..."}
                    </p>
                  </div>
                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label htmlFor="theme" className="text-right font-bold">
                      Theme:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.theme || "Loading..."}
                    </p>
                  </div>

                  <div className="flex items-center pb-[10px] mb-[10px] border-b border-b-[#ddd] text-[0.8rem]">
                    <Label
                      htmlFor="typeOfCustomer"
                      className="text-right font-bold"
                    >
                      Type of Customer:
                    </Label>
                    <p className="mx-2">
                      {websiteContentDetails?.typeOfCustomer || "Loading..."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WebsiteContentDetails;
