import React, {useRef, useState} from "react";

export default function ChatTextarea(
    {onNewLine, onChange, textAreaRef}: {
      onEnter: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void,
      onNewLine: () => void,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
      textAreaRef: React.RefObject<HTMLTextAreaElement>
    }) {
  
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.nativeEvent.isComposing) return;
      
      const chatMessage = textAreaRef.current!!.value
      if (chatMessage.trim() === '') return;
      
      if (e.shiftKey) {
        textAreaRef.current!!.value += '\n';
        textAreaRef.current!!.style.height = Math.min(textAreaRef.current!!.scrollHeight, Math.floor(document.body.offsetHeight / 3)) + 'px';
        onNewLine();
      } else {
        e.currentTarget.form?.requestSubmit();
        handleResizeHeight();
      }
    }
  }
  
  const handleResizeHeight = () => {
    const preHeight = textAreaRef.current!!.style.height
    const maxHeight = Math.floor(document.body.offsetHeight / 3);
    textAreaRef.current!!.style.height = 'auto'; //height 초기화
    textAreaRef.current!!.style.height = Math.min(textAreaRef.current!!.scrollHeight, maxHeight) + 'px';
    const newHeight = textAreaRef.current!!.style.height
    if (preHeight !== newHeight) {
      setTimeout(() => {
        onNewLine();
      }, 100);
    }
  };
  
  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    handleResizeHeight();
  }
  
  return (
      <textarea ref={textAreaRef} id="prompt-textarea"
                onChange={onChangeText}
                data-id="root" placeholder="Type a message..."
                rows={1}
                onKeyDown={onKeyDown}
                required
                className="py-3 ml-7 pr-12 w-full min-h-[50px] resize-none border-0 bg-transparent focus:ring-0 focus-visible:ring-0 h-auto"
      ></textarea>
  );
}
