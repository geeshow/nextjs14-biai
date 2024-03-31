'use client'
import React, {useCallback, useEffect, useOptimistic, useState} from 'react'
import ChatMessageLayout from "@/app/ui/chat/main/ChatMessageLayout";
import {IChatMessageWithUserInfo} from "@/recoil/chat";
import ChatAutoScroll from "@/components/organisms/ChatAutoScroll";
import ScrollDownButton from "@/components/atoms/ScrollDownButton";
import ChatScrollContainer from "@/app/ui/chat/main/ChatScrollContainer";
import ChatInput from "@/app/ui/chat/main/ChatInput";
import {useParams} from "next/navigation";
import {useRecoilState} from "recoil";
import {scrollToBottomState} from "@/recoil/site";
import ChatLayout from "@/app/ui/chat/ChatLayout";

export default function ChatList({messages}: {messages: IChatMessageWithUserInfo[]}) {
  const [actionScroll, setActionScroll] = useRecoilState<number>(scrollToBottomState);
  const [isShowScrollBottom, setShowScrollBottom] = useState<boolean>(false);
  const [optimisticMessages, addOptimisticMessages] = useOptimistic(
      messages,
      (prevMessages, newMessage) => {
        return [...prevMessages, newMessage] as IChatMessageWithUserInfo[];
      },
  );
  
  const moveToBottom = useCallback(() => {
    setActionScroll((prev) => prev + 1);
  }, [setActionScroll])
  
  const showScrollButton = useCallback((isBottom: boolean) => {
    setShowScrollBottom(isBottom);
  }, [setShowScrollBottom]);
  
  return (
      <>
        <ChatScrollContainer showScrollButton={showScrollButton}>
          <div className="flex flex-col justify-center items-center w-full max-w-4xl">
            {
              optimisticMessages.map((message: IChatMessageWithUserInfo, index: number) => {
                return (
                    <>
                      <ChatMessageLayout key={`${index}R`} content={message.content} name={message.name} avatar={message.avatar}/>
                    </>
                );
              })
            }
          </div>
          <ChatAutoScroll actionScroll={actionScroll}/>
        </ChatScrollContainer>
        <div className="px-8 m-1 relative">
          <ChatInput addOptimisticMessages={addOptimisticMessages}/>
          <button
              className={`w-8 h-8 text-gray-600 rounded-full bg-white cursor-pointer z-10 border absolute -top-12 left-1/2 ${isShowScrollBottom ? 'block' : 'hidden'}`}
              onClick={moveToBottom}
          >
            <ScrollDownButton/>
          </button>
        </div>
      </>
  );
}
