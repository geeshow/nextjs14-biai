import {MainBots} from "@/app/chat/data";
import Link from "next/link";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import SideIconButton from "@/app/ui/chat/side/SideIconButton";
import React from "react";
import {selectBotAll} from "@/repository/bots";
import Image from "next/image";


export default async function SideMainBots() {
  const bots = await selectBotAll();
  
  return (
      <>
        {bots.map((mainBot) => {
          const href = `/chat/${mainBot.id}`;
          return (
              <Link key={mainBot.name} href={href}>
                <div className="flex justify-between items-center rounded-md p-1 pb-2 pr-2 text-sm font-medium hover:bg-gray-200 cursor-pointer">
                  <SideIconButton title={mainBot.name}>
                    <Image src={mainBot.avatar} alt={mainBot.name} width={20} height={20} className="rounded-full"/>
                  </SideIconButton>
                  <PencilSquareIcon className="w-4 h-4"/>
                </div>
              </Link>
          );
        })}
      </>
  );
}
