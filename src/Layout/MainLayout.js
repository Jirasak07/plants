import React, { useEffect, useState } from 'react'
import Head from './Head';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../configUrl';
// import { MDBFooter } from 'mdbreact';

function MainLayout() {
  const nav = useNavigate()
  const [sit,setSit] = useState(0)
  useEffect(()=>{
    axios.post(API+"/User/CheckLogin",{
      token:localStorage.getItem('token')
    }).then((res)=>{
      const data = res.userid
      if(localStorage.getItem('username') === data){
        setSit(1)
      }else{
        setSit(0)
        nav('/home')
      }
    })
  })
  return (
    <div className='mainlayout' >
      <Head sit={sit} />
      <Outlet/>
      {/* <MDBFooter color='indigo'  >Footer</MDBFooter> */}
    </div>
  )
}

export default MainLayout
