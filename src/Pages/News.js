import axios from "axios";
import {
  Button,
  Dialog,
  EditIcon,
  FilePicker,
  Image,
  Pane,
  TextInputField,
} from "evergreen-ui";
import { MDBDataTableV5 } from "mdbreact";
import React, { useEffect, useState } from "react";
import { API } from "../configUrl";
import Swal from "sweetalert2";

function News() {
  const [isShow, setIsShow] = useState(false);
  const [isShowE, setIsShowE] = useState(false);
  const [files, setFiles] = useState(null);
  const [endDate, setEndDate] = useState();
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const [news, setNews] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [tabel, setTable] = useState([]);
  const [newid, setNewID] = useState(null);

  const handleUpload = () => {
    if (files) {
      const formData = new FormData();
      formData.append("file", files);
      // formData.append("name", );
      formData.append("enddate", endDate);
      formData.append("title", title);
      formData.append("url", url);
      axios
        .post(API + "/News/AddNews", formData)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "เพิ่มข่าวประชาสัมพันธ์เสร็จสิ้น",
          }).then((res) => {
            window.location.reload();
          });
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
  const getNeww = async () => {
    try {
      const getNew = await axios.get(API + "/News/getNewTable");
      const news = getNew.data;
      setNews(news);
      setIsReady(true);
    } catch (error) {}
  };
  useEffect(() => {
    getNeww();
  }, []);
  useEffect(() => {
    if (isReady) {
      setTable({
        columns: [
          {
            label: "รูปตัวอย่าง",
            field: "img",
            // width:'200'
          },
          {
            label: "หัวข้อข่าว",
            field: "title",
          },
          {
            label: "ลิงค์ข่าว",
            field: "url",
          },
          {
            label: "วันที่เพิ่ม",
            field: "start",
          },
          {
            label: "วันที่สิ้นสุด",
            field: "end",
          },
          {
            label: "จัดการ",
            field: "manage",
          },
        ],
        rows: [
          ...news.map((i) => ({
            img: (
              <div>
                {" "}
                <img
                  src={API + "/" + i.image_news}
                  alt=""
                  width={"100px"}
                />{" "}
              </div>
            ),
            title: i.news_title,
            url: i.url_news,
            start: formatDate(i.news_start),
            end: formatDate(i.news_end),
            manage: (
              <div>
                <EditIcon
                  size={20}
                  className="ic"
                  color="orange500"
                  onClick={() => EditNew(i.news_id)}
                />
              </div>
            ),
          })),
        ],
      });
    }
  }, [isReady]);
  const formatDate = (val) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(val);
    const tran = date.toLocaleDateString("TH-th", options);
    return tran;
  };
  const [currTitle,setCurrTitle]=useState()
  const [currUrl,setCurrUrl]=useState()
  const [currDate,setCurrDate]=useState()
  const EditNew = (val) => {
    setNewID(val);
    axios.post(API+"/News/getEditNews",{
      news_id:val
    }).then((res)=>{
      const data = res.data[0]
      setCurrDate(data.news_end)
      setCurrTitle(data.news_title)
      setCurrUrl(data.url_news)
    })
    setIsShowE(true);
  };
  const submit = ()=>{
    axios.post(API+"/News/EditNews",{
      news_id:newid,
      news_title:currTitle,
      news_end:currDate,
      url_news:currUrl
    }).then((res)=>{
      Swal.fire({
        icon:'success',
        title:'แก้ไขเสร็จสิ้น'
      }).then((d)=>{
        window.location.reload()
      })
    })
  }
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
        <MDBDataTableV5 responsive sortable={false} data={tabel} />
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
                placeholder="เลือกแบนเนอร์ประชาสัมพันธ์ (970 X 240 pixel)"
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
              label="url ข่าวประชาสัมพัธ์"
              onChange={(e) => setUrl(e.target.value)}
            />
            <TextInputField
              type="date"
              label="วันที่สิ้นสุดการประชาสัมพันธ์"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Pane>
        </Dialog>
      </Pane>
      <Pane>
        <Dialog
          isShown={isShowE}
          shouldCloseOnOverlayClick={false}
          onCloseComplete={() => {
            setIsShowE(false);
          }}
          footer={
            <div className="d-flex" style={{ gap: "10px" }}>
              <Button
                appearance="primary"
                intent="success"
                onClick={submit}
              >
                บันทึก
              </Button>
              <Button
                appearance="minimal"
                onClick={() => {
                  setIsShowE(false);
                }}
                intent="danger"
              >
                ยกเลิก
              </Button>
            </div>
          }
        >
          <TextInputField
            label="หัวข้อข่าว"
            onChange={(e) => setCurrTitle(e.target.value)}
            value={currTitle}
          />
          <TextInputField
            label="url ข่าวประชาสัมพัธ์"
            onChange={(e) => setCurrUrl(e.target.value)}
            value={currUrl}
          />
          <TextInputField

            type="date"
            label="วันที่สิ้นสุดการประชาสัมพันธ์"
            value={currDate}
            onChange={(e) => setCurrDate(e.target.value)}
          />
        </Dialog>
      </Pane>
    </div>
  );
}

export default News;
