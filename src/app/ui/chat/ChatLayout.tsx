import ChatScrollContainer from "@/app/ui/chat/main/ChatScrollContainer";
import Image from "next/image";
import ChatInput from "@/app/ui/chat/main/ChatInput";
import React from "react";
import {IBot} from "@/app/chat/data";

export default function ChatLayout({selectedBot}: {selectedBot: IBot}) {
  return (
      <>
        <ChatScrollContainer>
          <div className="flex flex-col justify-center items-center h-full">
            <div className="flex justify-center items-center w-12 h-12 mb-2 rounded-full border">
              <Image src={selectedBot.avatar} alt={selectedBot.name} width={36} height={36} className="rounded-full"/>
            </div>
            <span className="text-2xl font-bold">{selectedBot.description}</span>
          </div>
        </ChatScrollContainer>
        <div className="px-12 relative">
          <ChatInput chatId='new' botId={selectedBot.botId}/>
        </div>
      </>
  );
}
