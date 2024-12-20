"use client";

import React, { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PDF from "../../../asset/images/pdf.png";
import XLSX from "../../../asset/images/xlsx.png";
import VIDEO from "../../../asset/images/video.png";
import WORD from "../../../asset/images/word.png";
import Logo from "../../../asset/images/companydummylog.png";
import User from "../../../asset/images/user.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/common/commonFunctions";
import TooltipCommon from "@/components/common/TooltipCommon";

const UserLogo = User.src;
const PDFPic = PDF.src;
const XLSXPic = XLSX.src;
const VIDEOPic = VIDEO.src;
const WORDPic = WORD.src;
const companyLogo = Logo.src;

const UpdateFilesSection = ({
  updateFileDetails,
  getUpdateFiles,
  productFlowId,
}: any) => {
  const getFilenameFromURL = (url: string) => {
    // Splitting the URL by '/' and getting the last part
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    return filename;
  };
  // useEffect(() => {
  //   getUpdateFiles();
  // }, []);
  return (
    <ScrollArea
      className="flex flex-col overflow-y-auto"
      style={{ maxHeight: "178px" }}
    >
      {updateFileDetails &&
        updateFileDetails.map((editData: any, index: number) => {
          let fileExtension = "";
          if (editData?.fileUrl) {
            const fileNameParts = editData?.fileUrl.split(".");
            if (fileNameParts.length > 1) {
              fileExtension = fileNameParts.pop()?.toLowerCase() || "";
            }
          }
          // Determine the type of the file based on fileExtension
          let fileType = "unknown"; // default to unknown

          switch (fileExtension) {
            case "pdf":
              fileType = "pdf";
              break;
            case "jpg":
            case "jpeg":
            case "png":
              fileType = "image";
              break;
            case "xlsx":
              fileType = "xlsx";
              break;
            case "mp4":
              fileType = "video";
              break;
            case "docx":
              fileType = "word";
              break;
            default:
              fileType = "unknown";
              break;
          }

          // Prepare the content based on fileType
          let content;
          if (fileType === "pdf") {
            content = (
              <div className="flex items-center justify-center h-[90px] w-[135px] bg-gray-200 rounded">
                <a href={editData?.fileUrl} target="_blank">
                  <img
                    src={PDFPic}
                    alt=""
                    className="h-[80px] w-[80px] object-cover rounded"
                  />
                </a>
              </div>
            );
          } else if (fileType === "image") {
            content = (
              <div className="flex items-center justify-center h-[90px] w-[135px] bg-gray-200 rounded">
                <img
                  key={index}
                  src={editData?.fileUrl}
                  alt=""
                  className="h-[80px] w-[80px] object-cover rounded"
                />
              </div>
            );
          } else if (fileType === "word") {
            content = (
              <div className="flex items-center justify-center h-[90px] w-[135px] bg-gray-200 rounded">
                <a href={editData?.fileUrl} target="_blank">
                  <img
                    src={WORDPic}
                    alt=""
                    className="h-[80px] w-[80px] object-cover rounded"
                  />
                </a>
              </div>
            );
          } else if (fileType === "xlsx") {
            content = (
              <div className="flex items-center justify-center h-[90px] w-[135px] bg-gray-200 rounded">
                <a href={editData?.fileUrl} target="_blank">
                  <img
                    src={XLSXPic}
                    alt=""
                    className="h-[80px] w-[80px] object-cover rounded"
                  />
                </a>
              </div>
            );
          } else if (fileType === "video") {
            content = (
              <video
                className="h-[100px] w-[135px] rounded"
                src={editData?.fileUrl}
                width={200}
                controls
              ></video>
            );
          } else {
            // Handle unknown file types or default case
            content = (
              <div className="flex items-center justify-center h-[100px] w-[100px] bg-gray-200 rounded">
                <span className="text-gray-600 text-lg">Unknown</span>
              </div>
            );
          }

          return (
            <div
              className="rounded-md border flex items-center h-28 mx-2 my-2"
              key={editData?._id}
            >
              <div className="border rounded-md m-3 flex items-center">
                {content}
              </div>

              <div className="m-3 flex flex-col justify-around gap-2 text-[0.8rem]">
                <div className="font-bold">
                  {getFilenameFromURL(editData?.fileUrl)}
                </div>
                {/* <div>Updates</div> */}
                <div className="flex items-center gap-3">
                  <span>
                    <TooltipCommon text={editData.uploadedBy?.fullName}>
                      <Avatar className="cursor-pointer w-6 h-6">
                        <AvatarImage
                          src={editData?.uploadedBy?.avatar}
                          className="h-6"
                          alt="companyLogo"
                        />
                        <AvatarFallback>
                          <img
                            src={UserLogo}
                            className="h-6"
                            alt="companyLogo"
                          />
                        </AvatarFallback>
                      </Avatar>
                    </TooltipCommon>
                  </span>
                  <span>{formatDate(editData?.createdAt)}</span>
                </div>
              </div>
            </div>
          );
        })}
    </ScrollArea>
  );
};

export default UpdateFilesSection;
