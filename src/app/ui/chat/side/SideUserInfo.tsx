import {getMyInfo} from "@/app/lib/serverFetch";
import SideIconButton from "@/app/ui/chat/side/SideIconButton";
import Image from "next/image";
import React from "react";

export default function SideUserInfo() {
  const myInfo = getMyInfo()
  return (
      <a href="/api/auth/logout">
        <div className="my-1 py-2 pl-1 rounded-md cursor-pointer">
          <SideIconButton title="Sign Out">
            <Image src={myInfo.avatar} alt={myInfo.name} width={30} height={30} className="rounded-full"/>
          </SideIconButton>
        </div>
      </a>
  );
}
