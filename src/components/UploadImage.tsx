"use client";
import { IKContext, IKUpload } from "imagekitio-react";
import { IKUploadProps } from "imagekitio-react/dist/types/components/IKUpload/props";

export default function UploadImage(props: IKUploadProps) {
  return (
    <>
      <IKContext
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGE_KIT_ENDPOINT}
        publicKey={process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC}
        authenticator={async () => {
          const response = await fetch("/api/imagekit/auth");
          return await response.json();
        }}
      >
        <IKUpload {...props} />
      </IKContext>
    </>
  );
}
