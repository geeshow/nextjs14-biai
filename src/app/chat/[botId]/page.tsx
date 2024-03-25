import React from "react";
import {getBot} from "@/app/lib/serverFetch";
import Image from "next/image";
import ChatScrollContainer from "@/app/ui/chat/main/ChatScrollContainer";
import ChatInput from "@/app/ui/chat/main/ChatInput";
import ChatLayout from "@/app/ui/chat/ChatLayout";

type Props = {
  params: {
    botId: string
  }
}

export default function Page({params}: Props) {
  const selectedBot = getBot(params.botId)
  
  return (
    <ChatLayout selectedBot={selectedBot}/>
  );
}
