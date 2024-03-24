'use client';
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useSetRecoilState} from "recoil";
import {scrollToBottomState} from "@/recoil/site";
import ScrollDownButton from "@/components/atoms/ScrollDownButton";

export default function ChatScrollContainer({children} : {children: React.ReactNode}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrollToBottom, setIsScrollBottom] = useState(false);
  const setScrollToBottom = useSetRecoilState(scrollToBottomState)
  
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const gap = 15;
    const isBottom = scrollHeight - scrollTop - gap > clientHeight;
    setIsScrollBottom(isBottom);
  }, [setIsScrollBottom]);
  
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
  
  
  const moveToBottom = () => {
    setScrollToBottom((prev) => prev + 1);
  }
  
  return (
      <div ref={scrollContainerRef} className="flex-1 overflow-y-scroll px-12">
        {children}
        <div className="relative flex justify-center">
          <button className={`w-8 h-8 text-gray-600 rounded-full bg-white cursor-pointer z-10 border fixed bottom-28 ${isScrollToBottom ? 'block': 'hidden'}`}
                  onClick={moveToBottom}
          >
            <ScrollDownButton />
          </button>
        </div>
      </div>
  );
}
