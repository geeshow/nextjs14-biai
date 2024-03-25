import React from "react";
import ChatLayout from "@/app/ui/chat/ChatLayout";
import {selectBotById} from "@/repository/bots";

type Props = {
  params: {
    botId: string
  }
}

export default async function Page({params}: Props) {
  const selectedBot = await selectBotById(params.botId)
  
  return (
    <ChatLayout selectedBot={selectedBot}/>
  );
}
