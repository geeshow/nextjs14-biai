import ChatAvatar from "@/app/ui/chat/main/ChatAvatar";
import ChatContent from "@/app/ui/chat/main/ChatContent";
import React from "react";

export default function ChatMessageLayout({content, avatar, name}: { content: string, name: string, avatar: string }) {
  return (
      <div className="flex w-full my-3">
        <div>
          <ChatAvatar src={avatar}/>
        </div>
        <div className='w-full'>
          <div className="font-semibold">{name}</div>
          <ChatContent content={content}/>
        </div>
      </div>
  );
}
