import { Button, Dialog, DownloadIcon, EditIcon } from "evergreen-ui";
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
import axios from "axios";
import { API } from "../configUrl";

function ListData() {
  const [table, setTable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [plant,setPlant] = useState([])
  const getUser = async()=>{
    try {
      const get = await axios.get(API + "/Plant/getPlant");
      const data = get.data;
      setPlant(data);
      console.log(data)
      setIsReady(true); // เมื่อได้ข้อมูลแล้วให้ตั้งค่า isReady เป็น true
    } catch (error) {
      
    }
  }
  const submitAdd = () => {
    alert("1234");
  };
    useEffect(() => {
    getUser();
  }, []);
const setTables=async()=>{
  try {
    setTable({
      columns:[
        {
          label: "รูปภาพ",
          field: "img",
        },
        {
          label: "ชื่อพืชพรรณ",
          field: "name",
        },
        {
          label: "รหัสพรรณไม้",
          field: "plant_code",
        },
        {
          label: "ลักษณะวิสัย",
          field: "vis",
        },
        {
          label: "ลักษณะเด่นของพืช",
          field: "div",
        },
        {
          label: "สถานภาพ",
          field: "status",
        },
        {
          label: "จัดการ",
          field: "manage",
        },
      ],
      rows:[
        ...plant.map((i)=>({
          img:<div> <img src={API+"/"+i.img} alt="" width={100} /> </div>,
          name:i.plant_name,
          plant_code:i.plant_code,
          vis:i.plant_character,
          div:i.distinctive,
          status:i.statuss,
          manage:<div className="d-flex" style={{gap:'10px'}} >
           <DownloadIcon className="ic" color="green500" size={20} />
            <EditIcon className="ic" color="orange500" />
          </div>
        }))
      ]
    })
  } catch (error) {
    
  }
}
  useEffect(() => {
    if (isReady) {
      setTables();
    }
  }, [isReady]);
  return (
    <div className="container pt-2 ">
      <div className="bg-white px-3 pt-2 rounded">
        <div className="d-flex justify-content-end">
          <Button appearance="primary" style={{gap:'10px'}}  onClick={() => setIsOpen(true)}>
            <MDBIcon icon="plus-square" /> เพิ่มพืชพรรณใหม่
          </Button>
        </div>
        <MDBDataTableV5 responsive theadColor="dark" data={table} sortable={false} />
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
