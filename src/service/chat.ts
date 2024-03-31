'use server';
import {selectChatById, selectChatByUserId, updateLastMessage} from "@/repository/chats";
import {IChatMessageWithUserInfo} from "@/recoil/chat";
import {insertMessage, selectMessagesByChatId, updateMessage} from "@/repository/messages";
import {askChatGpt, askClaude, getServerSideMyInfo, IGoogleUser} from "@/app/lib/serverFetch";
import {IChats, IMessages} from "@/app/lib/definitions";
import {selectBotById} from "@/repository/bots";
import {getSession, Session} from "@auth0/nextjs-auth0";
import {sql} from "@vercel/postgres";

export async function getChat(chatId: string) {
  try {
    const { user } = await getSession() as { user: IGoogleUser };
    const chat = await selectChatById(chatId)
    const bot = await selectBotById(chat.bot_id)
    const messages = await selectMessagesByChatId(chat.id)
    const result = [] as IChatMessageWithUserInfo[]
    
    messages.forEach((message) => {
      result.push({
        chatId: message.chat_id,
        messageId: message.id,
        botId: message.bot_id,
        content: message.input_content,
        name: user.name,
        avatar: user.picture
      })
      result.push({
        chatId: message.chat_id,
        messageId: message.id,
        botId: message.bot_id,
        content: message.output_content,
        name: bot.name,
        avatar: bot.avatar
      })
    });
    
    return result;
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

export type ISendMessagesDto = {
  chatId: string;
  botId: string;
  content: string;
}
export async function sendChatMessageToServer(message: ISendMessagesDto) {
  try {
    const bot = await selectBotById(message.botId);
    const user = await getServerSideMyInfo();
    const insertMessageData = {
      chat_id: message.chatId,
      bot_id: message.botId,
      input_content: message.content
    } as IMessages
    
    const newMessage = await insertMessage(insertMessageData);
    await updateLastMessage(user.userId, message.chatId);
    
    if (bot.brand === 'gpt') {
      const responseMessage = await askChatGpt(bot, message);
      await updateMessage(newMessage.id, responseMessage);
    } else if (bot.brand === 'claude') {
      const responseMessage = await askClaude(bot, message);
      await updateMessage(newMessage.id, responseMessage);
    }
  } catch (e) {
    throw e;
  }
}
export async function createChat(userId: string, message: ISendMessagesDto) {
  try {
    const datetime = new Date().toISOString();
    return await sql`
        INSERT INTO chats (user_id, bot_id, title, last_message_date)
        VALUES (${userId}, ${message.botId}, ${message.content}, ${datetime})
        RETURNING *;
        `
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}
