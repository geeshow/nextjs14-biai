'use client';
import React, {useOptimistic} from "react";
import {IChatMessageWithUserInfo} from "@/recoil/chat";
import ChatInput from "@/app/ui/chat/main/ChatInput";
import {useRouter} from "next/navigation";
import {ArrowPathIcon} from "@heroicons/react/24/outline";

export default function ChatLayout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const [optimisticMessages, addOptimisticMessages] = useOptimistic(
      [] as IChatMessageWithUserInfo[],
      (prevMessages, newMessage) => {
        return [...prevMessages, newMessage] as IChatMessageWithUserInfo[];
      },
  );
  
  return (
      <>
        <div className="flex flex-col items-center flex-1 overflow-y-scroll px-12">
          {children}
          {optimisticMessages.map((message: IChatMessageWithUserInfo, index: number) => {
            if (message.chatId) {
              setTimeout(() => {
                router.push(`/chat/${message.botId}/${message.chatId}`);
              }, 1000);
            }
            
            return (
              <div key={index}><ArrowPathIcon className="w-20 h-20 p-2 animate-spin text-gray-700 font-bold"/></div>
            )
          })}
        </div>
        <div className="px-8 m-1 relative">
          <ChatInput addOptimisticMessages={addOptimisticMessages}/>
        </div>
      </>
  );
}
