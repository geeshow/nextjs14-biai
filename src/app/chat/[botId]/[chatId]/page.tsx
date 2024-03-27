import React from "react";
import ChatList from "@/app/ui/chat/main/ChatList";
import {getChat} from "@/service/chat";

type Props = {
  params: {
    botId: string
    chatId: string
  }
}

export default async function ChatPage({params}: Props) {
  const messages = await getChat(params.chatId)
  return (
      <>
        <ChatList messages={messages} />
      </>
  );
}
