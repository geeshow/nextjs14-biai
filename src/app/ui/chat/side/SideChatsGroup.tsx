import Link from "next/link";
import Image from "next/image";
import React from "react";
import SideIconButton from "@/app/ui/chat/side/SideIconButton";
import SideChatContainer from "@/app/ui/chat/side/SideChatContainer";
import {IBots, IChats} from "@/app/lib/definitions";
import {selectBotAll, selectBotById} from "@/repository/bots";

export default async function SideChatsGroup({groupName, chatsInGroup} : {groupName:string, chatsInGroup: IChats[]}) {
  const bots = await selectBotAll();
  return (
    <>
      <p className="text-xs text-gray-500 ml-1 mt-6 font-bold">{groupName}</p>
      <ol>
        {chatsInGroup.map((chat, index) => {
          const bot = bots.find(bot => bot.id === chat.bot_id) as IBots
          const href = `/chat/${chat.bot_id}/${chat.id}`
          const className = groupName === 'Today' && index === 0 ? 'animate-slideInFromLeft' : '';
          return (
              <li key={chat.id} className={className}>
                <Link href={href}>
                  <SideChatContainer chatId={chat.id}>
                    <div className="w-full pr-6">
                      <SideIconButton title={chat.title}>
                        { bot?.avatar && <Image src={bot.avatar} alt={bot.name} width={20} height={20} className="rounded-full"/> }
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
