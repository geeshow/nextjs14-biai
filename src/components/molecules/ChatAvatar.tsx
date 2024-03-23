import Image from "next/image";
import React from "react";

export default function ChatAvatar({src}: { src: string }) {
  return (
      <div className='w-6 h-6 mt-2 flex flex-col border rounded-full overflow-hidden mr-1'>
        <Image src={src}
               alt='Logo-Deca'
               width={40}
               height={40}/>
      </div>
  );
}
