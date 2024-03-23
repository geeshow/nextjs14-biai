import ChatAvatar from "@/components/molecules/ChatAvatar";
import ChatContent from "@/components/molecules/ChatContent";
import React from "react";
import ChatAutoScroll from "@/components/organisms/ChatAutoScroll";
import {getChat, getMyInfo} from "@/app/lib/serverFetch";

type Props = {
  params: {
    bot: string,
    chatId: string
  }
}
export default function ChatPage({params}: Props) {
  const {chat, messages, bot} = getChat(params.chatId)
  const myInfo = getMyInfo()
  
  return (
      <>
        <div className="flex flex-col max-w-4xl mx-auto">
          {
            messages.map((message, index) => {
              const user = message.isMine ? myInfo : bot;
              return (
                <div key={index} className="flex w-full my-3">
                  <div>
                    <ChatAvatar src={user.avatar}/>
                  </div>
                  <div className='w-full'>
                    <div className="font-semibold">{user.name}</div>
                    <ChatContent content={message.content}/>
                  </div>
                </div>
              );
            })
          }
        </div>
        <ChatAutoScroll/>
      </>
  );
}
