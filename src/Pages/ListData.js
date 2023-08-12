import { Button, Dialog } from "evergreen-ui";
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
import FromAddPlant from "../Form/FromAddPlant";

function ListData() {
  const [table, setTable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setTable({
      columns: [],
    });
  }, []);
  const submitAdd = () => {
    alert("1234");
  };
  return (
    <div className="container-md pt-2 ">
      <div className="bg-white px-3 pt-2 rounded">
        <div className="d-flex justify-content-end">
          <Button appearance="primary" style={{gap:'10px'}}  onClick={() => setIsOpen(true)}>
            <MDBIcon icon="plus-square" /> เพิ่มพืชพรรณใหม่
          </Button>
        </div>
        <MDBDataTableV5 theadColor="dark" data={table} sortable={false} />
      </div>
      <Dialog
        isShown={isOpen}
        onCloseComplete={() => setIsOpen(false)}
        hasFooter={false}
        hasHeader={false}
      >
        <FromAddPlant />
      </Dialog>
    </div>
  );
}

export default ListData;
