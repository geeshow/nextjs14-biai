'use client';
import ChatGptIcon from "@/components/svg/chat-gpt-icon";
import React, {useEffect, useRef, useState} from "react";
import SelectModelMenu from "@/components/organisms/SelectModelMenu";
import { PaperClipIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function Page() {
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleResizeHeight = () => {
    const maxHeight = Math.floor(document.body.offsetHeight / 3);
    textAreaRef.current!!.style.height = 'auto'; //height 초기화
    textAreaRef.current!!.style.height = Math.min(textAreaRef.current!!.scrollHeight, maxHeight) + 'px';
  };
  
  return (
      <main className="flex flex-col relative w-full h-full">
        <div className="absolute">
          <SelectModelMenu />
        </div>
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex justify-center items-center w-12 h-12 mb-2 rounded-full border">
            <ChatGptIcon/>
          </div>
          <span className="text-2xl font-bold">How can I help you today?</span>
        </div>
        <div className="flex items-center w-full p-2 border border-gray-300 rounded-xl">
          <PaperClipIcon className="w-6 h-6 m-2"/>
          <textarea ref={textAreaRef} id="prompt-textarea"
                    onChange={(e) => handleResizeHeight()}
                    style={{ height: textAreaHeight }}
                    data-id="root" placeholder="Type a message..."
                    rows={1}
                    className="m-0 w-full resize-none border-0 bg-transparent focus:ring-0 focus-visible:ring-0"
                    ></textarea>
          <PaperAirplaneIcon className="w-6 h-6 m-2"/>
        </div>
      </main>
  );
}
