import {CheckIcon} from "@heroicons/react/24/outline";
import React from "react";

export default function CheckButton({checked}: {checked: boolean}) {
  return (
      <>
        {checked
          ? <div className="rounded-full w-6 h-6 border-2 border-black bg-black">
              <CheckIcon className="w-4 h-4 text-white m-[2px] font-bold" strokeWidth={3}/>
            </div>
          : <div className="rounded-full w-6 h-6 border-2 border-gray-400"/>
        }
      </>
  );
}
