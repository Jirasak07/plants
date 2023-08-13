import React from 'react'
import './App.css'
import MainLayout from './Layout/MainLayout';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import ListData from './Pages/ListData';
import User from './Pages/User';
import LoginPage from './Auth/LoginPage';
import Setting from './Pages/Setting';
import Profile from './Pages/Profile';
import News from './Pages/News'

function App() {
  return (
    <div className='v' >
      <Routes >
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/' element={<MainLayout/>} >
          <Route path='/home' element={<Home/>} />
          <Route path='/plant' element={<ListData/>} />
          <Route path='/user' element={<User/>}/>
          <Route path='/setting' element={<Setting/>}/>
          <Route path='/news' element={<News/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
