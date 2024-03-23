import {ChatGpt, Claude} from "@/components/svg/bots";
import {IChatMessage, IMyInfo, IUser} from "@/recoil/chat";

export interface IBot {
  botId: string;
  name: string;
  description: string;
  avatar: string;
}

export interface IChat {
  chatId: string;
  userId: string;
  title: string;
  lastMessageDate: string;
  botId: string;
  messages: IChatMessage[];
  bot: IBot;
}

export const MainBots = [
  { name: 'ChatGPT', href: '/chat/g4', icon: ChatGpt },
  { name: 'Claude', href: '/chat/cpro', icon: Claude },
];

export const myInfo = {
  userId: '0',
  name: 'You',
  avatar: '/user2.png',
} as IMyInfo

export const bots = [
  {
    botId: 'g4',
    name: 'GPT-4',
    description: 'OpenAI GPT-4',
    avatar: '/user1.png',
  },
  {
    botId: 'g35',
    name: 'GPT 35',
    description: 'OpenAI GPT-3.5',
    avatar: '/user2.png',
  },
  {
    botId: 'cpro',
    name: 'Claude Pro',
    description: 'Anthropic Bots Pro',
    avatar: '/claude-pro.png',
  },
  {
    botId: 'copus',
    name: 'Claude Opus',
    description: 'Anthropic Bots Opus',
    avatar: '/claude-opus.png',
  },
] as IBot[]

export const messages = [
  {
    chatId: '0',
    messageId: 0,
    botId: 'g4',
    isMine: false,
    content: 'Hello! I am ChatGPT 4. I am here to help you with any questions you have. Feel free to ask me anything!',
  },
  {
    chatId: '0',
    messageId: 1,
    botId: 'copus',
    isMine: true,
    content: 'Hi! I am doing great. How are you?',
  }, {
    chatId: '0',
    messageId: 2,
    botId: 'g35',
    isMine: false,
    content: "물론입니다! 여기 간단한 HTML 파일 예제가 있습니다. 이 예제는 기본적인 HTML 구조를 가지고 있으며, 제목과 간단한 문장을 포함하고 있습니다. 본문 내용은 필요에 따라 수정하실 수 있습니다.\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>나의 첫 번째 웹 페이지</title>\n  <meta charset=\"UTF - 8\">\n</head>\n<body>\n  <h1>환영합니다!</h1>\n  <p>이것은 당신의 첫 번째 웹 페이지입니다.</p>\n</body>\n</html>\n```\n\n이 HTML 파일은 다음을 포함하고 있습니다:\n\n- `<!DOCTYPE html>`: 문서 유형 선언으로, 현재 문서가 HTML5 문서임을 나타냅니다.\n- `<html>`: HTML 문서의 루트 요소입니다.\n- `<head>`: 문서의 메타데이터를 포함하는 부분으로, 문서 제목과 문자 인코딩을 정의합니다.\n- `<title>`: 브라우저 탭에 표시될 문서의 제목을 정의합니다.\n- `<meta charset=\"UTF - 8\">`: 문서 인코딩을 UTF-8로 설정합니다. 이는 다양한 언어와 특수 문자를 올바르게 표시하는 데 도움이 됩니다.\n- `<body>`: 문서의 본문을 나타내며, 사용자에게 표시되는 내용을 포함합니다.\n- `<h1>`: 가장 큰 제목을 나타내는 태그입니다.\n- `<p>`: 문단을 나타내는 태그입니다.\n\n이 코드를 사용하여 자신만의 HTML 파일을 만들고, 필요에 따라 내용을 추가하거나 변경할 수 있습니다. HTML은 웹 페이지의 구조를 정의하는 데 사용되며, CSS와 JavaScript를 함께 사용하여 스타일과 상호작용을 추가할 수 있습니다.",
  },
  {
    chatId: '0',
    messageId: 3,
    botId: 'g4',
    isMine: true,
    content: 'That is good to hear!',
  },
  {
    chatId: '1',
    messageId: 0,
    botId: 'cpro',
    isMine: false,
    content: 'Hello! I am Claude Pro. I am here to help you with any questions you have. Feel free to ask me anything!',
  }, {
    chatId: '1',
    messageId: 1,
    botId: 'g4',
    isMine: true,
    content: 'Hi! I am doing great. How are you?',
  }, {
    chatId: '1',
    messageId: 2,
    botId: 'cpro',
    isMine: false,
    content: "물론입니다! 여기 간단한 HTML 파일 예제가 있습니다. 이 예제는 기본적인 HTML 구조를 가지고 있으며, 제목과 간단한 문장을 포함하고 있습니다. 본문 내용은 필요에 따라 수정하실 수 있습니다.\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>나의 첫 번째 웹 페이지</title>\n  <meta charset=\"UTF - 8\">\n</head>\n<body>\n  <h1>환영합니다!</h1>\n  <p>이것은 당신의 첫 번째 웹 페이지입니다.</p>\n</body>\n</html>\n```\n\n이 HTML 파일은 다음을 포함하고 있습니다:\n\n- `<!DOCTYPE html>`: 문서 유형 선언으로, 현재 문서가 HTML5 문서임을 나타냅니다.\n- `<html>`: HTML 문서의 루트 요소입니다.\n- `<head>`: 문서의 메타데이터를 포함하는 부분으로, 문서 제목과 문자 인코딩을 정의합니다.\n- `<title>`: 브라우저 탭에 표시될 문서의 제목을 정의합니다.\n- `<meta charset=\"UTF - 8\">`: 문서 인코딩을 UTF-8로 설정합니다. 이는 다양한 언어와 특수 문자를 올바르게 표시하는 데 도움이 됩니다.\n- `<body>`: 문서의 본문을 나타내며, 사용자에게 표시되는 내용을 포함합니다.\n- `<h1>`: 가장 큰 제목을 나타내는 태그입니다.\n- `<p>`: 문단을 나타내는 태그입니다.\n\n이 코드를 사용하여 자신만의 HTML 파일을 만들고, 필요에 따라 내용을 추가하거나 변경할 수 있습니다. HTML은 웹 페이지의 구조를 정의하는 데 사용되며, CSS와 JavaScript를 함께 사용하여 스타일과 상호작용을 추가할 수 있습니다.",
  }, {
    chatId: '1',
    messageId: 3,
    botId: 'g35',
    isMine: true,
    content: 'That is good to hear!',
  }
] as IChatMessage[]


export const chats = [
{
  chatId: '0',
  userId: '0',
  title: 'NextJS',
  lastMessageDate: '2024-03-23',
  botId: 'g35',
},
{
  chatId: '1',
  userId: '0',
  title: 'User\'s Request: TestAssistant\'s Response: Ask How I Help',
  lastMessageDate: '2024-03-22',
  botId: 'g4',
},
{
  chatId: '2',
  userId: '0',
  title: '텍스트 요약',
  lastMessageDate: '2024-03-10',
  botId: 'cpro',
},
{
  chatId: '3',
  userId: '0',
  title: '안녕, 나는 ChatGPT 4야. 무엇을 도와줄까?',
  lastMessageDate: '2024-02-01',
  botId: 'copus',
},
{
  chatId: '4',
  userId: '0',
  title: '오류 해결 방법',
  lastMessageDate: '2024-01-01',
  botId: 'g35',
},
{
  chatId: '5',
  userId: '0',
  title: 'Python 3.10',
  lastMessageDate: '2023-01-01',
  botId: 'g35',
}] as IChat[]


