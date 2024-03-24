import {MainBots} from "@/app/chat/data";
import Link from "next/link";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import SideIconButton from "@/app/ui/chat/side/SideIconButton";
import Image from "next/image";
import React from "react";

export default function SideMainBots() {
  return (
      <>
        {MainBots.map((mainBot) => {
          const Icon = mainBot.icon;
          return (
              <Link key={mainBot.name} href={mainBot.href}>
                <div className="flex justify-between items-center rounded-md p-1 text-sm font-medium hover:bg-gray-200 cursor-pointer">
                  <SideIconButton title={mainBot.name}>
                    <Icon />
                  </SideIconButton>
                  <PencilSquareIcon className="w-4 h-4"/>
                </div>
              </Link>
          );
        })}
      </>
  );
}
