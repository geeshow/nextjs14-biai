'use client';
import SideToggleButton from "@/components/atoms/SideToggleButton";
import {useState} from "react";
import SpeechBubbleLeft from "@/components/atoms/SpeechBubbleLeft";

export default function SideLayout({ children }: { children: React.ReactNode }) {
  
  const [isSideNavVisible, setIsSideNavVisible] = useState(true);
  
  const toggleSideNav = () => {
    setIsSideNavVisible(!isSideNavVisible);
  }
  
  return (
    <div id='sideNavBar' className={`${isSideNavVisible ? 'min-w-[220px]' : 'min-w-[2px]'}
        transition-all duration-100 ease-out relative`}>
      { children }
      <div className="w-6 absolute -right-6 border-2">
        <div className="group fixed flex top-1/2 z-40" onClick={toggleSideNav}>
          <SideToggleButton/>
        </div>
      </div>
    </div>
  
  );
}
