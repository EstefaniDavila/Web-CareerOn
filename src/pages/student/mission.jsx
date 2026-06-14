import React, { useState } from "react";
import LeftSidebar from "../../components/LeftSidebar";
import { FiUploadCloud } from "react-icons/fi";
import Challenge from "../../components/student/Missions/Challenge";
import Rightcomponent from "../../components/student/Missions/Rightcomponent"

export default function Missions() {
  
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen ">

      {/* SIDEBAR */}
      <div className="hidden lg:block shrink-0 sticky top-[88px] bg-[#F3F3F3]">
        <LeftSidebar />
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <Challenge />
        </div>
      </div>
      {/*RIGHTSIDE */}
      <div className="w-[280px] shrink-0">
       <Rightcomponent/>
      </div>

    </div>
  );
}