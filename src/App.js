import React from "react";
import "./App.css";
import MainLayout from "./Layout/MainLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ListData from "./Pages/ListData";
import User from "./Pages/User";
import LoginPage from "./Auth/LoginPage";
import Setting from "./Pages/Setting";
import Profile from "./Pages/Profile";
import News from "./Pages/News";
import Detail from "./Pages/Detail";
import DetailTwo from "./Pages/DetailTwo";
import Desk from "./Pages/Desk";
import Plant from "./Pages/Plant";
import ActivityPage from "./Pages/ActivityPage";
import FormAddActivity from "./Form/FormAddActivity";
import ratingkpru from "rating_kpru";
import ActivDetail from "./Pages/ActivDetail";
function App() {
  return (
    <div className="v">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/plant" element={<Plant />} />
          <Route path="/user" element={<User />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/news" element={<News />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/detail2/:id" element={<DetailTwo />} />
          {/* <Route path="/test" element={<Plant />} /> */}
          <Route path="/active" element={<ActivityPage />} />
          <Route path="/active/detail/:id" element={<ActivDetail />} />
          <Route path="/active/add" element={<FormAddActivity />} />
        </Route>
        <Route path="/admin"></Route>
      </Routes>
    </div>
  );
}

export default App;
