import {atom, atomFamily} from "recoil";
import {IChatMessageWithUserInfo} from "@/recoil/chat";

export const sendMessageState = atom({
  key: 'sendMessageState',
  default: ''
});
export const chatMessageListState = atomFamily({
  key: 'chatMessageList', // unique ID (with respect to other atoms/selectors)
  default: [] as IChatMessageWithUserInfo[], // default value (aka initial value)
});
