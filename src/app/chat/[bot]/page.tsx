import React from "react";
import {getBot} from "@/app/lib/serverFetch";
import Image from "next/image";

type Props = {
  params: {
    bot: string
  }
}

export default function Page({params}: Props) {
  const selectedBot = getBot(params.bot)
  
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex justify-center items-center w-12 h-12 mb-2 rounded-full border">
        <Image src={selectedBot.avatar} alt={selectedBot.name} width={36} height={36} className="rounded-full"/>
      </div>
      <span className="text-2xl font-bold">{selectedBot.description}</span>
    </div>
  );
}
