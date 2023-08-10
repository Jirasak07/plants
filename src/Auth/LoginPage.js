import { MDBCard, MDBCol, MDBInput } from "mdbreact";
import React from "react";
import './Login.css'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const nav = useNavigate();
  const onSubmit=()=>{
 Swal.fire({
  icon:'success',
  title:'ยินดีต้อนรับเข้าสู่ระบบ',
  showConfirmButton:false,
  timer:1500,
  timerProgressBar:true
 }).then((res)=>{
  nav('/home')
 })
  }
  return (
    <div className="d-flex justify-content-center align-items-center h-100" >
      <div class="form-container">
    <p class="title">Login</p>
    <form class="form">
   <MDBInput label="Username" />
   <MDBInput type="password" label="Password" />
      <div className="text-center">
         <div className="btn btn-secondary w-100 " onClick={onSubmit} >เข้าสู่ระบบ</div>
      </div>
    </form>
    <div class="social-message">
      <div class="line"></div>
    </div>
  </div>
    </div>
    
  );
}

export default LoginPage;
