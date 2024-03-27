'use server';
import {IMessages} from "@/app/lib/definitions";
import {sql} from "@vercel/postgres";

export async function selectMessagesByChatId(chatId: string) {
  try {
    const data = await sql`SELECT * FROM messages WHERE chat_id = ${chatId}`;
    return data.rows as IMessages[];
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}


export async function insertMessage(message: IMessages) {
  try {
    const data = await sql`
        INSERT INTO messages (chat_id, bot_id, is_mine, content)
        VALUES (${message.chat_id}, ${message.bot_id}, ${message.is_mine}, ${message.content})
        RETURNING *`;
    return data.rows[0] as IMessages;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}
