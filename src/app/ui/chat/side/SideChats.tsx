import Link from "next/link";
import {PencilSquareIcon, Cog8ToothIcon} from "@heroicons/react/24/outline";
import {getMyInfo, groupedChatList} from "@/app/lib/serverFetch";
import Image from "next/image";
import React from "react";
import SpeechBubbleBottom from "@/components/atoms/SpeechBubbleBottom";
import SpeechBubbleLeft from "@/components/atoms/SpeechBubbleLeft";

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
                    <li key={chat.chatId} className="group/menu my-1 py-2 pl-1 hover:bg-gray-200 rounded-xl cursor-pointer">
                      <Link href={href}>
                        <div className="flex justify-between items-center rounded-md text-sm font-medium h-full relative">
                          <div className="w-full pr-6">
                            <div className="flex items-center gap-1 overflow-hidden">
                              <div className="min-w-[22px] max-w-[22px]">
                                <Image src={avatar} alt={bot.name} width={20} height={20}
                                       className="rounded-full"/>
                              </div>
                              <p className="block text-ellipsis bg-clip-text whitespace-nowrap">{chat.title}</p>
                            </div>
                          </div>
                          <div className="flex group-hover/menu:hidden justify-between items-center absolute z-0 right-2">
                            <div className="w-12 h-8 side-gradient from-transparent to-white"></div>
                          </div>
                          <div className="hidden group-hover/menu:flex justify-between items-center absolute z-0 right-2">
                            <div className="w-12 h-8 side-gradient-hover from-transparent to-white"></div>
                            <div className="group/button relative">
                              <Cog8ToothIcon className="w-5 h-5 block group-hover/button:block bg-gray-200 text-gray-500 hover:text-gray-700"/>
                              <div className="absolute -top-10 -left-4 hidden group-hover/button:block">
                                <SpeechBubbleBottom text="More"/>
                              </div>
                            </div>
                          </div>
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
