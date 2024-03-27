'use client';
import React, {useCallback, useEffect, useRef} from "react";
import ChatInput from "@/app/ui/chat/main/ChatInput";

export default function ChatScrollContainer({children, showScrollButton} : {children: React.ReactNode, showScrollButton: Function}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const gap = 15;
    const isBottom = scrollHeight - scrollTop - gap > clientHeight;
    showScrollButton(isBottom);
  }, [showScrollButton]);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);
  
  return (
      <>
        <div ref={scrollContainerRef} className="flex flex-col items-center flex-1 overflow-y-scroll px-12">
          { children }
        </div>
      </>
  );
}
