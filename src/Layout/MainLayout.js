import React, { useEffect } from 'react'
import Head from './Head';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../configUrl';
// import { MDBFooter } from 'mdbreact';

function MainLayout() {
  const nav = useNavigate()
  useEffect(()=>{
    axios.post(API+"/User/CheckLogin",{
      token:localStorage.getItem('token')
    }).then((res)=>{
      const data = res.userid
      if(localStorage.getItem('username') === data){
        
      }else{
        nav('/home')
      }
    })
  })
  return (
    <div className='mainlayout' >
      <Head/>
      <Outlet/>
      {/* <MDBFooter color='indigo'  >Footer</MDBFooter> */}
    </div>
  )
}

export default MainLayout
