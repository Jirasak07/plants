import {
  Alert,
  Button,
  FileCard,
  FilePicker,
  FileUploader,
  FloppyDiskIcon,
  Image,
  Pane,
  TextInputField,
  TextareaField,
  TrashIcon,
  majorScale,
  rebaseFiles,
} from "evergreen-ui";
import { FileRejectionReason, MimeType } from "evergreen-ui";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormAddActivity() {
  const acceptedMimeTypes = [MimeType.jpeg, MimeType.png, MimeType.jpg];
  const maxFiles = 20;
  const maxSizeInBytes = 5 * 1024 ** 2; // 50 MB
  const [files, setFiles] = React.useState([]);
  const [fileRejections, setFileRejections] = React.useState([]);
  const nav = useNavigate();
  const [activeName, setActiveName] = useState();
  const [activeDeatil, setActiveDetail] = useState();
  const [otherFile, setOtherFile] = useState([]);
  const values = React.useMemo(
    () => [
      ...files,
      ...fileRejections.map((fileRejection) => fileRejection.file),
    ],
    [files, fileRejections]
  );
  const handleRemove = React.useCallback(
    (file) => {
      const updatedFiles = files.filter(
        (existingFile) => existingFile !== file
      );
      const updatedFileRejections = fileRejections.filter(
        (fileRejection) => fileRejection.file !== file
      );

      // Call rebaseFiles to ensure accepted + rejected files are in sync (some might have previously been
      // rejected for being over the file count limit, but might be under the limit now!)
      const { accepted, rejected } = rebaseFiles(
        [
          ...updatedFiles,
          ...updatedFileRejections.map((fileRejection) => fileRejection.file),
        ],
        { acceptedMimeTypes, maxFiles, maxSizeInBytes }
      );

      setFiles(accepted);
      setFileRejections(rejected);
    },
    [acceptedMimeTypes, files, fileRejections, maxFiles, maxSizeInBytes]
  );

  const fileCountOverLimit = files.length + fileRejections.length - maxFiles;
  const fileCountError = `You can upload up to 20 files. Please remove ${fileCountOverLimit} ${
    fileCountOverLimit === 1 ? "file" : "files"
  }.`;
  const Submit = (e) => {
    e.preventDefault();
    console.log(selectedImages);
    // files.forEach((element) => {
    //   console.log(element);
    // });
    // const frm = new FormData();
  };
  // const [prevFile,setPrevFile] = useState(null)
  const manageFile = (e) => {
    if (e.length > 0) {
      const ffiillee = e[0];
      setOtherFile(ffiillee);
    } else {
      setOtherFile(null);
    }
  };

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (files) => {
    // รับรายการไฟล์ที่ถูกเลือกจาก FilePicker
    setSelectedImages([...selectedImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    // คลิกปุ่มลบรูปภาพ
    const newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  };
  return (
    <div
      className="container-sm bg-white d-flex flex-column align-items-center p-3"
      style={{ borderRadius: "5px" }}
    >
      <form
        onSubmit={Submit}
        className="form row d-flex "
        style={{ maxWidth: "654px" }}
      >
        <div className="col-12">
          <TextInputField
            label="ชื่อกิจกรรม"
            value={activeName}
            onChange={(e) => setActiveName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <TextareaField
            label="เนื้อหากิจกรรม"
            value={activeDeatil}
            onChange={(e) => setActiveDetail(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label
            htmlFor=""
            style={{ fontSize: "13px", fontWeight: "600" }}
            className="mt-2"
          >
            ไฟล์เพิ่มเติม
          </label>
          <FilePicker label="" onChange={manageFile} />
        </div>
        <div className="col-12 mt-3">
          <div>
            <label
              htmlFor=""
              style={{ fontSize: "13px", fontWeight: "600" }}
              className="mt-2"
            >
              รูปภาพกิจกรรม
            </label>
            <FilePicker
              multiple
              onChange={handleImageChange}
              placeholder="คลิกเพื่อเลือกรูปภาพ"
            />
            <div>
              {selectedImages.map((file, index) => (
                <div key={index}>
                  <Pane
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Image ${index}`}
                      width="150"
                    />
                    <Button onClick={() => handleRemoveImage(index)}>ลบ</Button>
                  </Pane>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-row w-100 col-12 mt-3"
          style={{ gap: "10px" }}
        >
          <Button
            iconBefore={<FloppyDiskIcon />}
            appearance="primary"
            intent="success"
            width="80%"
          >
            บันทึกข่าวกิจกรรม
          </Button>
          <Button
            type="button"
            onClick={() => nav(-1)}
            iconBefore={<TrashIcon />}
            appearance="minimal"
            intent="danger"
            width="20%"
          >
            ยกเลิก
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormAddActivity;
