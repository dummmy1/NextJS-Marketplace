export type SimplifiedUpload = {
  url: string;
  fileId: string;
  fileType?: string;
};

export default function UploadThumbnail({ file }: { file: SimplifiedUpload }) {
  if (file.fileType === "image") {
    return <img src={file.url + "?tr=w=50,h=50"} />;
  }
  return <div>{file.url} &raquo;</div>;
}
