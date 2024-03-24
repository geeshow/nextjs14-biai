import React from "react";

export default function SideIconButton({children, title}: { children: React.ReactNode, title: String}) {
  return (
      <div className="flex items-center gap-1 overflow-hidden">
        <div className="min-w-[22px] max-w-[22px]">
          {children}
        </div>
        <p className="block text-ellipsis bg-clip-text whitespace-nowrap">{title}</p>
      </div>
  );
}
