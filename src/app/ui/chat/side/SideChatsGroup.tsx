import Link from "next/link";
import Image from "next/image";
import React from "react";
import SideIconButton from "@/app/ui/chat/side/SideIconButton";
import SideChatContainer from "@/app/ui/chat/side/SideChatContainer";
import {IChats} from "@/app/lib/definitions";
import {selectBotById} from "@/repository/bots";

export default async function SideChatsGroup({groupName, chatsInGroup} : {groupName:string, chatsInGroup: IChats[]}) {
  return (
    <>
      <p className="text-xs text-gray-500 ml-1 mt-6 font-bold">{groupName}</p>
      <ol>
        {chatsInGroup.map(async (chat, index) => {
          const bot = await selectBotById(chat.bot_id)
          const href = `/chat/${chat.bot_id}/${chat.id}`
          const className = groupName === 'Today' && index === 0 ? 'animate-slideInFromLeft' : '';
          return (
              <li key={chat.id} className={className}>
                <Link href={href}>
                  <SideChatContainer chatId={chat.id}>
                    <div className="w-full pr-6">
                      <SideIconButton title={chat.title}>
                        <Image src={bot.avatar} alt={bot.name} width={20} height={20} className="rounded-full"/>
                      </SideIconButton>
                    </div>
                  </SideChatContainer>
                </Link>
              </li>
          )
        })}
      </ol>
    </>
  );
}
