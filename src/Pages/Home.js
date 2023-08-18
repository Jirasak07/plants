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
import { NavLink } from "react-router-dom";
import { ArrowRightIcon, Button, Pane, SearchIcon, SearchInput } from "evergreen-ui";
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
  const [count,setCount]=useState(false);
  return (
    <div className="container-fluid main-home">
      <div className="carousel container-md">
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
        style={{ position: "relative" }}
        className="container-md d-grid news-small  pb-5"
      >
        {data.slice(0, !count? 4:data.length).map((val) => (
          <Pane backgroundColor="white" className="cd" borderRadius={5}>
            <div
              style={{
                backgroundColor: "red",
                aspectRatio: "4/3",
                borderRadius: "5px",
              }}
              className=""
            >
              รูปข่าว
            </div>
            <div className="text-secondary mt-1" style={{ fontWeight: "500" }}>
              หัวข้อ
            </div>
            <span style={{fontSize:"small"}} >วันที่ - วันที่</span>
            <div
              style={{
                whiteSpace: "wrap",
                overflow: "hidden",
                otextOverflow: "ellipsis",
                maxHeight: "110px",
              }}
            >
              <p style={{fontSize:'0.9em'}} >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae, culpa ex esse veniam omnis iusto deserunt ipsam
                repellendus adipisci quisquam, veritatis minima consectetur!
                Inventore laudantium saepe quas fugiat illum aut perspiciatis
                officiis impedit quibusdam animi dignissimos, nihil illo
                aspernatur nisi sit repudiandae quisquam, dolore laboriosam
                dolores quo quia, accusamus ex.{" "}
              </p>
            </div>
            <div style={{backgroundColor:'#00000030',borderRadius:'5px',paddingLeft:'8px',minHeight:'30px'}} className="d-flex align-items-center ic" ><ArrowRightIcon className="ic" /></div>
          </Pane>
        ))}
        <span
        onClick={()=>setCount(!count)}
          className="ic text-dark text-right"
          style={{
            // textShadow: "0px 0px 5px #000000",
            position: "absolute",
            right: "10px",
            bottom: "5px",
            fontWeight:'600'
          }}
        >
        {count? "น้อยลง":"ดูเพิ่มเติม"}  
        </span>
      </div>
    </div>
  );
}

export default Home;
