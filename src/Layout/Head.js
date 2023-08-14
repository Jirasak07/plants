import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBCol,
} from "mdbreact";
import logo from "../Assets/logoo.png";
import "./Stylelayout.css";
import { NavLink, useNavigate } from "react-router-dom";
function Head({ sit }) {
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  const [isOpen, setIsOpen] = useState(false);
  const role = localStorage.getItem("role");
  const nav = useNavigate();

  return (
    <MDBNavbar className="head" dark expand="lg">
      <MDBNavbarBrand>
        <span
          style={{ fontSize: "16px" }}
          className="ic"
          onClick={() => nav("/home")}
        >
          {" "}
          <img src={logo} alt="" width={40} /> โครงการ อพ.สธ. อบจ.กำแพงเพชร
        </span>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <NavLink
          to="/home"
          className={({ isActive, isPending }) =>
            isPending ? "bg-info" : isActive ? "navlink ac" : "navlink"
          }
        >
          <MDBIcon icon="home" /> หน้าแรก
        </NavLink>
        {sit === 1 ? (
          <NavLink
            to="/plant"
            className={({ isActive, isPending }) =>
              isPending ? "bg-info" : isActive ? "navlink ac" : "navlink"
            }
          >
            <MDBIcon icon="spa" /> พืชพรรณ
          </NavLink>
        ) : (
          <></>
        )}
        {sit === 1 ? (
          <>
            {role === "1" ? (
              <>
                <NavLink
                  to="/user"
                  className={({ isActive, isPending }) =>
                    isPending ? "bg-info" : isActive ? "navlink ac" : "navlink"
                  }
                >
                  <MDBIcon icon="user-cog" /> ผู้ใช้งาน
                </NavLink>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        {sit === 1 ? (
          <>
            {role === "1" ? (
              <>
                <MDBDropdown className=" w-100">
                  <MDBDropdownToggle
                    nav
                    caret
                    className="navlink d-flex justify-content-center "
                  >
                    <MDBIcon icon="cog" /> จัดการระบบ
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default" >
                    <NavLink to="/news" className="dd w-100">
                      เพิ่มข่าวประชาสัมพันธ์
                    </NavLink>
                    {/* <NavLink to="/plant" className="dd text-dark">
                เพิ่มข่าวประชาสัมพันธ์
              </NavLink> */}
                  </MDBDropdownMenu>
                </MDBDropdown>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}

        {sit === 1 ? (
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown className="d-none d-lg-flex">
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" /> {localStorage.getItem("name")}
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default p-2">
                  <NavLink to={"/profile"}>
                    <MDBDropdownItem className="bg-info" href="#!">
                      โปรไฟล์
                    </MDBDropdownItem>
                  </NavLink>
                  <NavLink to={"/login"}>
                    <MDBDropdownItem className="logout" href="#!">
                      ออกจากระบบ
                    </MDBDropdownItem>
                  </NavLink>
                </MDBDropdownMenu>
              </MDBDropdown>
              <MDBCol className="d-flex d-lg-none justify-content-between align-items-center">
                <NavLink>
                  <MDBIcon icon="user" /> {localStorage.getItem("name")}
                </NavLink>
                <NavLink to={"/login"}>
                  <MDBDropdownItem className="logout" href="#!">
                    ออกจากระบบ
                  </MDBDropdownItem>
                </NavLink>
              </MDBCol>
            </MDBNavItem>
          </MDBNavbarNav>
        ) : (
          <>
            <NavLink className="" to={"/login"}>
              เข้าสู่ระบบ
            </NavLink>
          </>
        )}
      </MDBCollapse>
    </MDBNavbar>
  );
}

export default Head;
