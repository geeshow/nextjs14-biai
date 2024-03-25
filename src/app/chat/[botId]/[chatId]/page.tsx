import React from "react";
import ChatAutoScroll from "@/components/organisms/ChatAutoScroll";
import ChatMessageLayout from "@/app/ui/chat/main/ChatMessageLayout";
import ChatListAfterSsr from "@/app/ui/chat/main/ChatListAfterSSR";
import ChatScrollContainer from "@/app/ui/chat/main/ChatScrollContainer";
import ChatInput from "@/app/ui/chat/main/ChatInput";
import {getChat} from "@/service/chat";
import {useParams} from "next/navigation";
import {getSession, Session} from "@auth0/nextjs-auth0";

export default async function ChatPage(){
  const { user } = await getSession() as Session;
  const params = useParams<{botId: string, chatId: string}>()
  const messages = await getChat(params.chatId)
  
  return (
      <>
        <ChatScrollContainer>
          <div className="flex flex-col max-w-4xl mx-auto">
            {
              messages.map((message, index) => {
                return (
                    <ChatMessageLayout key={index} content={message.content} name={message.name}
                                       avatar={message.avatar}/>
                )
              })
            }
            <ChatListAfterSsr chatId={params.chatId}/>
          </div>
          <ChatAutoScroll/>
        </ChatScrollContainer>
        <div className="px-12 relative">
          <ChatInput chatId={params.chatId} botId={params.botId} />
        </div>
      </>
  );
}
