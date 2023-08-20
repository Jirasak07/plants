import axios from "axios";
import {
  Alert,
  Button,
  FileCard,
  FilePicker,
  FileUploader,
  FloppyDiskIcon,
  Image,
  Overlay,
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
import { API } from "../configUrl";
import Swal from "sweetalert2";
import "./active.css";

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
  const [loading, setLoading] = useState(false);
  const Submit = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(otherFile);
    const frmd = new FormData();
    frmd.append("title", activeName);
    frmd.append("ac_detail", activeDeatil);
    frmd.append("user_id", localStorage.getItem("user_id"));
    frmd.append("ac_file", otherFile);
    axios.post(API + "/News/AddActiv", frmd).then((res) => {
      const respon = res.data;
      if (respon.message === "success") {
        const id = respon.data;
        var i = 0;
        var count = 0;
        const max = selectedImages.length;
        if (selectedImages.length > 0) {
          for (i = 0; i < selectedImages.length; i++) {
            count = count + 1;
            const frmImg = new FormData();
            frmImg.append("img", selectedImages[i]);
            frmImg.append("ac_id", id);
            axios
              .post(API + "/News/AddImgNews", frmImg)
              .then((res) => {
                console.log(count);
                if (res.data === "success" && count === max) {
                  setLoading(false);
                  Swal.fire({
                    icon: "success",
                    title: "Success",
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false,
                  });
                }
              })
              .then((res) => {
                nav("/active");
              });
          }
        }else{
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: respon.data,
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then((res)=>{
            nav("/active");
          })
        }
      } else if (respon === "error") {
        Swal.fire({
          icon: "error",
          title: "ไม่สำเร็จ",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: respon,
        });
      }
    });
  };

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
      <Overlay isShown={loading} shouldCloseOnClick={false}>
        <div class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Overlay>
      <form
        onSubmit={Submit}
        className="form row d-flex "
        style={{ maxWidth: "654px" }}
      >
        <div className="col-12">
          <TextInputField
            label="ชื่อกิจกรรม"
            value={activeName}
            // placeholder="ชื่อ"
            required
            onChange={(e) => setActiveName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <TextareaField
            label="เนื้อหากิจกรรม"
            required
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
          <FilePicker accept={".pdf"} label="" onChange={manageFile} />
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
              accept={"image/png, image/jpg, image/jpeg"}
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
            type="submit"
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
