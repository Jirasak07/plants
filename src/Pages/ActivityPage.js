import { Button, DataLineageIcon } from "evergreen-ui";
import { MDBDataTableV5 } from "mdbreact";
import React from "react";
import { useNavigate } from "react-router-dom";

function ActivityPage() {
    const nav = useNavigate()
  return (
    <div className="container-fluid">
      <div className="bg-white p-3" style={{ borderRadius: "5px" }}>
        <div className="d-flex justify-content-end">
          <Button
            appearance="primary"
            intent="success"
            iconBefore={<DataLineageIcon />}
            onClick={()=>{nav('/active/add')}}
          >
            เพิ่มข่าวกิจกรรม
          </Button>{" "}
        </div>
        <div>
          <MDBDataTableV5 />
        </div>
      </div>
    </div>
  );
}

export default ActivityPage;
