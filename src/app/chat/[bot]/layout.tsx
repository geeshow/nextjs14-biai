import React from "react";
import SelectModelMenu from "@/components/organisms/SelectModelMenu";
import ChatScrollContainer from "@/app/ui/chat/main/ChatScrollContainer";
import ChatInput from "@/app/ui/chat/main/ChatInput";
import {useRouter} from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

type Props = {
  children: React.ReactNode,
  params: {
    bot: string
  }
}
export default function ChatLayout({ children, params }: Props ) {
  return (
      <div className="flex flex-col w-full h-full">
        <div className="flex-1 sticky top-0 bg-white flex w-full p-2">
          <SelectModelMenu selectedBotId={params.bot}/>
        </div>
        <div className="flex flex-col w-full h-full overflow-hidden">
          <div className="flex flex-col w-full h-full">
            <ChatScrollContainer>
              { children }
            </ChatScrollContainer>
            <div className="px-12 relative">
              <ChatInput />
            </div>
            <div className="relative px-2 py-2 text-center text-xs text-token-text-secondary md:px-[60px]">
              <span>AI can make mistakes. Consider checking important information.</span>
            </div>
          </div>
        </div>
      </div>
  );
}
