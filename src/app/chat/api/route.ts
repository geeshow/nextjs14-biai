import {NextRequest} from "next/server";
import {headers, cookies} from "next/headers";
import {bots, chats, IChat, messages} from "@/app/chat/data";
import {v4 as uuidv4} from "uuid";
import {selectBotAll} from "@/repository/bots";

export async function GET() {
  const bots = await selectBotAll();
  console.log('bots', bots)
  return Response.json(bots)
}
export async function POST(request: NextRequest) {
  const chat = await request.json()
  chat.chatId = uuidv4();
  chats.push(chat)
  return new Response(JSON.stringify(chat), {
        headers: {
          "content-type": "application/json"
        },
        status: 201,
      }
  )
}
