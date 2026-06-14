import React, { useState } from "react";
import LeftSidebar from "../../components/LeftSidebar";
import { FiUploadCloud } from "react-icons/fi";
import Challenge from "../../components/student/Missions/Challenge";
import Rightcomponent from "../../components/student/Missions/Rightcomponent"

export default function Missions() {
  
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-6 w-full items-start justify-center">
        {/* SIDEBAR */}
        <div className="hidden lg:block shrink-0 self-start sticky top-[76px] h-[calc(100vh-76px)] overflow-y-auto custom-scrollbar">
          <LeftSidebar />
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0 pb-12 pt-6">
          <div className="max-w-5xl mx-auto">
            <Challenge />
          </div>
        </div>

        {/* RIGHTSIDE */}
        <div className="hidden xl:block shrink-0 self-start sticky top-[76px] h-[calc(100vh-76px)] overflow-y-auto custom-scrollbar w-[280px]">
         <Rightcomponent/>
        </div>
      </div>
    </div>
  );
}