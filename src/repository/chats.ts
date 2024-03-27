import {IChats, IMessages} from "@/app/lib/definitions";
import {sql} from "@vercel/postgres";
import {ISendMessagesDto} from "@/service/chat";

export async function selectChatById(id: string) {
  try {
    const data = await sql`SELECT * FROM chats WHERE chats.id = ${id}`;
    
    if (data.rows.length === 0) {
      throw new Error('Chat not found');
    }
    console.log('selectChatById')
    return data.rows[0] as IChats;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}

export async function selectChatByUserId(userId: string) {
  try {
    const data
        = await sql`SELECT * FROM chats WHERE chats.user_id = ${userId} order by last_message_date desc`
    console.log('selectChatByUserId')
    return data.rows as IChats[];
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}

export async function updateLastMessage(userId: string, chatId: string) {
  try {
    const datetime = new Date().toISOString();
    await sql`
        UPDATE chats
          SET last_message_date = ${datetime}
        WHERE id = ${chatId}
          AND user_id = ${userId}
        `
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}

