"use client";
import React, { useEffect, useMemo, useState, useRef } from "react";

import { Loader2, PlusCircleIcon } from "lucide-react";

import User from "../../../asset/images/user.png";
import {
  ChatBubbleIcon,
  Cross1Icon,
  DotsHorizontalIcon,
  DrawingPinIcon,
  Pencil2Icon,
  PlusIcon,
} from "@radix-ui/react-icons";

import PDF from "../../../asset/images/pdf.png";
import XLSX from "../../../asset/images/xlsx.png";
import VIDEO from "../../../asset/images/video.png";
import WORD from "../../../asset/images/word.png";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import QuillEdior from "@/components/customers/components/QuillEditor";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditorStore } from "@/Store/EditorStore";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UpdateOrder from "./UpdateOrder";
import UpdateLead from "./UpdateLead";
import UpdateTechnical from "./UpdateTechnical";
import ReactQuill, { Quill } from "react-quill";
import {
  baseInstance,
  errorToastingFunction,
  successToastingFunction,
} from "@/common/commonFunctions";
import { useUserStore } from "@/Store/UserStore";
import { Button } from "@/components/ui/button";
import { AddFilesDarkUIconSVG, AddFilesUIconSVG } from "@/utils/SVGs/SVGs";
import dynamic from "next/dynamic";
import TooltipCommon from "@/components/common/TooltipCommon";

const PDFPic = PDF.src;
const XLSXPic = XLSX.src;
const VIDEOPic = VIDEO.src;
const WORDPic = WORD.src;

const EditChatModel = ({
  orderId,
  length,
  leadId,
  id,
  setIsModalOpen,
  productFlowId,
  updateId,
  amendmentId,
  technicalId,
  customerId,
  copywriterId,
  websiteContentId,
}: any) => {
  const [buttonColor, setButtonColor] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const UserPic = User.src;
  const {
    fetchOrderEditorData,
    orderEditorData,
    fetchLeadsEditorData,
    technicalUpdateData,
    leadsEditorData,
    fetchTechnicalUpdateData,
    fetchEditorData,
    editorData,
    amendmentUpdateData,
    productFlowUpdateData,
    fetchProductFlowUpdateData,
    fetchAmendmentUpdateData,
    copywriterUpdateData,

    fetchCopywriterUpdateData,
    fetchWebsiteContentUpdateData,
    websiteContentUpdateData,
  }: any = useEditorStore();

  const { fetchUsersData, userData }: any = useUserStore();

  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const allEditorData = [
      ...editorData,
      ...technicalUpdateData,
      ...leadsEditorData,
      ...orderEditorData,
      ...amendmentUpdateData,
      ...copywriterUpdateData,
      ...productFlowUpdateData,
      ...websiteContentUpdateData,
    ];

    const editorToEdit = allEditorData.find(
      (editor: { _id: string }) => editor._id === id
    );

    setEditContent(editorToEdit?.content || editorToEdit?.replies || "");
  }, []);

  const [value, setValue] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [fileURLs, setFileURLs] = useState<{ name: string; url: string }[]>([]);

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileList = Array.from(files);
      setImages(fileList);

      const newContent: Promise<string>[] = fileList.map((file) => {
        if (file.type.startsWith("image/")) {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const img = `<img src="${reader.result}" alt="${file.name}" />`;
              resolve(img);
            };
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsDataURL(file);
          });
        } else {
          const url = URL.createObjectURL(file);
          setFileURLs((prev) => ({ ...prev, [file.name]: url }));

          return Promise.resolve(
            `<a href="${url}" target="_blank">${file.name}</a>`
          );
        }
      });

      Promise.all(newContent)
        .then((contentArray) => {
          setEditContent((prevContent) => prevContent + contentArray.join(""));
        })
        .catch((error) => {
          console.error("Error processing files:", error);
        });
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("content", editContent);
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          formData.append("files", images[i]);
        }
      }

      const response = await baseInstance.patch(`/updates/${id}`, formData);
      if (response.status === 200) {
        successToastingFunction(response.data.message);
        setOpen(false);
        setIsModalOpen(false);
        productFlowId ? fetchProductFlowUpdateData(productFlowId) : "";
        amendmentId ? fetchAmendmentUpdateData(amendmentId) : "";
        customerId ? fetchEditorData(customerId) : "";
        leadId ? fetchLeadsEditorData(leadId) : "";
        orderId ? fetchOrderEditorData(orderId) : "";
        technicalId ? fetchTechnicalUpdateData(technicalId) : "";
        copywriterId ? fetchCopywriterUpdateData(copywriterId) : "";
        websiteContentId ? fetchWebsiteContentUpdateData(websiteContentId) : "";
      }
    } catch (error: any) {
      if (
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.message
      ) {
        errorToastingFunction(error?.response?.data?.message);
        setOpen(false);
      }
    }
  };

  // useEffect(() => {
  //   return () => {
  //     fileURLs.forEach((file) => URL.revokeObjectURL(file.url));
  //   };
  // }, [fileURLs]);
  useEffect(() => {
    return () => {
      if (Array.isArray(fileURLs)) {
        fileURLs.forEach((file) => {
          if (file && file.url) {
            URL.revokeObjectURL(file.url);
          }
        });
      }
    };
  }, [fileURLs]);

  const imageHandler = () => {
    const inputImage = document.createElement("input");
    inputImage.type = "file";
    inputImage.accept = "image/*, video/*, .pdf, .xlsx, .doc, .docx";
    inputImage.multiple = true;
    inputImage.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      handleFileUpload(target.files);
    };
    inputImage.click();
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ size: ["small", false, "large", "huge"] }],
    // ["image"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
  ];

  const options = {
    debug: "info",
    modules: {
      toolbar: toolbarOptions,
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    },
    placeholder: "Compose an epic...",
    theme: "snow",
  };

  // useEffect(() => {
  //   fetchUsersData();
  // }, [fetchUsersData]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex items-center">
          <Pencil2Icon className="h-6 w-7 py-1 mr-1 text-gray-700 rounded-sm cursor-pointer hover:bg-[#29354f] hover:text-[white] " />
          <span className="text-gray-700 text-[0.8rem] ml-2">Edit</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1300px]">
        <div className="p-8">
          <div className="cursor-pointer"></div>

          <div></div>
          <div className="w-full">
            <Tabs defaultValue="updates" className="w-full">
              <TabsContent value="updates">
                <Card className="boxShadow">
                  <CardHeader>
                    <CardTitle>Updates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ReactQuill
                      theme={options.theme}
                      modules={options.modules}
                      // onChange={handleContentChange}
                      value={editContent}
                      onChange={(content: string) => setEditContent(content)}
                    />

                    <div className="flex justify-start gap-4">
                      <div className="flex gap-2 w-fit items-center">
                        <div onClick={handleUpdate}>
                          <Button className=" py-1">Update</Button>
                        </div>
                        <TooltipCommon text="Add Files">
                          <div
                            className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"
                            onClick={imageHandler}
                          >
                            <AddFilesDarkUIconSVG />
                          </div>
                        </TooltipCommon>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditChatModel;
