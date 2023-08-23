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
import { GrFormNextLink } from "react-icons/gr";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  Button,
  Image,
  Pane,
  SearchIcon,
  SearchInput,
} from "evergreen-ui";
function Home() {
  const data = [
    { val: 1 },
    { val: 2 },
    { val: 3 },
    { val: 3 },
    { val: 3 },
    { val: 3 },
    { val: 3 },
    { val: 3 },
    { val: 3 },
    { val: 3 },
  ];
  const [users, setUsers] = useState([]);
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // จำนวนผู้ใช้งานต่อหน้า
  const [isReady, setIsReady] = useState(false);
  const [search, setSearch] = useState("");
  // const [plant,setPlant] = useState([])
  const nav = useNavigate();
  const getUser = async () => {
    try {
      const get = await axios.get(API + "/News/getActivity");
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
  const onLink = (val) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(val);
  };
  // const ONweb = (link) => {
  //   window.location.href = link;
  // };
  const handleClick = (index) => {
    const targetIndex = index; // ดัชนีที่ต้องการค้นหา (array ตัวที่ 4)
    const targetItem = news[targetIndex];
    const chk = onLink(targetItem.url_news);
    if (chk) {
      window.open(targetItem.url_news, "_bank");
    } else {
      // alert(`ไม่พบองค์ประกอบที่ดัชนี ${targetIndex}`);
    }
  };
  const formatDate = (val) => {
    const date = new Date(val); // วันที่ปัจจุบัน

    // กำหนดภาษาเป้าหมายเป็นไทย
    const options = { year: "numeric", month: "long", day: "numeric" };
    const thaiDate = date.toLocaleDateString("th-TH", options);
    return thaiDate;
  };
  const [count, setCount] = useState(false);
  const GotoDetail = (id) => {
    nav("/active/detail/" + id);
  };
  const onSub = (val) => {
    const text = val.substring(0, 100);
    return text;
  };
  return (
    <div className="container-md main-home">
      <div className="carousel ">
        <Carousel
          infiniteLoop
          autoPlay={true}
          showThumbs={true}
          thumbWidth={"50px"}
          transitionTime={600}
          className="Caro"
          // dynamicHeight={true}
          showStatus={false}
          showIndicators={false}
          stopOnHover={true}
          swipeable={true}
          onClickItem={handleClick}
        >
          {Array.isArray(news) &&
            news.map((i, index) => (
              <div>
                <img
                  className="d-block w-100"
                  src={API + "/" + i.image_news}
                  alt=""
                />
              </div>
            ))}
        </Carousel>
      </div>
      <div
        className="container-md newss  pb-5"
      >
        {users.slice(0, !count ? 4 : users.length).map((val) => (
          <Pane backgroundColor="white" className="carddd" borderRadius={5} >
            <div
              style={{
                backgroundColor: "#00000020",
                aspectRatio: "4/3",
                borderRadius: "5px",
                overflow:'hidden'
              }}
              className=""
            >
              <Image src={API + "/" + val.pic} maxWidth={'350px'} />
            </div>
            <div
              className="text-secondary text-center mt-1"
              style={{ fontWeight: "500" }}
            >
              <span> {val.ac_title} </span>
            </div>
            <span style={{ fontSize: "small" }}>
              ข้อมูลวันที่ {formatDate(val.ac_date)}
            </span>
            <div
              style={{
                width: "100%", 
                height: "100px",
                overflow:"hidden",
                whiteSpace:'pre-line',
                wordWrap:'break-word'
              }}
            >
              <p style={{ fontSize: "0.9em" }}>
                {val.ac_detail}
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#00000030",
                borderRadius: "5px",
                paddingLeft: "8px",
                minHeight: "30px",
              }}
              className="d-flex align-items-center ic"
              onClick={() => GotoDetail(val.ac_id)}
            >
              <ArrowRightIcon className="ic" />
            </div>
          </Pane>
        ))}
        <div
          onClick={() => setCount(!count)}
          className="ic text-dark text-right"
          style={{
            // textShadow: "0px 0px 5px #000000",
            // position: "absolute",
            // right: "10px",
            // bottom: "5px",
            // fontWeight: "600",
          }}
        >
          {count ? "น้อยลง" : "ดูเพิ่มเติม"}
        </div>
      </div>
    </div>
  );
}

export default Home;
