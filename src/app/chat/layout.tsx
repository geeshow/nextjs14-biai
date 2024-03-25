import SideLayout from '@/app/ui/chat/side/SideLayout';
import SideMainBots from "@/app/ui/chat/side/SideMainBots";
import SideChats from "@/app/ui/chat/side/SideChats";
import SideUserInfo from "@/app/ui/chat/side/SideUserInfo";

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
      <div className="flex justify-center w-full h-full">
        <SideLayout>
          <div className="fixed top-0">
            <div className="flex w-sidebar min-h-screen flex-col justify-between pl-2 bg-gray-100">
              <div className="py-4">
                <SideMainBots/>
              </div>
              <div className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
                <div className="w-full h-full absolute pr-2">
                  <SideChats/>
                </div>
              </div>
              <div>
                <div className="h-5"></div>
                <SideUserInfo/>
              </div>
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
