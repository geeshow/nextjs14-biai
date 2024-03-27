'use server';

import {z} from 'zod';
import {revalidatePath} from 'next/cache';
import {bots, chats, IChat, messages} from "@/app/chat/data";
import {v4 as uuidv4} from 'uuid';
import {IChatMessage} from "@/recoil/chat";
import {getServerSideMyInfo} from "@/app/lib/serverFetch";
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


