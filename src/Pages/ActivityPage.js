import axios from "axios";
import { Button, DataLineageIcon, Overlay, TrashIcon } from "evergreen-ui";
import { MDBDataTableV5 } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../configUrl";
import Swal from "sweetalert2";
import "../Form/active.css";

function ActivityPage() {
  const nav = useNavigate();
  const [chkfetch, setChkFetch] = useState(false);
  const [table, setTable] = useState([]);
  const [data, setData] = useState([]);
  const fetchActiv = async () => {
    try {
      const ft = await axios.get(API + "/News/getActivity");
      const data = ft.data;
      setData(data);
      setChkFetch(true);
    } catch (error) {}
  };
  useEffect(() => {
    fetchActiv();
  }, []);
  useEffect(() => {
    if (chkfetch === true) {
      setTable({
        columns: [
          {
            label: "หัวข้อกิจจกรม",
            field: "name",
          },
          {
            label: "วันที่เพิ่ม",
            field: "date",
          },
          {
            label: "ไฟล์",
            field: "file",
          },
          {
            label: "ผู้เพิ่มข้อมูล",
            field: "username",
          },
          {
            label: "จัดการ",
            field: "manage",
          },
        ],
        rows: [
          ...data.map((i) => ({
            name: i.ac_title,
            date: i.ac_date,
            file:
              i.ac_file === "-" ? (
                <>ไม่พบไฟล์</>
              ) : (
                // <a href={API + i.ac_file} target="_blank" download={i.ac_title}>
                <a className="ic text-primary"
                  onClick={() => Download(API + "/" + i.ac_file, i.ac_title)}
                >
                  ดาวน์โหลดไฟล์{" "}
                </a>
                // </a>
              ),
            username: i.name,
            manage: (
              <div
                className="text-danger d-flex justify-content-center ic"
                onClick={() => Delete(i.ac_id, i.ac_title)}
              >
                {" "}
                <TrashIcon />{" "}
              </div>
            ),
          })),
        ],
      });
    }
  }, [chkfetch]);
  const [ld, setLd] = useState(false);
  const Delete = async (val, title) => {
    Swal.fire({
      icon: "info",
      title: `ท่านต้องการลบกิจกรรม ${title} หรือไม่ ?`,
      showCancelButton:true
    }).then((res) => {
      if (res.isConfirmed === true) {
        setLd(true);
        axios
          .post(API + "/News/DeleteActiv", {
            id: val,
          })
          .then((resss) => {
            const respon = resss.data;
            if (respon === "success") {
              setLd(false);
              Swal.fire({
                icon: "success",
                title: "Delete Success",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
              }).then((rere)=>{
                window.location.reload()
              })
            }
          });
      }
    });
  };
  const Download = (url, title) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = title;
    link.target = "_blank"; // เปิดลิงค์ในหน้าต่างใหม่ (อัปเดต: อาจจะไม่จำเป็นตามบราวเซอร์)
    link.click();
  };
  return (
    <div className="container-fluid">
      <Overlay isShown={ld} shouldCloseOnClick={false}>
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
      <div className="bg-white p-3" style={{ borderRadius: "5px" }}>
        <div className="d-flex justify-content-end">
          <Button
            appearance="primary"
            intent="success"
            iconBefore={<DataLineageIcon />}
            onClick={() => {
              nav("/active/add");
            }}
          >
            เพิ่มข่าวกิจกรรม
          </Button>
        </div>
        <div>
          <MDBDataTableV5 responsiveMd sortable={false} data={table} />
        </div>
      </div>
    </div>
  );
}

export default ActivityPage;
