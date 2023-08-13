import axios from "axios";
import {
  Button,
  Dialog,
  FilePicker,
  Image,
  Pane,
  TextInputField,
} from "evergreen-ui";
import { MDBDataTableV5 } from "mdbreact";
import React, { useState } from "react";
import { API } from "../configUrl";
import Swal from "sweetalert2";

function News() {
  const [isShow, setIsShow] = useState(false);
  const [files, setFiles] = useState(null);
  const [endDate, setEndDate] = useState();
  const [title, setTitle] = useState();

  const handleUpload = () => {
    if (files) {
      const formData = new FormData();
      formData.append("file", files);
      // formData.append("name", );
      formData.append("date_end", endDate);
      formData.append("title", title);
      axios
        .post(API + "/Plant/uploadNews", formData)
        .then((response) => {
          console.log("Upload successful:", response.data);
        })
        .catch((error) => {
          console.error("Upload error:", error);
        });
    }
  };
  const handleFileChange = (files) => {
    if (files.length > 0) {
      if (
        files &&
        (files[0].type === "image/png" ||
          files[0].type === "image/jpeg" ||
          files[0].type === "image/jpg")
      ) {
        const file = files[0];
        setFiles(file);
      } else {
        Swal.fire({
          icon: "info",
          title:
            "กรุณาเลือกไฟล์รูปภาพที่เป็นประเภท png, jpg, หรือ jpeg เท่านั้น",
        }).then((res) => {
          setFiles(null);
        });
      }
    } else {
      setFiles(null);
    }
  };
  return (
    <div className="container-md">
      <Pane
        backgroundColor="white"
        minHeight={200}
        borderRadius={10}
        padding={20}
      >
        <div className="d-flex justify-content-end">
          <Button
            appearance="primary"
            intent=""
            onClick={() => setIsShow(true)}
          >
            เพิ่มข่าวประชาสัมพันธ์
          </Button>
        </div>
        <MDBDataTableV5 />
      </Pane>
      <Pane>
        <Dialog
          isShown={isShow}
          shouldCloseOnOverlayClick={false}
          onCloseComplete={() => setIsShow(false)}
          footer={
            <div className="d-flex" style={{ gap: "10px" }}>
              <Button
                appearance="primary"
                intent="success"
                onClick={handleUpload}
              >
                บันทึก
              </Button>
              <Button
                appearance="minimal"
                onClick={() => {
                  setIsShow(false);
                }}
                intent="danger"
              >
                ยกเลิก
              </Button>
            </div>
          }
        >
          <Pane className="d-flex flex-column" style={{ gap: "10px" }}>
            {/* <TextInputField  name="title" /> */}
            <Pane width="100%">
              <FilePicker
                onChange={(e) => handleFileChange(e)}
                placeholder="เลือกแบนเนอร์ประชาสัมพันธ์"
                accept=".png, .jpg, .jpeg"
                validate={(file) => {
                  const maxFileSize = 5 * 1024 * 1024; // 5 MB
                  if (file.size > maxFileSize) {
                    return "File size exceeds the limit";
                  }
                  return null;
                }}
              />
              {files && (
                <Image
                  src={URL.createObjectURL(files)}
                  alt="Preview"
                  width="100%"
                />
              )}
            </Pane>
            <TextInputField
              label="หัวข้อข่าว"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextInputField
              type="date"
              label="วันที่สิ้นสุดการประชาสัมพันธ์"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Pane>
        </Dialog>
      </Pane>
    </div>
  );
}

export default News;
