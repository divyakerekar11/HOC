// import React, { useRef, useState, useEffect } from "react";
// import ReactQuill, { Quill } from "react-quill";
// import axios from "axios";
// import "react-quill/dist/quill.snow.css";

// const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;

// const QuillClipboard = Quill.import("modules/clipboard");

// class Clipboard extends QuillClipboard {
//   getMetaTagElements = (stringContent) => {
//     const el = document.createElement("div");
//     el.innerHTML = stringContent;
//     return el.getElementsByTagName("meta");
//   };

//   async onPaste(e) {
//     let clipboardData = e.clipboardData || window.clipboardData;
//     let pastedData = await clipboardData.getData("Text");

//     const urlMatches = pastedData.match(/\b(http|https)?:\/\/\S+/gi) || [];
//     if (urlMatches.length > 0) {
//       e.preventDefault();
//       urlMatches.forEach((link) => {
//         axios
//           .get(link)
//           .then((payload) => {
//             let title, image, url;
//             for (let node of this.getMetaTagElements(payload)) {
//               if (node.getAttribute("property") === "og:title") {
//                 title = node.getAttribute("content");
//               }
//               if (node.getAttribute("property") === "og:image") {
//                 image = node.getAttribute("content");
//               }
//               if (node.getAttribute("property") === "og:url") {
//                 url = node.getAttribute("content");
//               }
//             }

//             const rendered = `<a href=${url} target="_blank"><div><img src=${image} alt=${title} width="20%"/><span>${title}</span></div></a>`;

//             let range = this.quill.getSelection();
//             let position = range ? range.index : 0;
//             this.quill.pasteHTML(position, rendered, "silent");
//             this.quill.setSelection(position + rendered.length);
//           })
//           .catch((error) => console.error(error));
//       });
//     } else {
//       super.onPaste(e);
//     }
//   }
// }

// Quill.register("modules/clipboard", Clipboard, true);

// const ImageBlot = Quill.import("blots/block/embed");

// const VideoBlot = Quill.import("blots/block/embed");

// const FileBlot = Quill.import("blots/block/embed");

// const PollBlot = Quill.import("blots/block/embed");

// const QuillEditor = ({ onEditorChange, onFilesChange, placeholder }) => {
//   const [editorHtml, setEditorHtml] = useState(
//     __ISMSIE__ ? "<p>&nbsp;</p>" : ""
//   );
//   const [files, setFiles] = useState([]);

//   const reactQuillRef = useRef(null);
//   const inputOpenImageRef = useRef(null);
//   const inputOpenVideoRef = useRef(null);
//   const inputOpenFileRef = useRef(null);

//   useEffect(() => {
//     return () => {
//       // Cleanup code on component unmount
//     };
//   }, []);

//   const handleChange = (html) => {
//     setEditorHtml(html);
//     onEditorChange(html);
//   };

//   const imageHandler = () => {
//     inputOpenImageRef.current.click();
//   };

//   const videoHandler = () => {
//     inputOpenVideoRef.current.click();
//   };

//   const fileHandler = () => {
//     inputOpenFileRef.current.click();
//   };

//   const insertImage = (e) => {
//     e.stopPropagation();
//     e.preventDefault();

//     if (
//       e.currentTarget &&
//       e.currentTarget.files &&
//       e.currentTarget.files.length > 0
//     ) {
//       const file = e.currentTarget.files[0];

//       let formData = new FormData();
//       const config = {
//         headers: { "content-type": "multipart/form-data" },
//       };
//       formData.append("file", file);

//       axios
//         .post("/api/blog/uploadfiles", formData, config)
//         .then((response) => {
//           if (response.data.success) {
//             const quill = reactQuillRef.current.getEditor();
//             quill.focus();
//             let range = quill.getSelection();
//             let position = range ? range.index : 0;

//             quill.insertEmbed(position, "image", {
//               src: "http://localhost:5000/" + response.data.url,
//               alt: response.data.fileName,
//             });
//             quill.setSelection(position + 1);

//             setFiles([...files, file]);
//             onFilesChange([...files, file]);
//           } else {
//             alert("Failed to upload file");
//           }
//         })
//         .catch((error) => {
//           console.error("Error uploading image", error);
//           alert("Failed to upload file");
//         });
//     }
//   };

