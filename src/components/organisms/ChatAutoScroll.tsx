'use client';
import React, {useEffect, useRef} from "react";

export default function ChatAutoScroll({actionScroll}:{actionScroll: number}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current!!.scrollIntoView({ behavior: "instant" });
  }, []);
  
  useEffect(() => {
    messagesEndRef.current!!.scrollIntoView({ behavior: "smooth" });
  }, [actionScroll]);
  
  return (
      <>
        <div ref={messagesEndRef}/>
      </>
  );
}
