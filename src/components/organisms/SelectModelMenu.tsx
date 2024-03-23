'use client';
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import React from "react";
import SelectModelList from "@/components/organisms/SelectModelList";
import Image from "next/image";
import {getBot} from "@/app/lib/serverFetch";

export default function SelectModelMenu({selectedBotId}: {selectedBotId:string}) {
  const selectedBot = getBot(selectedBotId)
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
        <Image src={selectedBot.avatar} alt={selectedBot.name} width={20} height={20} className="rounded-full mr-2"/>
        <div className="inline-flex items-center justify-center pr-2 text-center font-medium rounded-xl">
          {selectedBot.name}
        </div>
        <ChevronDownIcon className="w-3"/>
      </div>
      { isOpen && <SelectModelList selectedBotId={selectedBotId} /> }
    </div>
  );
}
