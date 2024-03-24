'use client';
import React from "react";
import {useParams, usePathname, useRouter} from "next/navigation";
import SideChatIcon from "@/app/ui/chat/side/SideChatIcon";
import {Cog8ToothIcon} from "@heroicons/react/24/outline";
import SideChatIconOn from "@/app/ui/chat/side/SideChatIconOn";

export default function SideChatContainer({children, chatId}: {children: React.ReactNode, chatId: string}) {
  const path = useParams<{bot: string, chatId: string}>()
  const className = chatId === path.chatId
      ? 'bg-gray-300'
      : 'hover:bg-gray-200'
  return (
      <>
        <div className={`group/menu my-1 py-2 pl-1 rounded-md cursor-pointer ${className}`}>
          <div className="flex justify-between items-center rounded-md text-sm font-medium h-full relative">
            {children}
            {chatId === path.chatId &&
              <SideChatIconOn bubbleText="More">
                <Cog8ToothIcon className="w-5 h-5 block bg-gray-300 text-gray-500 hover:text-gray-700 hover:animate-spin"/>
              </SideChatIconOn>
            }
            {chatId !== path.chatId &&
              <SideChatIcon bubbleText="More">
                <Cog8ToothIcon className="w-5 h-5 bg-gray-200 text-gray-500 hover:text-gray-700 hover:animate-spin"/>
              </SideChatIcon>
            }
          </div>
        </div>
      </>
  );
}
