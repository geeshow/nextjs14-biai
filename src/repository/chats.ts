import {IChats} from "@/app/lib/definitions";
import {sql} from "@vercel/postgres";

export async function selectChatById(id: string) {
  try {
    const data = await sql`SELECT * FROM chats WHERE chats.id = ${id}`;
    
    if (data.rows.length === 0) {
      throw new Error('Chat not found');
    }
    
    return data.rows[0] as IChats;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}

export async function selectChatByUserId(userId: string) {
  try {
    const data = await sql`SELECT * FROM chats WHERE chats.user_id = ${userId}`;
    return data.rows as IChats[];
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}
