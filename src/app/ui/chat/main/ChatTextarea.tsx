import React, {useRef, useState} from "react";

export default function ChatTextarea(
    {onEnter, onChange, textAreaRef}: {
      onEnter: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
      textAreaRef: React.RefObject<HTMLTextAreaElement>
    }) {
  
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      console.log('onKeyDown')
      e.preventDefault();
      if (e.nativeEvent.isComposing) return;
      
      const chatMessage = textAreaRef.current!!.value
      if (chatMessage.trim() === '') return;
      
      if (e.shiftKey) {
        textAreaRef.current!!.value += '\n';
        textAreaRef.current!!.style.height = Math.min(textAreaRef.current!!.scrollHeight, Math.floor(document.body.offsetHeight / 3)) + 'px';
      } else {
        onEnter(e);
        handleResizeHeight();
      }
    }
  }
  
  const handleResizeHeight = () => {
    const maxHeight = Math.floor(document.body.offsetHeight / 3);
    textAreaRef.current!!.style.height = 'auto'; //height 초기화
    textAreaRef.current!!.style.height = Math.min(textAreaRef.current!!.scrollHeight, maxHeight) + 'px';
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
                className="m-0 w-full resize-none border-0 bg-transparent focus:ring-0 focus-visible:ring-0 h-auto"
      ></textarea>
  );
}
