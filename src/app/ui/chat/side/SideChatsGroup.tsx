import Link from "next/link";
import {getMyInfo} from "@/app/lib/serverFetch";
import Image from "next/image";
import React from "react";
import SideIconButton from "@/app/ui/chat/side/SideIconButton";
import SideChatContainer from "@/app/ui/chat/side/SideChatContainer";
import {groupedChatList} from "@/app/lib/actions";
import {IChat} from "@/app/chat/data";

export default async function SideChatsGroup({groupName, chatsInGroup} : {groupName:string, chatsInGroup: IChat[]}) {
  return (
    <>
      <p className="text-xs text-gray-500 ml-1 mt-6 font-bold">{groupName}</p>
      <ol>
        {chatsInGroup.map((chat, index) => {
          const bot = chat.bot;
          const avatar = bot.avatar;
          const href = `/chat/${chat.botId}/${chat.chatId}`
          const className = groupName === 'Today' && index === 0 ? 'animate-slideInFromLeft' : '';
          return (
              <li key={chat.chatId} className={className}>
                <Link href={href}>
                  <SideChatContainer chatId={chat.chatId}>
                    <div className="w-full pr-6">
                      <SideIconButton title={chat.title}>
                        <Image src={avatar} alt={bot.name} width={20} height={20} className="rounded-full"/>
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
