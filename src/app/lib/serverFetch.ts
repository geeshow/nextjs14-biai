import {bots, chats, IChat, messages} from "@/app/chat/data";
import {IChatMessageWithUserInfo} from "@/recoil/chat";



export function getMyInfo() {
  return {
    userId: '0',
    name: 'You',
    avatar: '/user2.png',
  }
}

export function getBot(botId: string) {
  const bot = bots.find(bot => bot.botId === botId)
  return bot ? bot : bots[0]
}
