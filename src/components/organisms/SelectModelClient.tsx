'use client';
import React from "react";
import SelectModelList from "@/components/organisms/SelectModelList";

export default function SelectModelClient({children, selectedBotId}: {children: React.ReactNode, selectedBotId: string}) {
  const [ isOpen, setIsOpen ] = React.useState(false)
  
  React.useEffect(() => {
    const close = (e: MouseEvent) => {
      if (e.target instanceof Element && !e.target.closest('#SelectModelMenu')) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])
  
  return (
      <div>
        <div id="SelectModelMenu" className="flex items-center justify-center hover:bg-gray-100 rounded-xl p-2 mb-2 cursor-pointer"
             onClick={() => setIsOpen(!isOpen)}
        >
          {children}
        </div>
        { isOpen && <SelectModelList selectedBotId={selectedBotId} /> }
      </div>
  );
}
