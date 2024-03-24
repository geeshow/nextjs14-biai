import {getMyInfo} from "@/app/lib/serverFetch";
import React from "react";
import {groupedChatList} from "@/app/lib/actions";
import SideChatsGroup from "@/app/ui/chat/side/SideChatsGroup";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
export default async function SideChats() {
  const myInfo = getMyInfo()
  const chatGroup = await groupedChatList(myInfo.userId)
  console.log('chatGroup', chatGroup);
  return (
      <>
        {chatGroup.today.length > 0 && <SideChatsGroup groupName="Today" chatsInGroup={chatGroup.today} />}
        {chatGroup.yesterday.length > 0 && <SideChatsGroup groupName="Yesterday" chatsInGroup={chatGroup.yesterday} />}
        {chatGroup.last7Days.length > 0 && <SideChatsGroup groupName="Previous 7 Days" chatsInGroup={chatGroup.last7Days} />}
        {chatGroup.last30Days.length > 0 && <SideChatsGroup groupName="Previous 30 Days" chatsInGroup={chatGroup.last30Days} />}
        {
          chatGroup.byMonth && Object.keys(chatGroup.byMonth)
                .sort((a, b) => parseInt(b) - parseInt(a))
                .map((month, index) => {
                  return <SideChatsGroup key={index} groupName={monthNames[parseInt(month)]} chatsInGroup={chatGroup.byMonth[month]} />
                })
        }
        {
          chatGroup.byYear && Object.keys(chatGroup.byYear)
                .sort((a, b) => parseInt(b) - parseInt(a))
                .map((year, index) => {
                  return <SideChatsGroup key={index} groupName={year} chatsInGroup={chatGroup.byYear[year]} />
                })
        }
      </>
  );
}
