import Link from "next/link";
import {PencilSquareIcon, Cog8ToothIcon} from "@heroicons/react/24/outline";
import {getMyInfo, groupedChatList} from "@/app/lib/serverFetch";
import Image from "next/image";
import React from "react";
import SpeechBubbleBottom from "@/components/atoms/SpeechBubbleBottom";
import SpeechBubbleLeft from "@/components/atoms/SpeechBubbleLeft";
import SideChatIcon from "@/app/ui/chat/side/SideChatIcon";
import SideIconButton from "@/app/ui/chat/side/SideIconButton";

export default function SideChats() {
  const myInfo = getMyInfo()
  const chatGroup = groupedChatList(myInfo.userId)
  return (
      <>
        {chatGroup.today.length > 0 &&
          <>
            <p className="text-xs text-gray-500 ml-1 font-bold">Today</p>
            <ol>
              {chatGroup.today.map(chat => {
                const bot = chat.bot;
                const avatar = bot.avatar;
                const href = `/chat/${chat.botId}/${chat.chatId}`
                return (
                    <li key={chat.chatId} className="group/menu my-1 py-2 pl-1 hover:bg-gray-200 rounded-md cursor-pointer">
                      <Link href={href}>
                        <div className="flex justify-between items-center rounded-md text-sm font-medium h-full relative">
                          <div className="w-full pr-6">
                            <SideIconButton title={chat.title}>
                              <Image src={avatar} alt={bot.name} width={20} height={20} className="rounded-full"/>
                            </SideIconButton>
                          </div>
                          <SideChatIcon bubbleText="More">
                            <Cog8ToothIcon className="w-5 h-5 block group-hover/button:block bg-gray-200 text-gray-500 hover:text-gray-700"/>
                          </SideChatIcon>
                        </div>
                      </Link>
                    </li>
                )
              })}
            </ol>
          </>
        }
      </>
  );
}
