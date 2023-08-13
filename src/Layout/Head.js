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
import { NavLink } from "react-router-dom";
function Head({ sit }) {
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MDBNavbar className="head" dark expand="md">
      <MDBNavbarBrand>
        <span style={{ fontSize: "16px" }}>
          {" "}
          <img src={logo} alt="" width={40} /> โครงการ อพ.สธ. อบจ.กำแพงเพชร
        </span>
      </MDBNavbarBrand>{sit}
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
          <NavLink
            to="/user"
            className={({ isActive, isPending }) =>
              isPending ? "bg-info" : isActive ? "navlink ac" : "navlink"
            }
          >
            <MDBIcon icon="user-cog" /> ผู้ใช้งาน
          </NavLink>
        ) : (
          <></>
        )}
        {sit === 1 ? (
          <MDBDropdown>
            <MDBDropdownToggle nav caret className="navlink">
              <MDBIcon icon="cog" /> จัดการระบบ
            </MDBDropdownToggle>
            <MDBDropdownMenu className="dropdown-default">
              <NavLink to="/plant" className="dd">
                <MDBIcon icon="spa" /> เพิ่มข่าวประชาสัมพันธ์
              </NavLink>
            </MDBDropdownMenu>
          </MDBDropdown>
        ) : (
          <></>
        )}
{sit === 1? <MDBNavbarNav right>
          <MDBNavItem>
            <MDBDropdown className="d-none d-md-flex">
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" /> นายจิรศักดิ์ สิงหบุตร
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default p-2">
                <MDBDropdownItem className="logout" href="#!">
                  ออกจากระบบ
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <MDBCol className="d-flex d-md-none justify-content-between align-items-center">
              <div>
                <MDBIcon icon="user" /> นายจิรศักดิ์ สิงหบุตร
              </div>
              <div
                className="btn btn-sm btn-danger d-flex align-items-center "
                style={{ gap: "10px" }}
              >
                <MDBIcon icon="sign-out-alt" />
                ออกจากระบบ
              </div>
            </MDBCol>
          </MDBNavItem>
        </MDBNavbarNav>:<>
        <NavLink  className="" to={'/login'} >เข้าสู่ระบบ</NavLink>
        </>}
        
      </MDBCollapse>
    </MDBNavbar>
  );
}

export default Head;
