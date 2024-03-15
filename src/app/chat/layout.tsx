'use client'
import SideNav from '@/app/ui/dashboard/sidenav';
import { Metadata } from 'next';
import SpeechBubble from "@/components/atoms/SpeechBubble";
import SideToggleButton from "@/components/organisms/SideToggleButton";
import {useState} from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSideNavVisible, setIsSideNavVisible] = useState(true);
  
  const toggleSideNav = () => {
    console.log('toggle side nav');
    setIsSideNavVisible(!isSideNavVisible);
  }
  
  return (
      <div className="flex justify-center">
        <div id='sideNavBar' className={`${isSideNavVisible ? 'min-w-[220px]' : 'min-w-[2px]'}
          transition-all duration-100 ease-out relative`}>
          <div className="fixed top-0">
            <SideNav/>
          </div>
          <div className="w-6 absolute -right-6">
            <SideToggleButton onClick={toggleSideNav}/>
          </div>
        </div>
        <div className="flex w-full min-h-screen p-2 bg-white z-0">
          <div className="flex justify-start w-full max-w-4xl mx-auto">
            {children}
          </div>
        </div>
      </div>
  );
}
