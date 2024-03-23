import SideLayout from '@/app/ui/chat/side/SideLayout';
import SideMainBots from "@/app/ui/chat/side/SideMainBots";
import SideChats from "@/app/ui/chat/side/SideChats";

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
      <div className="flex justify-center w-full h-full">
        <SideLayout>
          <div className="fixed top-0">
            <div className="flex w-56 min-h-screen flex-col px-3 py-4 md:px-2 bg-gray-100">
              <SideMainBots />
              <div className="h-10"></div>
              <SideChats />
            </div>
          </div>
        </SideLayout>
        <main className="flex w-full min-h-screen bg-white z-0">
          <div className="flex justify-start w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
  );
}
