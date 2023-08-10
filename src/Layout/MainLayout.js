import React from 'react'
import Head from './Head';
import { Outlet } from 'react-router-dom';
// import { MDBFooter } from 'mdbreact';

function MainLayout() {
  return (
    <div className='mainlayout' >
      <Head/>
      <Outlet/>
      {/* <MDBFooter color='indigo'  >Footer</MDBFooter> */}
    </div>
  )
}

export default MainLayout
