'use client';
import {clsx} from "clsx";
import {ArrowPathIcon, PaperAirplaneIcon} from "@heroicons/react/24/outline";
import React from "react";
import {useFormStatus} from "react-dom";

export default function ChatSubmitButton({disabled, onSend}: {disabled: boolean, onSend: Function}) {
  const { pending } = useFormStatus()
  
  return (
      <button className={
        clsx("absolute right-3 bottom-2 rounded-xl border text-white",
            "bg-blue-500 cursor-pointer aria-disabled:cursor-not-allowed aria-disabled:bg-gray-200"
            // chatMessage.trim().length > 0 ? 'bg-blue-500 cursor-pointer' : 'bg-gray-200'
        )}
              aria-disabled={disabled || pending}>
        { !pending && <PaperAirplaneIcon className={`w-8 h-8 p-2`}/> }
        { pending && <ArrowPathIcon className="w-8 h-8 p-2 animate-spin text-gray-700 font-bold"/> }
      </button>
  );
}
