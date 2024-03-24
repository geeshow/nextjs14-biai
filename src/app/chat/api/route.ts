import {NextRequest} from "next/server";
import {headers, cookies} from "next/headers";
import {bots, chats, IChat, messages} from "@/app/chat/data";
import {v4 as uuidv4} from "uuid";

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const headerList = headers();
  
  cookies().set("resultsPerPage", "20");
  const theme = request.cookies.get("theme")
  console.log('requestHeaders', requestHeaders.get("authorization"))
  console.log('headerList', headerList.get("authorization"));
  console.log('cookie1', theme);
  console.log('cookie2', cookies().get("resultsPerPage"));
  
  return Response.json(chats)
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
