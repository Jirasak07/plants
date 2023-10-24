import axios from "axios";
import {
  Button,
  Checkbox,
  DataLineageIcon,
  Dialog,
  EditIcon,
  FilePicker,
  FloppyDiskIcon,
  Overlay,
  Pane,
  TextInputField,
  TrashIcon,
} from "evergreen-ui";
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
                <a
                  className="ic text-primary"
                  onClick={() => Download(API + "/" + i.ac_file, i.ac_title)}
                >
                  ดาวน์โหลดไฟล์
                </a>
                // </a>
              ),
            username: i.name,
            manage: (
              <div className="d-flex" style={{ gap: "5px" }}>
                <div
                  className="text-warning d-flex justify-content-center ic"
                  onClick={() => OpenEdit(i.ac_id)}
                >
                  <EditIcon />
                </div>
                <div
                  className="text-danger d-flex justify-content-center ic"
                  onClick={() => Delete(i.ac_id, i.ac_title)}
                >
                  <TrashIcon />
                </div>
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
      showCancelButton: true,
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
              }).then((rere) => {
                window.location.reload();
              });
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
  const getAc = async (id) => {
    try {
      const fetch = await axios.post(API + "/News/DetailActiv", {
        id: id,
      });
      const data = fetch.data[0]
      if(data.ac_file === "-"){
        setFile("โล่ง")
      }
      console.log(data)
      setInput({
        ac_title:data.ac_title,
        ac_detail:data.ac_detail,
        ac_id:id
      })
    } catch (error) {}
  };
  const OpenEdit = (id) => {
    getAc(id);
    setIsOp(true);
  };
  const [IsOp, setIsOp] = useState(false);
  const [File, setFile] = useState("โล่ง");
  // const [Title, setTitle] = useState("");
  const [Input, setInput] = useState({
    ac_title: "",
    ac_detail: "",
    ac_file: "",
  });
  const onCHangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };
  const [Loading, setLoading] = useState(false);
  const [Dell, setDell] = useState(false);
  const Submit = (params) => {
    setLoading(true)
    const form = new FormData();
    form.append("ac_title", Input.ac_title);
    form.append("ac_detail", Input.ac_detail);
    form.append("ac_id", Input.ac_id);
    form.append("dels",Dell?"0":"-")
    form.append("user_id", localStorage.getItem('user_id'));
    if (File === "โล่ง") {
      form.append("chk", 3);
    } else if(File === "not") {
      form.append("chk",0)
    }else{
      form.append("chk", 1);
      form.append("ac_file", File);
    }
    console.log(form);
    axios.post(API + "/News/EditActive",form ).then((res) => {
      const resp = res.data;
      console.log(resp,Dell)
      setLoading(false)
      if (resp === "success") {
        Swal.fire({
          icon: "success",
          title: "แก้ไขเสร็จสิ้น",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((res) => {
          window.location.reload();
        });
      }
    });
  };
  const manageFile = (e) => {
    if (e.length > 0) {
      const ffiillee = e[0];
      setFile(ffiillee);
    } else {
      setFile("not");
    }
  };
const onCheck = (params) => {
  setDell(!Dell)
}

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

      <Dialog
        isShown={IsOp}
        onCloseComplete={() => {
          setIsOp(false);
        }}
        hasFooter={false}
      >
        <Pane>
          <TextInputField
            label="ชื่อข่าวกิจกรรม"
            name="ac_title"
            onChange={onCHangeInput}
            value={Input.ac_title}
          />
          <TextInputField
            label="เนื้อหาข่าวกิจกรรม"
            name="ac_detail"
            onChange={onCHangeInput}
            value={Input.ac_detail}
          />
          <FilePicker onChange={manageFile} />
          <div className="d-flex align-items-center">
            <Checkbox checked={Dell} onChange={onCheck} />  &nbsp; ลบไฟล์เดิม
          </div>
          
          <div className="d-flex justify-content-end py-3">
            <Button
            isLoading={Loading}
              onClick={Submit}
              iconBefore={<FloppyDiskIcon />}
              appearance="primary"
              intent="success"
            >
              บันทึกแก้ไข
            </Button>
          </div>
        </Pane>
      </Dialog>
    </div>
  );
}

export default ActivityPage;
