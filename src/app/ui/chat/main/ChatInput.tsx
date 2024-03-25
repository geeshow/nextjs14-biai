'use client';
import {PaperAirplaneIcon, PaperClipIcon} from "@heroicons/react/24/outline";
import React, {useRef, useState} from "react";
import {useSetRecoilState} from "recoil";
import {scrollToBottomState} from "@/recoil/site";
import ChatTextarea from "@/app/ui/chat/main/ChatTextarea";
import {createChat} from "@/app/lib/actions";
import {chatMessageListState, sendMessageState} from "@/recoil/sendMessage";
import {useRouter} from "next/navigation";

export default function ChatInput({chatId, botId}: {chatId: string, botId: string}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [chatMessage, setChatMessage] = useState('');
  const setScrollToBottom = useSetRecoilState(scrollToBottomState)
  const setChatMessageList = useSetRecoilState(chatMessageListState(chatId))
  const router = useRouter();
  
  const onTextareaEnter = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setScrollToBottom((prev) => prev + 1);
    await sendChatMessage();
  }
  
  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChatMessage(e.target.value);
  }
  
  const sendChatMessage = async () => {
    if (chatMessage.trim() === '') return;
    setScrollToBottom((prev) => prev + 1);
    
    if (chatId === 'new') {
      // const result = await createChat({botId, message: chatMessage, userId: myInfo.userId});
      // router.push(`/chat/${botId}/${result.chatId}`)
    }
    else
      sendChat(chatMessage);
    
    textAreaRef.current!!.value = '';
    // setChatMessage('');
  }
  
  
  const sendChat = (message: string) => {
    // setChatMessageList((prev) => [...prev,
    //   {
    //     chatId: chatId,
    //     messageId: new Date().getMilliseconds(),
    //     botId: botId,
    //     isMine: true,
    //     content: message,
    //     avatar: myInfo.avatar,
    //     name: myInfo.name,
    //   }
    // ]);
  }
  // const createChat = (message: string) => {
  //   const newChatId = uuidv4()
  //   router.push(`/chat/${botId}/${newChatId}`)
  //
  //   addMessage((prev) => [...prev,
  //     {
  //       chatId: newChatId,
  //       messageId: new Date().getMilliseconds(),
  //       botId: botId,
  //       isMine: true,
  //       content: message,
  //       avatar: myInfo.avatar,
  //       name: myInfo.name,
  //     }
  //   ]);
  // }
  
  return (
      <div className="flex items-center w-full max-w-4xl mx-auto p-2 border border-gray-300 rounded-xl">
        <PaperClipIcon className="w-6 h-6 m-2"/>
        <ChatTextarea textAreaRef={textAreaRef} onEnter={onTextareaEnter} onChange={onTextareaChange} />
        <button onClick={sendChatMessage}>
          <PaperAirplaneIcon className={`w-12 h-12 p-2 rounded-xl border ${chatMessage.trim().length > 0 ? 'bg-blue-500 cursor-pointer' : 'bg-gray-200'} text-white`}/>
        </button>
      </div>
  );
}
