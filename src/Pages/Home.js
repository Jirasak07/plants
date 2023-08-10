import React, { useEffect, useState } from "react";
import "./Home.css";
import image from "../Assets/baner.png";
import { Carousel } from "react-responsive-carousel";
import { MDBCard } from "mdbreact";
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol } from "mdbreact";
function Home() {
  const data = [{ val: 1 }, { val: 2 }, { val: 3 }];
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // จำนวนผู้ใช้งานต่อหน้า
  useEffect(() => {
    const fakeUsers = [];
    for (let i = 1; i <= 100; i++) {
      fakeUsers.push({
        id: i,
        firstName: `ชื่อ${i}`,
        lastName: `นามสกุล${i}`,
        age: Math.floor(Math.random() * 40) + 18,
      });
    }
    setUsers(fakeUsers);
  }, []);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
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
  const endIndex = Math.min(startIndex + pagesToShow - 1, Math.ceil(users.length / itemsPerPage));
  return (
    <div className="container-lg main-home" style={{ gap: "10px" }}>
      <div >
        <Carousel
          infiniteLoop
          autoPlay={true}
          showThumbs={false}
          transitionTime={600}
        >
          {data.map((i, index) => (
            <div>
              <img className="d-block w-100" src={image} alt="" />
            </div>
          ))}
        </Carousel>
      </div>
      <div className=" pt-3 pb-3 mb-5 info "  >
        <div className="card-container pb-3">
          {currentUsers.map((user) => (
            <MDBCard className="MDBCard">
              {" "}
              {user.firstName} {user.lastName} (อายุ: {user.age})
            </MDBCard>
          ))}
        </div>
      </div>
      <MDBPagination className="d-flex justify-content-center" >
        <MDBPageItem disabled={currentPage === 1}>
          <MDBPageNav onClick={goToPrevPage}>
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

        <MDBPageItem disabled={currentPage === Math.ceil(users.length / itemsPerPage)}>
          <MDBPageNav onClick={goToNextPage}>
            Next &raquo;
          </MDBPageNav>
        </MDBPageItem>
      </MDBPagination>
    </div>
  );
}

export default Home;
