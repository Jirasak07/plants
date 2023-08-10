import {
  MDBDataTableV5,
  MDBIcon,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
} from "mdbreact";
import React, { useEffect, useState } from "react";

function ListData() {
  const [table, setTable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setTable({
      columns: [
     
      ],
    });
  }, []);
  const submitAdd = () => {
    alert("1234");
  };
  return (
    <div className="container-fluid pt-1 ">
      <div className="bg-white px-3">
        <div className="d-flex justify-content-end">
          {" "}
          <div className="btn btn-info " onClick={() => setIsOpen(true)}>
            {" "}
            <MDBIcon icon="plus-square" /> เพิ่มพืชพันธ์{" "}
          </div>{" "}
        </div>
        <MDBDataTableV5 theadColor="dark" data={table} sortable={false} />
      </div>
      <MDBModal isOpen={isOpen} toggle={() => setIsOpen(false)}>
        <MDBModalHeader toggle={() => setIsOpen(false)}>
          เพิ่มข้อมูลพืชพัธ์ใหม่
        </MDBModalHeader>
        <form onSubmit={submitAdd}>
          <MDBModalBody>
            <MDBInput label="label" />
            <MDBInput label="label" />
            <MDBInput label="label" />
            <MDBInput label="label" />
            <MDBInput label="label" />
          </MDBModalBody>
          <MDBModalFooter>
            <input value="บันทึก" type="submit" className="btn btn-success" />
            <div
              className="btn btn-danger "
              onClick={() => {
                setIsOpen(false);
              }}
            >
              ยกเลิก
            </div>
          </MDBModalFooter>{" "}
        </form>
      </MDBModal>
    </div>
  );
}

export default ListData;
