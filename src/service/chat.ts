import {selectChatById, selectChatByUserId} from "@/repository/chats";
import {fetchBotById} from "@/repository/bots";
import {IChatMessageWithUserInfo} from "@/recoil/chat";
import {fetchMessagesByChatId} from "@/repository/messages";
import {getServerSideMyInfo} from "@/app/lib/serverFetch";
import {IChat} from "@/app/chat/data";
import {getChatList} from "@/app/lib/actions";
import {IChats} from "@/app/lib/definitions";

export async function getChat(chatId: string) {
  try {
    const chat = await selectChatById(chatId)
    const bot = await fetchBotById(chat.bot_id)
    if (!bot) {
      throw new Error('Bot not found')
    }
    const messages = await fetchMessagesByChatId(chat.id)
    
    return messages
        .map((message) => {
          return {
            chatId: message.chat_id,
            messageId: message.id,
            botId: message.bot_id,
            isMine: message.is_mine,
            content: message.content,
            name: bot.name,
            avatar: bot.avatar
          } as IChatMessageWithUserInfo
        })
  } catch (e) {
    throw e;
  }
}

export async function groupedChatList() {
  const user = await getServerSideMyInfo();
  const userId = user.userId;
  
  const grouped = {
    today: [] as IChats[],
    yesterday: [] as IChats[],
    last7Days: [] as IChats[],
    last30Days: [] as IChats[],
    byMonth: {} as any,
    byYear: {} as any
  };
  
  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // 하루의 밀리초
  
  const chatList = await selectChatByUserId(userId)
  chatList.forEach(chat => {
    const postDate = new Date(chat.last_message_date);
    const diffDays = Math.round((now.getTime() - postDate.getTime()) / oneDay);
    
    if(diffDays === 0) grouped.today.push(chat);
    else if (diffDays === 1) grouped.yesterday.push(chat);
    else if (diffDays <= 7) grouped.last7Days.push(chat);
    else if (diffDays <= 30) grouped.last30Days.push(chat);
    else if (postDate.getFullYear() === now.getFullYear()) {
      const monthKey = `${postDate.getMonth()}`;
      if (!grouped.byMonth[monthKey]) {
        grouped.byMonth[monthKey] = [];
      }
      grouped.byMonth[monthKey].push(chat);
    } else {
      // 지난해부터 처음까지 각 해별 게시글 목록
      const yearKey = postDate.getFullYear().toString();
      if (!grouped.byYear[yearKey]) {
        grouped.byYear[yearKey] = [];
      }
      grouped.byYear[yearKey].push(chat);
    }
  });
  
  return grouped;
}
