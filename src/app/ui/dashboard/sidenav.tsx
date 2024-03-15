'use client';
import Link from 'next/link';
import {HomeIcon, PencilSquareIcon} from '@heroicons/react/24/outline';
import clsx from "clsx";
import ChatGptIcon from "@/components/svg/chat-gpt-icon";
import {usePathname} from "next/navigation";

const links = [
  { name: 'ChatGPT', href: '/chat', icon: ChatGptIcon },
  { name: 'Home', href: '/chat', icon: HomeIcon },
];

export default function SideNav() {
  const pathname = usePathname()
  
  return (
    <div className="flex w-56 min-h-screen flex-col px-3 py-4 md:px-2 bg-gray-100">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
            <div key={link.name}
                className="flex justify-between items-center rounded-md p-1 text-sm font-medium hover:bg-gray-200 cursor-pointer"
            >
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 border border-gray-200 rounded-full p-1">
                  <LinkIcon />
                </div>
                <p className="hidden md:block">{link.name}</p>
              </div>
              <PencilSquareIcon className="w-5 h-5" />
            </div>
        );
      })}
    </div>

);
}
