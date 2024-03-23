'use client';
import React from "react";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {bots} from "@/app/chat/data";
import Image from "next/image";
import CheckButton from "@/components/molecules/CheckButton";
import {currentChatState} from "@/recoil/chat";
import {useRecoilState} from "recoil";
import Link from "next/link";

export default function SelectModelList({selectedBotId}: {selectedBotId:string}) {
  return (
    <section className="relative text-sm">
      <div className="absolute">
        <div className="w-max border rounded-xl bg-white overflow-hidden">
          {
            bots.map((bot, index) => (
              <Link key={index}
                    href={`/chat/${bot.botId}`}
                   className="group flex justify-between items-center cursor-pointer hover:bg-gray-100">
                <div className="flex items-center gap-4 p-2">
                  <Image src={bot.avatar} alt={bot.name} width={32} height={32} className="rounded-full"/>
                  <dl className="flex-col">
                    <dt className="content-start justify-start">
                      {bot.name}
                    </dt>
                    <dd className="content-start justify-start text-gray-400">
                      {bot.description}
                    </dd>
                  </dl>
                </div>
                <div className="flex justify-end m-3 w-32">
                  <div className="group-hover:hidden block">
                    <CheckButton checked={bot.botId === selectedBotId} />
                  </div>
                  <div className="hidden items-center group-hover:flex">
                    <div>New Chat</div>
                    <PencilSquareIcon className="w-4 h-4 ml-1"/>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </section>
  );
};
