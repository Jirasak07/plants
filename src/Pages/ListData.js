import {
  Button,
  CloudDownloadIcon,
  Dialog,
  DownloadIcon,
  EditIcon,
  EyeOnIcon,
  EyeOpenIcon,
} from "evergreen-ui";
import { MDBCol, MDBDataTableV5, MDBIcon } from "mdbreact";
import React, { useEffect, useState } from "react";
import FromAddPlant from "../Form/FromAddPlant";
import axios from "axios";
import { API } from "../configUrl";
import { NavLink } from "react-router-dom";
import './ListData.css'

function ListData() {


  const [table, setTable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [plant, setPlant] = useState([]);
  const getUser = async () => {
    try {
      const get = await axios.get(API + "/Plant/getPlant");
      const data = get.data;
      setPlant(data);
      setIsReady(true); // เมื่อได้ข้อมูลแล้วให้ตั้งค่า isReady เป็น true
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, []);
  const setTables = async () => {
    try {
      setTable({
        columns: [
          {
            label: "รูปภาพ",
            field: "img",
            minimal:'bee',
          },
          {
            label: "ชื่อพืชพรรณ",
            field: "name",
            minimal:'bee',
          },
          {
            label: "รหัสพรรณไม้",
            field: "plant_code",
            minimal:'bee',
          },
          {
            label: "ลักษณะวิสัย",
            field: "vis",
            minimal:'bee',
          },
          {
            label: "ลักษณะเด่นของพืช",
            field: "div",
            minimal:'sm',
            with:600
          },
          {
            label: "สถานภาพ",
            field: "status",
            minimal:'bee',
          },
          {
            label: "จัดการ",
            field: "manage",
            minimal:'bee',
          },
        ],
        rows: [
          ...plant.map((i) => ({
            img: (
              <div>
                {" "}
                <img src={API + "/" + i.img} alt="" width={100} />{" "}
              </div>
            ),
            name: i.plant_name,
            plant_code: i.plant_code,
            vis: i.plant_character,
            div: i.distinctive,
            status: i.statuss,
            manage: (
              <div className="d-flex" style={{ gap: "10px" }}>
                <a href={API+"/PlantPD.php/?id="+i.plant_id} target="_blank" >
                  <CloudDownloadIcon
                    className="ic"
                    color="green500"
                    size={20}
                  />
                </a>

                <NavLink to={"/detail/" + i.plant_id}>
                  <EyeOpenIcon className="ic" size={20} color="orange500" />
                </NavLink>
              </div>
            ),
          })),
        ],
      });
    } catch (error) {}
  };
  useEffect(() => {
    if (isReady) {
      setTables();
    }
  }, [isReady]);
  return (
    <div className="container-fluid pt-2 ">
      <div className="bg-white px-3 pt-2 rounded">
        <div className="d-flex justify-content-end">
          <Button
            disabled={localStorage.getItem('user_id')===null? true:false}
            appearance="primary"
            style={{ gap: "10px" }}
            onClick={() => setIsOpen(true)}
    // disabled={true}
          >
            <MDBIcon icon="plus-square" /> เพิ่มพืชพรรณใหม่
          </Button>
        </div>
        <MDBCol md="12" >
          <MDBDataTableV5  responsive data={table} sortable={false} className="my-datatable" /> 
        </MDBCol>
       
      </div>
      <Dialog
        isShown={isOpen}
        shouldCloseOnOverlayClick={false}
        onCloseComplete={() => setIsOpen(false)}
        hasFooter={false}
        hasHeader={true}
        width="clamp(360px,100%,60vw)"
      >
        <FromAddPlant />
      </Dialog>
    </div>
  );
}

export default ListData;
