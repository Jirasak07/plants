import {
  MDBDataTableV5,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
} from "mdbreact";
import React, { useEffect, useState } from "react";
import { Button, Dialog, Overlay, Pane, TextInputField } from "evergreen-ui";
import Swal from "sweetalert2";
import "./User.css";
import axios from "axios";
import { API } from "../configUrl";
function User() {
  const [table, setTable] = useState([]);
  const [users, setUsers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [input, setInput] = useState([]);
  const toggleAdd = () => {
    setOpenAdd(false);
  };
  useEffect(() => {
    const fakeUsers = [];
    for (let i = 1; i <= 100; i++) {
      fakeUsers.push({
        id: i,
        firstName: `ชื่อ${i}`,
        lastName: `นามสกุล${i}`,
        age: Math.floor(Math.random() * 40) + 18,
      });
    }
    setUsers(fakeUsers);
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
          label: "นามสกุล",
          field: "lname",
        },
        {
          label: "อายุ",
          field: "age",
        },
        {
          label: "จัดการ",
          field: "manage",
        },
      ],
      rows: [
        ...fakeUsers.map((i) => ({
          no: i.id,
          name: i.firstName,
          lname: i.lastName,
          age: i.age,
          manage: (
            <div>
              <div
                className="btn-warning btn btn-sm"
                onClick={() => EditUser(i.id, i.firstName)}
              >
                แก้ไข
              </div>
            </div>
          ),
        })),
      ],
    });
  }, []);
  const [loading, setLoading] = useState(false);
  const EditUser = async (id, name) => {
    Swal.fire({
      icon: "info",
      title: "ท่านต้องการแก้ไขสิทธิ์ของ" + name + "หรือไม่ ",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      showCancelButton: true,
      cancelButtonColor: "#d90429",
      confirmButtonColor: "#38b000",
    }).then((res) => {
      if (res.isConfirmed === true) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "แก้ไขเสร็จสิ้น",
          });
        }, 2000);
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
    setLoading(true);
    try {
      const sentRequest = await axios.post(API + "/User/AddUser", {
        name: input.fname + " " + input.lname,
        username: input.username,
        password: input.password,
        citizen: input.citizen,
        tell: input.tell,
        organize: input.oganize,
      });
      const response = sentRequest.data;
      if (response === "success") {
        setLoading(false);
        Swal.fire({
          icon: "question",
          title: JSON.stringify(input),
        });
      }
    } catch (error) {}
  };
  return (
    <div className="container-md   ">
      <Overlay isShown={loading}>
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
        <MDBDataTableV5 data={table} sortable={false} />
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
