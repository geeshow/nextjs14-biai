'use client';
import {PaperClipIcon} from "@heroicons/react/24/outline";
import React, {useRef, useState} from "react";
import ChatTextarea from "@/app/ui/chat/main/ChatTextarea";
import {createChat, ISendMessagesDto, sendChatMessageToServer} from "@/service/chat";
import {useUser} from "@auth0/nextjs-auth0/client";
import {useParams} from "next/navigation";
import ChatSubmitButton from "@/app/ui/chat/main/ChatSubmitButton";
import {useRecoilState} from "recoil";
import {scrollToBottomState} from "@/recoil/site";

const initialState = {
  message: '',
}
export default function ChatInput({addOptimisticMessages}: {addOptimisticMessages: Function}) {
  const [actionScroll, setActionScroll] = useRecoilState<number>(scrollToBottomState);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [chatMessage, setChatMessage] = useState('');
  const { user, error, isLoading } = useUser();
  let {chatId, botId} = useParams<{chatId: string, botId: string}>()
  
  const onNewLine = () => {
    setActionScroll((prev: number) => prev + 1);
  }
  
  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // setActionScroll((prev: number) => prev + 1);
    setChatMessage(e.target.value.trim());
  }
  
  const sendChatMessage = async () => {
    textAreaRef.current!!.value = '';
    textAreaRef.current!!.style.height = 'auto'; //height 초기화
    setActionScroll((prev: number) => prev + 1);
    onNewLine();
    console.log('sendChatMessage');
    
    const sendMessageDto = {
      chatId: chatId,
      botId: botId,
      content: chatMessage,
    } as ISendMessagesDto
    
    if (chatId === undefined) {
      const newChat = await createChat(user?.email as string, sendMessageDto);
      sendMessageDto.chatId = newChat.rows[0].id;
    }
    
    addOptimisticMessages({
      chatId: sendMessageDto.chatId,
      messageId: 0,
      botId: botId,
      isMine: true,
      content: chatMessage,
      name: user?.name,
      avatar: user?.picture
    });
    
    await sendChatMessageToServer(sendMessageDto);
    return {
      message: 'success',
    }
  }
  
  return (
    <form action={sendChatMessage} className="relative flex items-center w-full max-w-4xl mx-auto overflow-hidden border border-gray-300 rounded-xl">
      <div className="absolute bottom-2">
        <PaperClipIcon className="w-5 h-5 m-2"/>
      </div>
      <ChatTextarea textAreaRef={textAreaRef} onNewLine={onNewLine} onEnter={sendChatMessage} onChange={onTextareaChange} />
      <ChatSubmitButton disabled={chatMessage.trim().length === 0} onSend={onNewLine} />
    </form>
  );
}
