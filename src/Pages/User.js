import { MDBDataTableV5 } from "mdbreact";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Overlay,
  Pane,
  ShieldIcon,
  TextInputField,
  UserIcon,
} from "evergreen-ui";
import Swal from "sweetalert2";
import "./User.css";
import axios from "axios";
import { API } from "../configUrl";
function User() {
  const [table, setTable] = useState([]);
  const [users, setUsers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [input, setInput] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const getUser = async () => {
    try {
      const get = await axios.get(API + "/User/getUser");
      const data = get.data;
      setUsers(data);
      setIsReady(true); // เมื่อได้ข้อมูลแล้วให้ตั้งค่า isReady เป็น true
    } catch (error) {
      // จัดการเมื่อเกิดข้อผิดพลาด
    }
  };
  const setTables = async () => {
    try {
      setTable({
        columns: [
          {
            label: "รหัสผู้ใช้",
            field: "no",
          },
          {
            label: "ชื่อ",
            field: "name",
          },
          {
            label: "สังกัด",
            field: "oga",
          },
          {
            label: "เบอร์โทรศัพท์",
            field: "tell",
          },
          {
            label: "สถานะ",
            field: "status",
          },
          {
            label: "สิทธิ์",
            field: "role",
          },
          {
            label: "จัดการ",
            field: "manage",
          },
        ],
        rows: [
          ...users.map((i) => ({
            no: i.user_id,
            name: i.name,
            oga: i.organization,
            tell: i.tell_number,
            status: (
              <div className={i.status === 1 ? "text-success" : "text-danger"}>
                {i.status === 1 ? "ใช้งานปกติ" : "ไม่ได้รับสิทธิ์"}
              </div>
            ),
            role: <div> {i.user_role === 1 ? "Admin" : "ผู้ใช้งาน"} </div>,
            manage: (
              <div className="d-flex " style={{ gap: "10px" }}>
                <UserIcon
                  size={20}
                  color="blue"
                  className="ic"
                  onClick={() => EditUser(i.user_id, i.name, i.user_role)}
                />
                <ShieldIcon
                  size={20}
                  color="green"
                  className="ic"
                  onClick={() => EditRole(i.user_id, i.name, i.status)}
                />
              </div>
            ),
          })),
        ],
      });
      console.log(users);
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (isReady) {
      setTables();
    }
  }, [isReady]);

  const [loading, setLoading] = useState(false);
  const EditUser = (id, name, role) => {
      Swal.fire({
        icon: "info",
        text: `ท่านต้องการเปลี่ยน${name}เป็น${
          role === 1 ? "ผู้ใช้" : "Admin"
        }หรือไม่ `,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        showCancelButton: true,
        cancelButtonColor: "#d90429",
        confirmButtonColor: "#38b000",
      }).then((res) => {
        if (res.isConfirmed === true) {
          setLoading(true);
          axios
            .post(API + "/User/EditAuth", {
              user_role: role===1? 2:1,
              id: id,
            })
            .then((d) => {
              if (d.data === "success") {
                setLoading(false);
                Swal.fire({
                  icon: "success",
                  title: "แก้ไขเสร็จสิ้น",
                }).then((rr)=>{
                  window.location.reload()
                })
              }
            });

          // if ( === "success") {
          //   setTimeout(() => {
          //     setLoading(false);
          //
          //   }, 2000);
          // }
        }
      });
  };
  const EditRole = (id, name, role) => {
      Swal.fire({
        icon: "info",
        text: `ท่านต้องการเปลี่ยนสิทธิ์ใช้งานของ${name}เป็น${
          role === 1 ? "ยกเลิกสิทธิ์" : "ให้สิทธิ์"
        }หรือไม่ `,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        showCancelButton: true,
        cancelButtonColor: "#d90429",
        confirmButtonColor: "#38b000",
      }).then((res) => {
        if (res.isConfirmed === true) {
          setLoading(true);
          axios
            .post(API + "/User/EditRole", {
              status: role===1? 0:1,
              id: id,
            })
            .then((d) => {
              if (d.data === "success") {
                setLoading(false);
                Swal.fire({
                  icon: "success",
                  title: "แก้ไขเสร็จสิ้น",
                }).then((rr)=>{
                  window.location.reload()
                })
              }
            });

          // if ( === "success") {
          //   setTimeout(() => {
          //     setLoading(false);
          //
          //   }, 2000);
          // }
        }
      });
  };
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const sentRequest = await axios.post(API + "/User/AddUser", {
        name: input.fname + " " + input.lname,
        username: input.username,
        password: input.password,
        citizen: input.citizen,
        tell: input.tell,
        organize: input.oganize,
      });
      const response = sentRequest.data;
      console.log(response)
      if (response === "success") {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "เพิ่มผู้ใช้สำเร็จ",
        }).then((e) => {
          setOpenAdd(false);
          window.location.reload();
        });
      }
    } catch (error) {}
  };
  return (
    <div className="container-md   ">
      <Overlay isShown={loading}>
        <div className="lds-spinner">
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

      <div className="bg-white rounded p-2">
        <div className="d-flex justify-content-end">
          <Button
            appearance="primary"
            intent=""
            onClick={() => setOpenAdd(true)}
          >
            เพิ่มผู้ใช้งานใหม่
          </Button>
        </div>
        <MDBDataTableV5 responsive data={table} sortable={false} />
      </div>
      <Dialog
        header="เพิ่มผู้ใช้ใหม่"
        hasFooter={false}
        isShown={openAdd}
        onCloseComplete={() => setOpenAdd(false)}
      >
        <form onSubmit={onSubmit}>
          <Pane className="formuser ">
            <TextInputField
              width="100%"
              autoFocus
              label="ชื่อ"
              name="fname"
              onChange={onChange}
              required
            />
            <TextInputField
              width="100%"
              label="นามสกุล"
              name="lname"
              onChange={onChange}
              required
            />
            <TextInputField
              width="100%"
              label="ชื่อผู้ใช้"
              name="username"
              onChange={onChange}
              required
            />
            <TextInputField
              width="100%"
              label="รหัสผ่าน"
              name="password"
              onChange={onChange}
              required
            />
            <TextInputField
              width="100%"
              label="เลขบัตรประชาชน"
              name="citizen"
              onChange={onChange}
              required
              type="number"
            />
            <TextInputField
              width="100%"
              label="เบอร์โทรศัพท์"
              name="tell"
              onChange={onChange}
              required
              type="number"
            />
            <TextInputField
              width="100%"
              label="หน่วยงาน/สังกัด"
              name="oganize"
              onChange={onChange}
              required
              // type="number"
            />
          </Pane>
          <Button
            appearance="primary"
            intent="success"
            width="100%"
            type="submit"
          >
            บันทึก
          </Button>
        </form>
      </Dialog>
    </div>
  );
}

export default User;
