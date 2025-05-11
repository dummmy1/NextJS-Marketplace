import { UploadResponse } from "imagekit/dist/libs/interfaces";

export default function UploadThumbnail({ file }: { file: UploadResponse }) {
  if (file.fileType === "image") {
    return <img src={file.url + "?tr=w=50,h=50"} />;
  }
  return <div>{file.url} &raquo;</div>;
}
