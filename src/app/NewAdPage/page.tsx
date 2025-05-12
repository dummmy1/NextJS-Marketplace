"use client";
import AdInputs from "@/components/AdInputs";
import SubmitButton from "@/components/SubmitButton";
import UploadImage from "@/components/UploadImage";
import UploadThumbnail from "@/components/UploadThumbnail";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAdPage() {
  type MyUploadResponse = {
    fileId: string;
    name: string;
    url: string;
    thumbnailUrl?: string;
    [key: string]: any;
  };

  const [files, setFiles] = useState<MyUploadResponse[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInRef = createRef();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const file = files[0];

    const formData = new FormData(e.currentTarget);
    const payload = {
      title: formData.get("title"),
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category"),
      description: formData.get("description"),
      contact: formData.get("contact"),
      imageUrl: file.url,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/ads/[id]`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      alert("Ad created!");
      router.push("/account");
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-screen-lg mx-auto grid grid-cols-2 gap-4 whitespace-normal"
    >
      <div className="grow pt-10">
        <div className="bg-gray-200 p-4 rounded mr-6">
          <div className="flex flex-col">
            <FontAwesomeIcon icon={faImage} className="text-8xl" />
            <label
              onClick={() => console.log(fileInRef)}
              className={
                "upload-btn border text-semibold text-center px-4 py-3 rounded mx-2 justify" +
                (isUploading
                  ? " cursor-not-allowed"
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
