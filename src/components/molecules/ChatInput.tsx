'use client';
import {PaperAirplaneIcon, PaperClipIcon} from "@heroicons/react/24/outline";
import React, {useRef, useState} from "react";
import {useSetRecoilState} from "recoil";
import {scrollToBottomState} from "@/recoil/site";

export default function ChatInput() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [chatMessage, setChatMessage] = useState('');
  const setScrollToBottom = useSetRecoilState(scrollToBottomState)
  
  const handleResizeHeight = () => {
    const maxHeight = Math.floor(document.body.offsetHeight / 3);
    textAreaRef.current!!.style.height = 'auto'; //height 초기화
    textAreaRef.current!!.style.height = Math.min(textAreaRef.current!!.scrollHeight, maxHeight) + 'px';
  };
  
  const onEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.nativeEvent.isComposing) return;
      if (chatMessage.trim() === '') return;
      
      setScrollToBottom((prev) => prev + 1);
      
      if (e.shiftKey) {
        textAreaRef.current!!.value += '\n';
        textAreaRef.current!!.style.height = Math.min(textAreaRef.current!!.scrollHeight, Math.floor(document.body.offsetHeight / 3)) + 'px';
      } else {
        sendChatMessage();
      }
    }
  }
  
  const sendChatMessage = () => {
    if (chatMessage.trim() === '') return;
    setScrollToBottom((prev) => prev + 1);
    sendChat(chatMessage);
    textAreaRef.current!!.value = '';
    setChatMessage('');
  }
  
  
  const sendChat = (message: string) => {
    // setSendMessage(message);
    // setMessages((prev) => [...prev,
    //   {
    //     messageId: prev[prev.length-1].messageId + 1,
    //     botId: 0,
    //     isMine: true,
    //     content: message,
    //   }
    // ]);
  }
  
  return (
      <div className="flex items-center w-full max-w-4xl mx-auto p-2 border border-gray-300 rounded-xl">
        <PaperClipIcon className="w-6 h-6 m-2"/>
        <textarea ref={textAreaRef} id="prompt-textarea"
                  onChange={(e) => {
                    handleResizeHeight();
                    setChatMessage(e.target.value);
                  }}
                  style={{height: textAreaHeight}}
                  data-id="root" placeholder="Type a message..."
                  rows={1}
                  onKeyDown={onEnter}
                  className="m-0 w-full resize-none border-0 bg-transparent focus:ring-0 focus-visible:ring-0"
        ></textarea>
        <PaperAirplaneIcon
            className={`w-12 h-12 p-2 rounded-xl border ${chatMessage.trim().length > 0 ? 'bg-blue-500 cursor-pointer' : 'bg-gray-200'} text-white`}
            onClick={sendChatMessage}
        />
      </div>
  );
}
