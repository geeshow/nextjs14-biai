import {ChevronDownIcon} from "@heroicons/react/24/outline";
import React from "react";
import Image from "next/image";
import SelectModelClient from "@/components/organisms/SelectModelClient";
import {selectBotById} from "@/repository/bots";

export default async function SelectModelMenu({selectedBotId}: {selectedBotId:string}) {
  const selectedBot = await selectBotById(selectedBotId)
  return (
    <div>
      <SelectModelClient selectedBotId={selectedBotId}>
        <Image src={selectedBot.avatar} alt={selectedBot.name} width={20} height={20} className="rounded-full mr-2"/>
        <div className="inline-flex items-center justify-center pr-2 text-center font-medium rounded-xl">
          {selectedBot.name}
        </div>
        <ChevronDownIcon className="w-3"/>
      </SelectModelClient>
    </div>
  );
}
