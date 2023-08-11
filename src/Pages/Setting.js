import axios from "axios";
import React, { useEffect } from "react";

function Setting() {
  useEffect(()=>{
    axios.post("https://rspg-kpppao.com/backend/Plant/SelectTambon",{
      amphur:'714'
    }).then((res)=>{
      console.log(res.data)
    })
  },[])
  return (
    <div className="container-md">
      <div className="bg-white">setting</div>
    </div>
  );
}

export default Setting;
