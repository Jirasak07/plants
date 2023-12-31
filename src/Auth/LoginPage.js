import React, { useEffect, useState } from "react";
import "./Login.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../configUrl";
import { Button, Pane, TextInputField } from "evergreen-ui";

function LoginPage() {
  useEffect(()=>{
localStorage.clear()
  },[])
  const nav = useNavigate();
  const [input, setInput] = useState([]);
  const [load, setLoad] = useState(false);
  const onSubmit = (e) => {
    setLoad(true);
    e.preventDefault();

    (async () => {
      try {
        const login = await axios.post(API + "/User/Login", {
          username: input.username,
          password: input.password,
        });
        const response = login.data;
        if (response.message === "success") {
          setLoad(false);
          Swal.fire({
            icon: "success",
            title: "ยินดีต้อนรับเข้าสู่ระบบ",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          }).then((res) => {
            const data = response.user_id[0]
            localStorage.setItem('user_id',data.user_id)
            localStorage.setItem('name',data.name)
            localStorage.setItem('username',data.username)
            localStorage.setItem('role',data.user_role)
            localStorage.setItem('token',response.data)
            nav("/home");
          });
        } else if (response === "info") {
          setLoad(false);
          Swal.fire({
            icon: "warning",
            title: "ไม่พบผู้ใช้ในระบบ หรือ ไม่ได้รับสิทธิ์",
            text: "กรุณาติดต่อ แอดมิน",
          });
        } else {
          setLoad(false);
          Swal.fire({
            icon: "error",
            title: "รหัสผ่านไม่ถูกต้อง",
          });
        }
      } catch (error) {}
    })();
  };
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center h-100 ">
      <Pane
        width="350px"
        backgroundColor="white"
        borderRadius={10}
        padding={30}
        height={450}
      >
        <form
          className="d-flex flex-column  h-100" style={{justifyContent:'space-evenly'}}
          onSubmit={onSubmit}
        >
          <div
            className="d-flex flex-column justify-content-center  align-items-center"
            style={{ fontSize: "2em",fontWeight: "500" }}
          >
           <div style={{color:'#6a00e4',fontWeight: "600"}} >Welcome</div> 
           <div className="mt-4" style={{fontSize:'16px'}} >ระบบจัดเก็บพันธุกรรมพืช</div> 
           <div style={{fontSize:'16px'}} >องค์การบริหารส่วนจังหวัดกำแพงเพชร</div> 
          </div>
          <div className=" mt-3 d-flex flex-column justify-content-center">
            <TextInputField
              label="ชื่อผู้ใช้"
              name="username"
              onChange={onChange}
            />
            <TextInputField
              type="password"
              name="password"
              label="รหัสผ่าน"
              onChange={onChange}
            />
            <div className="text-center">
              <Button
                appearance="primary"
                width="100%"
                intent="success"
                type="submit"
              >
                เข้าสู่ระบบ
              </Button>
            </div>
          </div>
        </form>
      </Pane>
    </div>
  );
}

export default LoginPage;
