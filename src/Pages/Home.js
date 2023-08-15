import React, { useEffect, useState } from "react";
import "./Home.css";
import image from "../Assets/baner.png";
import sunflower from "../Assets/sunflower.jpg";
import { Carousel } from "react-responsive-carousel";
import { MDBCard, MDBCardFooter } from "mdbreact";
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol } from "mdbreact";
import iii from "../Assets/sds.png";
import axios from "axios";
import { API } from "../configUrl";
import { NavLink } from "react-router-dom";
import { Button, SearchIcon, SearchInput } from "evergreen-ui";
function Home() {
  const data = [{ val: 1 }, { val: 2 }, { val: 3 }];
  const [users, setUsers] = useState([]);
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // จำนวนผู้ใช้งานต่อหน้า
  const [isReady, setIsReady] = useState(false);
  const [search, setSearch] = useState("");
  // const [plant,setPlant] = useState([])

  const getUser = async () => {
    try {
      const get = await axios.get(API + "/Plant/getPlant");
      const data = get.data;
      setUsers(data);
      const getNew = await axios.get(API + "/News/getNew");
      const news = getNew.data;
      setNews(news);
      setIsReady(true); // เมื่อได้ข้อมูลแล้วให้ตั้งค่า isReady เป็น true
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (isReady) {
      // setTables();
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
  const onLink = (val) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(val);
  };
  const ONweb = (link) => {
    window.location.href = link;
  };
  return (
    <div className="container-lg main-home" style={{ gap: "10px" }}>
      <div className="carousel">
        <Carousel
          infiniteLoop
          autoPlay={true}
          showThumbs={false}
          transitionTime={600}
          className="Caro"
        >
          {Array.isArray(news) &&
            news.map((i, index) => (
              <div>
                <img
                  className="d-block w-100"
                  src={API + "/" + i.image_news}
                  alt=""
                />
                {onLink(i.url_news) ? (
                  <>
                    {" "}
                    <div
                      className="btn btn-info"
                      onClick={() => {
                        ONweb(i.url_news);
                      }}
                    >
                      ดูเพิ่มเติม
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            ))}
        </Carousel>
      </div>
      <div className=" pt-3 pb-3 mb-5 info ">
        <div className="d-flex justify-content-end pr-3 mb-2">
          <SearchInput
            placeholder="ค้นหาจากชื่อ"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => Search()}>
            <SearchIcon color="blue500" />
          </Button>{" "}
        </div>

        <div className="card-container pb-3">
          {Array.isArray(currentUsers) &&
            currentUsers.map((user) => (
              <div className="MDBCard rounded">
                <div>
                  <div>
                    <img src={API + "/" + user.img} width={"100%"} alt="" />
                  </div>
                  <div className="text-center ">
                    <strong className="text-center">{user.plant_name}</strong>
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
      <MDBPagination
        className="d-flex justify-content-center bg-secondary py-2"
        color="purple"
      >
        <MDBPageItem disabled={currentPage === 1}>
          <MDBPageNav className="pnav" onClick={goToPrevPage}>
            &laquo; Prev
          </MDBPageNav>
        </MDBPageItem>

        {Array.from({ length: endIndex - startIndex + 1 }).map((_, index) => (
          <MDBPageItem
            key={startIndex + index}
            active={startIndex + index === currentPage}
          >
            <MDBPageNav onClick={() => handlePageChange(startIndex + index)}>
              {startIndex + index}
            </MDBPageNav>
          </MDBPageItem>
        ))}

        <MDBPageItem
          disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
        >
          <MDBPageNav className="pnav" onClick={goToNextPage}>
            Next &raquo;
          </MDBPageNav>
        </MDBPageItem>
      </MDBPagination>
    </div>
  );
}

export default Home;
