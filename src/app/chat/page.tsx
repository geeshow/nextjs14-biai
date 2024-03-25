import React from "react";
import {getBot} from "@/app/lib/serverFetch";
import Image from "next/image";
import ChatScrollContainer from "@/app/ui/chat/main/ChatScrollContainer";
import ChatInput from "@/app/ui/chat/main/ChatInput";
import ChatLayout from "@/app/ui/chat/ChatLayout";

export default function Page() {
  const selectedBot = getBot('g4')
  
  return (
      <>
      </>
  );
}
