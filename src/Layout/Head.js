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
import { BiNews } from "react-icons/bi";
import { CgLogIn } from "react-icons/cg";
import { FaUserTie } from "react-icons/fa";
import Swal from "sweetalert2";
function Head({ sit }) {
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  const [isOpen, setIsOpen] = useState(false);
  const role = localStorage.getItem("role");
  const nav = useNavigate();
  const Logout = () => {
    localStorage.clear();
    Swal.fire({
      icon: "warning",
      title: "กำลังออกจากระบบ",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    }).then((e) => {
      window.location.reload();
      nav("/home");
    });
  };
  return (
    <MDBNavbar className="head flex-wrap" dark expand="xl">
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
      <MDBCollapse
        id="navbarCollapse3"
        isOpen={isOpen}
        navbar
        className="headmenu"
      >
        <MDBNavbarNav className="barmenu" left>
          <NavLink
            to="/home"
            className={({ isActive, isPending }) =>
              isPending ? "bg-info" : isActive ? " navlink ac" : "navlink"
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
                      isPending
                        ? "bg-info"
                        : isActive
                        ? "navlink ac"
                        : "navlink"
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
            <> </>
          )}
          {sit === 1 ? (
            <>
              {/* {role === "1" ? (
                <> */}
              <NavLink
                to="/news"
                className={({ isActive, isPending }) =>
                  isPending ? "bg-info" : isActive ? "navlink ac" : "navlink"
                }
              >
                <BiNews /> ข่าวประชาสัมพันธ์
              </NavLink>
              <NavLink
                to="/active"
                className={({ isActive, isPending }) =>
                  isPending ? "bg-info" : isActive ? "navlink ac" : "navlink"
                }
              >
                <BiNews /> ข่าวกิจกรรม
              </NavLink>
              {/* </>
              ) : (
                <></>
              )} */}
            </>
          ) : (
            <></>
          )}
        </MDBNavbarNav>

        {sit === 1 ? (
          <MDBNavbarNav right className="mt-xl-0 mt-3">
            <MDBNavItem>
              <MDBDropdown className="d-none d-xl-flex">
                <MDBDropdownToggle nav caret>
                  <NavLink to={'/profile'} >
                    <MDBIcon icon="user" /> {localStorage.getItem("name")}
                  </NavLink>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default p-2">
                  <div
                    onClick={() => {
                      Logout();
                    }}
                  >
                    <MDBDropdownItem className="logout" href="#!">
                      ออกจากระบบ
                    </MDBDropdownItem>
                  </div>
                </MDBDropdownMenu>
              </MDBDropdown>
              <MDBCol className="d-flex d-xl-none justify-content-between align-items-center">
              <NavLink to={'/profile'} >
                    <MDBIcon icon="user" /> {localStorage.getItem("name")}
                  </NavLink>
                <div
                  onClick={() => {
                    Logout();
                  }}
                >
                  <MDBDropdownItem className="logout-sm" href="#!">
                    ออกจากระบบ
                  </MDBDropdownItem>
                </div>
              </MDBCol>
            </MDBNavItem>
          </MDBNavbarNav>
        ) : (
          <>
            <NavLink className="navlink" to={"/login"}>
              <CgLogIn /> เข้าสู่ระบบ
            </NavLink>
          </>
        )}
      </MDBCollapse>
    </MDBNavbar>
  );
}

export default Head;
