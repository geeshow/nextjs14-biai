'use client';
import ChatMessageLayout from "@/app/ui/chat/main/ChatMessageLayout";
import {IChatMessage, IChatMessageWithUserInfo} from "@/recoil/chat";
import {useRecoilValue} from "recoil";
import {chatMessageListState} from "@/recoil/sendMessage";

export default function ChatListAfterSsr({chatId}: { chatId: string}) {
  const messages = useRecoilValue(chatMessageListState(chatId))
  
  return (
      <>
        {
          messages.map((message: IChatMessageWithUserInfo, index: number) => {
            return (
                <ChatMessageLayout key={index} content={message.content} name={message.name} avatar={message.avatar}/>
            );
          })
        }
      </>
  );
}
