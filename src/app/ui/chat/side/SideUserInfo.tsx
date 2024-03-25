import SideIconButton from "@/app/ui/chat/side/SideIconButton";
import Image from "next/image";
import React from "react";
import {getSession, handleLogout, Session, withPageAuthRequired} from "@auth0/nextjs-auth0";

export default withPageAuthRequired(async function SideUserInfo() {
  const { user } = await getSession() as Session;
  const name = user?.name as string
  const email = user?.email as string
  const picture = user?.picture as string
  const emailDomain = email.split('@')[1]
  // if (emailDomain !== 'decacorn.team') {
  //   handleLogout();
  // }
  
  return (
      <a href="/api/auth/logout">
        <div className="my-1 py-2 pl-1 rounded-md cursor-pointer">
          <SideIconButton title="Sign Out">
            <Image src={picture} alt={name} width={30} height={30} className="rounded-full"/>
          </SideIconButton>
        </div>
      </a>
  );
}, {returnTo: '/chat'});
