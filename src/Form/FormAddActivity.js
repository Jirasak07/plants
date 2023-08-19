import {
  Alert,
  Button,
  FileCard,
  FilePicker,
  FileUploader,
  FloppyDiskIcon,
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
    console.log(files);
  };
  return (
    <div
      className="container-md bg-white d-flex flex-column align-items-center p-3"
      style={{ borderRadius: "5px" }}
    >
      <form
        onSubmit={Submit}
        className="form row d-flex "
        style={{ maxWidth: "654px" }}
      >
        <div className="col-12">
          <TextInputField label="ชื่อกิจกรรม" value={activeName} onChange={(e)=>setActiveName(e.target.value)} />
        </div>
        <div className="col-12">
          <TextareaField label="เนื้อหากิจกรรม" />
        </div>
        <div className="col-12">
          <label
            htmlFor=""
            style={{ fontSize: "13px", fontWeight: "600" }}
            className="mt-2"
          >
            ไฟล์เพิ่มเติม
          </label>
          <FilePicker label="" />
        </div>

        <Pane maxWidth={654} width="100%" className="px-3 mt-2">
          <FileUploader
            acceptedMimeTypes={acceptedMimeTypes}
            label="รูปภาพกิจกรรม"
            description="Images can be up to 5MB. You can upload .jpg .jpeg .png file formats."
            disabled={files.length + fileRejections.length >= maxFiles}
            maxSizeInBytes={maxSizeInBytes}
            //   maxFiles={maxFiles}
            onAccepted={setFiles}
            onRejected={setFileRejections}
            renderFile={(file, index) => {
              const { name, size, type } = file;
              const renderFileCountError =
                index === 0 && fileCountOverLimit > 0;

              // We're displaying an <Alert /> component to aggregate files rejected for being over the maxFiles limit,
              // so don't show those errors individually on each <FileCard />
              const fileRejection = fileRejections.find(
                (fileRejection) =>
                  fileRejection.file === file &&
                  fileRejection.reason !== FileRejectionReason.OverFileLimit
              );
              const { message } = fileRejection || {};

              return (
                <React.Fragment key={`${file.name}-${index}`}>
                  {renderFileCountError && (
                    <Alert
                      intent="danger"
                      marginBottom={majorScale(2)}
                      title={fileCountError}
                    />
                  )}
                  <FileCard
                    isInvalid={fileRejection != null}
                    name={name}
                    onRemove={() => handleRemove(file)}
                    sizeInBytes={size}
                    type={type}
                    validationMessage={message}
                  />
                </React.Fragment>
              );
            }}
            values={values}
          />
        </Pane>
        <div className="d-flex flex-row w-100" style={{ gap: "10px" }}>
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
