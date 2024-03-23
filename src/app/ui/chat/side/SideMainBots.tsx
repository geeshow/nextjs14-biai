import {MainBots} from "@/app/chat/data";
import Link from "next/link";
import {PencilSquareIcon} from "@heroicons/react/24/outline";

export default function SideMainBots() {
  return (
      <>
        {MainBots.map((mainBot) => {
          const Icon = mainBot.icon;
          return (
              <Link key={mainBot.name} href={mainBot.href}>
                <div
                    className="flex justify-between items-center rounded-md p-1 text-sm font-medium hover:bg-gray-200 cursor-pointer">
                  <div className="flex items-center gap-1">
                    <div className="w-7 h-7 border border-gray-200 rounded-full p-1">
                      <Icon />
                    </div>
                    <p className="block">{mainBot.name}</p>
                  </div>
                  <PencilSquareIcon className="w-4 h-4"/>
                </div>
              </Link>
          );
        })}
      </>
  );
}
