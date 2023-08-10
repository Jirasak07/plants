import {
  MDBDataTableV5,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
} from "mdbreact";
import React, { useEffect, useState } from "react";
import {Overlay} from 'evergreen-ui'
import Swal from "sweetalert2";
import './User.css'
function User() {
  const [table, setTable] = useState([]);
  const [users, setUsers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
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
            icon:'success',
            title:'แก้ไขเสร็จสิ้น'
        })
        }, 2000);
      }
    });
  };
  return (
    <div className="container-md   ">
      <Overlay isShown={loading} >
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
      <div className="d-flex justify-content-end">
        {" "}
        <div className="btn-info btn" onClick={() => setOpenAdd(true)}>
          เพิ่มผู้ใช้งานใหม่
        </div>{" "}
      </div>
      <div className="bg-white rounded">
        <MDBDataTableV5 data={table} sortable={false} />
      </div>
      <MDBModal isOpen={openAdd} toggle={toggleAdd}>
        <MDBModalHeader toggle={toggleAdd}></MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="ชื่อ-นามสกุล" />
          <MDBInput label="username" />
          <MDBInput label="password" />
        </MDBModalBody>
        <MDBModalFooter>
          <div>
            <div className="btn btn-success w-100">บันทึก</div>
          </div>
        </MDBModalFooter>
      </MDBModal>
    </div>
  );
}

export default User;
