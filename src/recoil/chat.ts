import {atom, atomFamily, selector, selectorFamily, SerializableParam, useRecoilState} from "recoil";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;

export interface IMyInfo {
  userId: string;
  name: string;
  avatar: string;
}

export interface IUser {
  botId: string;
  name: string;
  avatar: string;
}

export interface IChatMessage {
  chatId: string;
  messageId: number;
  botId: string;
  isMine: boolean;
  content: string;
}

export interface ICurrentChat {
  chatId: string;
  botId: string;
}

export const sendMessageState = atom({
  key: 'sendMessageState',
  default: ''
});

export const currentChatState = atom({
  key: 'currentChatStatus',
  default: {
    chatId: '0',
    botId: '1',
  } as ICurrentChat
});

export const selectedChatBot = selector({
  key: 'selectedChatBot',
  get: ({get}) => {
    const currentChat = get(currentChatState);
    console.log(currentChat.botId)
    const userList = get(userInfo(0))
    return userList[parseInt(currentChat.botId)];
  },
});

export const userInfo = atomFamily({
  key: 'userInfo', // unique ID (with respect to other atoms/selectors)
  default: [
    {
      botId: '0',
      name: 'You',
      avatar: '/user2.png',
    } as IUser, // default value (aka initial value)
    {
      botId: '1',
      name: 'ChatGPT 4',
      avatar: '/user1.png',
    } as IUser, // default value (aka initial value)
  ]
});

export const chatMessageList = atomFamily<IChatMessage[], string>({
  key: 'chatMessageList', // unique ID (with respect to other atoms/selectors)
  default: [] as IChatMessage[], // default value (aka initial value)
});

