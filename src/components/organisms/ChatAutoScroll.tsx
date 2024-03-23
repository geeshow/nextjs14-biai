'use client';
import React, {useEffect, useRef} from "react";
import {useRecoilValue} from "recoil";
import {scrollToBottomState} from "@/recoil/site";

export default function ChatAutoScroll() {
  const scrollToBottom = useRecoilValue(scrollToBottomState)
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current!!.scrollIntoView({ behavior: "smooth" });
  }, []);
  
  useEffect(() => {
    messagesEndRef.current!!.scrollIntoView({ behavior: "smooth" });
  }, [scrollToBottom]);
  
  return (
      <>
        <div ref={messagesEndRef}/>
      </>
  );
}
