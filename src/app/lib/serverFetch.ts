import {bots, chats, IChat, messages} from "@/app/chat/data";

export function getChatList(userId: string) {
  return chats.filter((item) => item.userId === userId).map((chat) => {
    const bot = bots.filter((item) => item.botId === chat.botId)
    console.log('bot', bots);
    return {
      ...chat,
      bot: bot[0]
    }
  })
}
export function groupedChatList(userId: string) {
  const grouped = {
    today: [] as IChat[],
    yesterday: [] as IChat[],
    last7Days: [] as IChat[],
    last30Days: [] as IChat[],
    byMonth: {} as any,
    byYear: {} as any
  };
  
  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // 하루의 밀리초
  
  const chatList = getChatList(userId)
  chatList.forEach(chat => {
    const postDate = new Date(chat.lastMessageDate);
    const diffDays = Math.round((now.getMilliseconds() - postDate.getMilliseconds()) / oneDay);
    
    if(diffDays === 0) grouped.today.push(chat);
    else if (diffDays === 1) grouped.yesterday.push(chat);
    else if (diffDays <= 7) grouped.last7Days.push(chat);
    else if (diffDays <= 30) grouped.last30Days.push(chat);
    else if (postDate.getFullYear() === now.getFullYear()) {
      const monthKey = `${postDate.getMonth() + 1}-${postDate.getFullYear()}`;
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


export function getChat(chatId: string) {
  const chat = chats.filter((item) => item.chatId === chatId)
  const chatMessages = messages.filter((item) => item.chatId === chatId)
  const bot = bots.filter((item) => item.botId === chat[0].botId)
  return {
    chat: chat[0],
    messages: chatMessages,
    bot: bot[0]
  }
}

export function getMyInfo() {
  return {
    userId: '0',
    name: 'You',
    avatar: '/user2.png',
  }
}

export function getBot(botId: string) {
  const bot = bots.find(bot => bot.botId === botId)
  return bot ? bot : bots[0]
}
