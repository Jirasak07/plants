import axios from "axios";
import { Button, RefreshIcon, SearchIcon, SearchInput } from "evergreen-ui";
import { MDBPageItem, MDBPageNav, MDBPagination } from "mdbreact";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { API } from "../configUrl";
import { BsPostcardFill } from "react-icons/bs";
import ListData from "./ListData";

function Plant() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // จำนวนผู้ใช้งานต่อหน้า
  const [isReady, setIsReady] = useState(false);
  const [search, setSearch] = useState("");
  const getUser = async () => {
    try {
      const get = await axios.get(API + "/Plant/getPlant");
      const data = get.data;
      setUsers(data);
      setIsReady(true); // เมื่อได้ข้อมูลแล้วให้ตั้งค่า isReady เป็น true
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (isReady) {
    }
  }, [isReady]);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  var currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const pagesToShow = 5;
  // เปลี่ยนหน้า
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(users.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // คำนวณหน้าเริ่มต้นและสิ้นสุดของเพจเนชันที่จะแสดง
  const startIndex = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
  const endIndex = Math.min(
    startIndex + pagesToShow - 1,
    Math.ceil(users.length / itemsPerPage)
  );
  const Search = (e) => {
    var send = "";
    if (search === "") {
      send = "no";
    } else {
      send = search;
    }
    const frm = new FormData();
    frm.append("name", search);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: API + "/Plant/Search",
      data: frm,
    };

    axios.request(config).then((res) => {
      const data = res.data;
      console.log(data);
      if (data === "error") {
      } else {
        setUsers(data);
        currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);
      }
    });
  };
  const [showTable, setShowTable] = useState(true);
  const change = async () => {
    await setShowTable(!showTable);
  };
  return (
    <div className="container-fluid  " style={{}}>
      <div className="d-flex justify-content-end pr-4">
        <BsPostcardFill
          color={showTable === true ? "white" : "#474d66"}
          className="ic"
          size={30}
          onClick={change}
        />
      </div>
      {showTable ? (
        <>
          <div
            className="d-flex flex-column container-md"
            style={{
              minHeight: "calc(100vh - 110px)",
              justifyContent: "space-between",
            }}
          >
            <div className=" pt-3 pb-3 mb-5 info ">
              <div className="d-flex justify-content-center mb-2">
                <SearchInput
                  placeholder="ค้นหาจากชื่อ"
                  value={search}
                  width={"100%"}
                  maxWidth="300px"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button maxWidth="60px" onClick={() => Search()}>
                  <SearchIcon color="blue500" />
                </Button>
                <Button
                  maxWidth="60px"
                  onClick={() => {
                    getUser();
                    setSearch("");
                  }}
                >
                  <RefreshIcon color="green500" />
                </Button>
              </div>

              <div className="card-container pb-3">
                {Array.isArray(currentUsers) &&
                  currentUsers.map((user) => (
                    <div className="MDBCard rounded">
                      <div>
                        <div style={{ overflow: "hidden", maxHeight: "250px" }}>
                          <img
                            src={API + "/" + user.img}
                            width={"100%"}
                            alt=""
                            className="rounded"
                          />
                        </div>
                        <div className="text-center mt-2">
                          <strong className="text-center">
                            {user.plant_name}
                          </strong>
                        </div>
                      </div>

                      <NavLink
                        to={"/detail2/" + user.plant_id}
                        className="btn  btn-secondary d-flex align-items-center justify-content-center btn-sm"
                      >
                        ดูเพิ่มเติม
                      </NavLink>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <MDBPagination
                className="d-flex justify-content-center  bot"
                color="purple"
              >
                <MDBPageItem disabled={currentPage === 1}>
                  <MDBPageNav className="pnav ic" onClick={goToPrevPage}>
                    <span className="baba"> &laquo; ก่อนหน้า</span>
                  </MDBPageNav>
                </MDBPageItem>

                {Array.from({ length: endIndex - startIndex + 1 }).map(
                  (_, index) => (
                    <MDBPageItem
                      key={startIndex + index}
                      active={startIndex + index === currentPage}
                    >
                      <MDBPageNav
                        onClick={() => handlePageChange(startIndex + index)}
                      >
                        {startIndex + index}
                      </MDBPageNav>
                    </MDBPageItem>
                  )
                )}

                <MDBPageItem
                  disabled={
                    currentPage === Math.ceil(users.length / itemsPerPage)
                  }
                >
                  <MDBPageNav className="pnav ic" onClick={goToNextPage}>
                    <span className="baba"> ถัดไป &raquo;</span>
                  </MDBPageNav>
                </MDBPageItem>
              </MDBPagination>
            </div>
          </div>
        </>
      ) : (
        <>
          <ListData />
        </>
      )}
      <div></div>
    </div>
  );
}

export default Plant;
