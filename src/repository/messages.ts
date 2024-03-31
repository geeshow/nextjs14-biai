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
        INSERT INTO messages (chat_id, bot_id, input_content, output_content, input_tokens, output_tokens, input_price, output_price, finish_reason)
        VALUES (${message.chat_id}, ${message.bot_id}, ${message.input_content}, ${message.output_content}, ${message.input_tokens}, ${message.output_tokens}, ${message.input_price}, ${message.output_price}, ${message.finish_reason})
        RETURNING *`;
    return data.rows[0] as IMessages;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}

export async function updateMessage(id: string, message: IMessages) {
  try {
    const data = await sql`
        UPDATE messages
            set output_content = ${message.output_content}
              , input_tokens = ${message.input_tokens}
              , output_tokens = ${message.output_tokens}
              , input_price = ${message.input_price}
              , output_price = ${message.output_price}
              , finish_reason = ${message.finish_reason}
        WHERE id = ${id}
        RETURNING *`;
    return data.rows[0] as IMessages;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}
