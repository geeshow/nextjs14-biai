'use server';

import {z} from 'zod';
import {sql} from '@vercel/postgres';
import {revalidatePath} from 'next/cache';
import {bots, chats, IChat, messages} from "@/app/chat/data";
import {v4 as uuidv4} from 'uuid';
import {IChatMessage, IChatMessageWithUserInfo} from "@/recoil/chat";
import {getMyInfo} from "@/app/lib/serverFetch";
import {AuthError} from "next-auth";
import {signIn} from "@/auth";
// const FormSchema = z.object({
//   id: z.string(),
//   customerId: z.string({
//     invalid_type_error: 'Please select a customer.',
//   }),
//   amount: z.coerce
//       .number()
//       .gt(0, { message: 'Please enter an amount greater than $0.' }),
//   status: z.enum(['pending', 'paid'], {
//     invalid_type_error: 'Please select an invoice status.',
//   }),
//   date: z.string(),
// });
const FormSchema = z.object({
  botId: z.string(),
  chatId: z.string(),
  message: z.string(),
  userId: z.string(),
});


const CreateChat = FormSchema.omit({ chatId: true});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
export async function createChat({botId, userId, message}: {botId: string, userId: string, message: string}) {
  const chatId = uuidv4();
  const newChat = {
    chatId,
    userId,
    title: message,
    lastMessageDate: new Date().toISOString(),
    botId,
  } as IChat
  chats.push(newChat);
  
  const newMessage = {
    chatId,
    messageId: new Date().getMilliseconds(),
    botId,
    isMine: true,
    content: message,
  } as IChatMessage
  messages.push(newMessage);
  
  revalidatePath('/chat/g4');
  console.log('createChat', chats);
  return {
    ...newChat
  }
}


export async function getChatList(userId: string) {
  return chats
      .filter((item) => item.userId === userId)
      .map((chat) => {
        const bot = bots.filter((item) => item.botId === chat.botId)
        return {
          ...chat,
          bot: bot[0]
        }
      })
      .sort((a, b) => {
        return new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime()
      });
}
export async function groupedChatList(userId: string) {
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
  
  const chatList = await getChatList(userId)
  chatList.forEach(chat => {
    const postDate = new Date(chat.lastMessageDate);
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

export async function getChat(chatId: string) {
  try {
    const myInfo = getMyInfo()
    const chat = chats.filter((item) => item.chatId === chatId)
    const bot = bots.filter((item) => item.botId === chat[0].botId)
    return messages
        .filter((item) => item.chatId === chatId)
        .map((message) => {
          return {
            ...message,
            name: message.isMine ? myInfo.name : bot[0].name,
            avatar: message.isMine ? myInfo.avatar : bot[0].avatar,
          } as IChatMessageWithUserInfo
        })
  } catch (e) {
    throw e;
  }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
