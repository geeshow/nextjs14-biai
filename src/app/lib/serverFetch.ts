'use server';

import {getSession} from "@auth0/nextjs-auth0";
import {ISendMessagesDto} from "@/service/chat";
import {insertMessage, selectMessagesByChatId} from "@/repository/messages";
import {IMessages} from "@/app/lib/definitions";

export interface IGoogleUser {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
  sid: string;
}


export async function getServerSideMyInfo() {
  const { user } = await getSession() as { user: IGoogleUser };
  return {
    userId: user.email,
    name: user.name,
    avatar: user.picture,
  }
}

export async function askChatGpt(message: ISendMessagesDto) {
  const historyMessages = await selectMessagesByChatId(message.chatId)
  const sendMessage = historyMessages.map((message) => {
    return {
      role: message.is_mine ? 'user' : 'assistant',
      content: message.content
    }
  })
  sendMessage.push(
      {
        role: 'user',
        content: message.content
      }
  )
  
  console.log('sendMessage', sendMessage.length)
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: sendMessage
    })
  })
  
  const jsonData = await response.json()
  console.log('response', jsonData.choices[0].message)
  
  const insertMessageData = {
    chat_id: message.chatId,
    bot_id: message.botId,
    is_mine: false,
    content: jsonData.choices[0].message.content
  } as IMessages
  
  return await insertMessage(insertMessageData);
}
