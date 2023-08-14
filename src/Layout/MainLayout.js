import React, { useEffect, useState } from "react";
import Head from "./Head";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../configUrl";
// import { MDBFooter } from 'mdbreact';

function MainLayout() {
  const nav = useNavigate();
  const [sit, setSit] = useState(0);
  const tokens = localStorage.getItem("token");
  const check = () => {
      // console.log(tokens)
      if (tokens !=null) {
        axios.post(API + "/User/checkLogin", {
          token: tokens,
        }).then((ress)=>{
               const data = ress.data;
        // console.log(data);
        if (localStorage.getItem("username") === data.userid) {
          setSit(1);
          if (window.location.pathname === "/") {
            nav("/home");
          }
        } else {
        }
        })
   
      }else{
            const path = window.location.pathname;
      const pathsplit = path.split("/");
      if (pathsplit[1] === "detail2") {
        setSit(0);
      } else {
        setSit(0);
        nav("/home");
      }
      }
  
    }

  useEffect(() => {
    check();
  }, []);
  return (
    <div className="mainlayout container-fluid p-0">
      <Head sit={sit} />
      <div className="mt-2"></div>
      <Outlet />
    </div>
  );
}

export default MainLayout;
