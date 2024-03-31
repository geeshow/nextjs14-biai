'use server';

import {getSession} from "@auth0/nextjs-auth0";
import {ISendMessagesDto} from "@/service/chat";
import {insertMessage, selectMessagesByChatId} from "@/repository/messages";
import {IBots, IMessages} from "@/app/lib/definitions";

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

async function getHistoryMessages(chatId: string) {
  const historyMessages = await selectMessagesByChatId(chatId)
  let sendMessages: { role: string; content: string; }[] = []
  historyMessages
      .filter(message => message.input_content && message.output_content)
      .forEach((message) => {
        sendMessages.push({
          role: 'user',
          content: message.input_content
        })
        sendMessages.push({
          role: 'assistant',
          content: message.output_content
        })
      })
  
  return sendMessages
}
export async function askChatGpt(bot: IBots, message: ISendMessagesDto) {
  const sendMessages = await getHistoryMessages(message.chatId)
  sendMessages.push({
      role: 'user',
      content: message.content
  } )
  
  console.log('sendMessage', sendMessages.length)
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bot.token}`
    },
    body: JSON.stringify({
      model: bot.model,
      messages: sendMessages
    })
  })
  
  const jsonData = await response.json()
  console.log('response', jsonData)
  if (jsonData.error) {
    throw new Error(jsonData.error.message)
  }
  
  return {
    output_content: jsonData.choices[0].message.content,
    input_tokens: jsonData.usage.prompt_tokens,
    output_tokens: jsonData.usage.completion_tokens,
    input_price: bot.price_input * jsonData.usage.prompt_tokens,
    output_price: bot.price_output * jsonData.usage.completion_tokens,
    finish_reason: jsonData.choices[0].finish_reason,
  } as IMessages
}
export async function askClaude(bot: IBots, message: ISendMessagesDto) {
  const sendMessages = await getHistoryMessages(message.chatId)
  sendMessages.push({
    role: 'user',
    content: message.content
  } )
  
  console.log('sendMessage', sendMessages)
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'x-api-key': bot.token
    },
    body: JSON.stringify({
      model: bot.model,
      max_tokens: 1024,
      messages: sendMessages
    })
  })
  
  const jsonData = await response.json()
  console.log('response', jsonData)
  
  return {
    output_content: jsonData.content[0].text,
    input_tokens: jsonData.usage.input_tokens,
    output_tokens: jsonData.usage.output_tokens,
    input_price: bot.price_input * jsonData.usage.input_tokens,
    output_price: bot.price_output * jsonData.usage.output_tokens,
    finish_reason: jsonData.stop_reason
  } as IMessages
}
