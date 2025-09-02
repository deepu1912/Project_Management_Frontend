// src/components/MainBody.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";

const MainBody = () => (
  <div className="w-screen h-screen flex flex-col bg-[#D9D9D92E]">
    <Header />
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-shrink-0">
        <SideBar />
      </div>
      <div className="flex-1 overflow-auto pt-16">
        <Outlet />
      </div>
    </div>
  </div>
);

export default MainBody;

//header
//