//   const insertVideo = (e) => {
//     e.stopPropagation();
//     e.preventDefault();

//     if (
//       e.currentTarget &&
//       e.currentTarget.files &&
//       e.currentTarget.files.length > 0
//     ) {
//       const file = e.currentTarget.files[0];

//       let formData = new FormData();
//       const config = {
//         headers: { "content-type": "multipart/form-data" },
//       };
//       formData.append("file", file);

//       axios
//         .post("/api/blog/uploadfiles", formData, config)
//         .then((response) => {
//           if (response.data.success) {
//             const quill = reactQuillRef.current.getEditor();
//             quill.focus();
//             let range = quill.getSelection();
//             let position = range ? range.index : 0;

//             quill.insertEmbed(position, "video", {
//               src: "http://localhost:5000/" + response.data.url,
//               title: response.data.fileName,
//             });
//             quill.setSelection(position + 1);

//             setFiles([...files, file]);
//             onFilesChange([...files, file]);
//           } else {
//             alert("Failed to upload file");
//           }
//         })
//         .catch((error) => {
//           console.error("Error uploading video", error);
//           alert("Failed to upload file");
//         });
//     }
//   };

//   const insertFile = (e) => {
//     e.stopPropagation();
//     e.preventDefault();

//     if (
//       e.currentTarget &&
//       e.currentTarget.files &&
//       e.currentTarget.files.length > 0
//     ) {
//       const file = e.currentTarget.files[0];

//       let formData = new FormData();
//       const config = {
//         headers: { "content-type": "multipart/form-data" },
//       };
//       formData.append("file", file);

//       axios
//         .post("/api/blog/uploadfiles", formData, config)
//         .then((response) => {
//           if (response.data.success) {
//             const quill = reactQuillRef.current.getEditor();
//             quill.focus();
//             let range = quill.getSelection();
//             let position = range ? range.index : 0;

//             quill.insertEmbed(position, "file", response.data.fileName);
//             quill.setSelection(position + 1);

//             setFiles([...files, file]);
//             onFilesChange([...files, file]);
//           }
//         })
//         .catch((error) => {
//           console.error("Error uploading file", error);
//           alert("Failed to upload file");
//         });
//     }
//   };

//   return (
//     <div>
//       <div id="toolbar">
//         <select
//           className="ql-header"
//           defaultValue={""}
//           onChange={(e) => e.persist()}
//         >
//           <option value="1" />
//           <option value="2" />
//           <option value="" />
//         </select>
//         <button className="ql-bold" />
//         <button className="ql-italic" />
//         <button className="ql-underline" />
//         <button className="ql-strike" />
//         <button className="ql-insertImage" onClick={imageHandler}>
//           I
//         </button>
//         <button className="ql-insertVideo" onClick={videoHandler}>
//           V
//         </button>
//         <button className="ql-insertFile" onClick={fileHandler}>
//           F
//         </button>
//         <button className="ql-link" />
//         <button className="ql-code-block" />
//         <button className="ql-video" />
//         <button className="ql-blockquote" />
//         <button className="ql-clean" />
//       </div>
//       <ReactQuill
//         ref={reactQuillRef}
//         theme={"snow"}
//         onChange={handleChange}
//         modules={modules}
//         formats={formats}
//         value={editorHtml}
//         placeholder={placeholder}
//       />
//       <input
//         type="file"
//         accept="image/*"
//         ref={inputOpenImageRef}
//         style={{ display: "none" }}
//         onChange={insertImage}
//       />
//       <input
//         type="file"
//         accept="video/*"
//         ref={inputOpenVideoRef}
//         style={{ display: "none" }}
//         onChange={insertVideo}
//       />
//       <input
//         type="file"
//         accept="*"
//         ref={inputOpenFileRef}
//         style={{ display: "none" }}
//         onChange={insertFile}
//       />
//     </div>
//   );
// };

// const modules = {
//   syntax: true,
//   toolbar: {
//     container: "#toolbar",
//     handlers: {
//       insertImage: () => {},
//       insertVideo: () => {},
//       insertFile: () => {},
//       insertPoll: () => {},
//     },
//   },
// };

// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "image",
//   "video",
//   "file",
//   "link",
//   "code-block",
//   "video",
//   "blockquote",
//   "clean",
// ];

// export default QuillEditor;
