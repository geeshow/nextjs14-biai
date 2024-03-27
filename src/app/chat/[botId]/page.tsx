import React from "react";
import ChatLayout from "@/app/ui/chat/ChatLayout";
import {selectBotById} from "@/repository/bots";
import Image from "next/image";

type Props = {
  params: {
    botId: string
  }
}

export default async function Page({params}: Props) {
  const selectedBot = await selectBotById(params.botId)
  
  return (
      <ChatLayout>
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex justify-center items-center w-12 h-12 mb-2 rounded-full border">
            <Image src={selectedBot.avatar} alt={selectedBot.name} width={36} height={36} className="rounded-full"/>
          </div>
          <span className="text-2xl font-bold">{selectedBot.description}</span>
        </div>
      </ChatLayout>
  );
}
