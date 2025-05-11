"use client";
import AdInputs from "@/components/AdInputs";
import SubmitButton from "@/components/SubmitButton";
import UploadImage from "@/components/UploadImage";
import UploadThumbnail from "@/components/UploadThumbnail";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Children, createRef, useState } from "react";

export default function NewAdPage() {
  type MyUploadResponse = {
    fileId: string;
    name: string;
    url: string;
    thumbnailUrl?: string;
    [key: string]: any;
  };

  const [files, setFiles] = useState<MyUploadResponse[]>([]);
  const fileInRef = createRef();

  const [isUploading, setIsUploading] = useState(false);

  return (
    <form className="max-w-screen-lg mx-auto grid grid-cols-2 gap-4 whitespace-normal">
      <div className="grow pt-10">
        <div className="bg-gray-200 p-4 rounded mr-6">
          <div className="flex flex-col">
            <FontAwesomeIcon icon={faImage} className="text-8xl" />

            <label
              onClick={() => console.log(fileInRef)}
              className={
                "upload-btn border text-semibold text-center px-4 py-3 rounded mx-2 justify" +
                (isUploading
                  ? "cursor-not-allowed"
                  : " border-blue-600 text-blue-500 cursor-pointer ")
              }
            >
              <UploadImage
                className="text-wrap"
                onUploadStart={() => setIsUploading(true)}
                ref={fileInRef}
                onSuccess={(file: MyUploadResponse) => {
                  setFiles((prev) => [...prev, file]);
                  setIsUploading(false);
                }}
              />
              {isUploading ? (
                <span>Uploading...</span>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPlus} className="pr-1" />
                  <span>Add Photos</span>
                </>
              )}
            </label>
            {files.map((file) => (
              <UploadThumbnail key={file.fileId} file={file} />
            ))}
          </div>
        </div>
      </div>
      <div className="grow pt-7">
        <AdInputs />
        <SubmitButton>Publish</SubmitButton>
      </div>
    </form>
  );
}
