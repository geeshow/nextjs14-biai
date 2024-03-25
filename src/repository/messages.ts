import {IChats, IMessages} from "@/app/lib/definitions";
import {find, findOne} from "@/repository/base";

export async function fetchMessagesByChatId(chatId: string) {
  return await find<IMessages[]>(`SELECT * FROM messages WHERE chats.id = ${chatId}`);
}
