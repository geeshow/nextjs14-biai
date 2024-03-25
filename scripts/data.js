
const bots = [
  {
    botId: 'g4',
    name: 'GPT-4',
    description: 'OpenAI GPT-4',
    avatar: '/user1.png',
    signature: true
  },
  {
    botId: 'g35',
    name: 'GPT 35',
    description: 'OpenAI GPT-3.5',
    avatar: '/user2.png',
    signature: false
  },
  {
    botId: 'cpro',
    name: 'Claude Pro',
    description: 'Anthropic Bots Pro',
    avatar: '/claude-pro.png',
    signature: true
  },
  {
    botId: 'copus',
    name: 'Claude Opus',
    description: 'Anthropic Bots Opus',
    avatar: '/claude-opus.png',
    signature: false
  },
]


const chats = [
  {
    chatId: '3af321a2-0e26-4044-9576-4d608e6b452f',
    userId: 'ken2484@gmail.com',
    title: 'NextJS',
    lastMessageDate: '2024-03-24 12:00:00',
    botId: 'g35',
  },
  {
    chatId: '9ee26631-3d33-4183-ba2d-e5343af6b910',
    userId: 'ken2484@gmail.com',
    title: 'User\'s Request: TestAssistant\'s Response: Ask How I Help',
    lastMessageDate: '2024-03-22',
    botId: 'g4',
  },
  {
    chatId: 'da3bb890-f18c-40b9-b25b-c1ead0107e35',
    userId: 'ken2484@gmail.com',
    title: '텍스트 요약',
    lastMessageDate: '2024-03-10',
    botId: 'cpro',
  },
  {
    chatId: '642d8c6d-41ea-4d67-915c-320032022cca',
    userId: 'ken2484@gmail.com',
    title: '안녕, 나는 ChatGPT 4야. 무엇을 도와줄까?',
    lastMessageDate: '2024-02-01',
    botId: 'copus',
  },
  {
    chatId: 'f4bca48d-1d0b-4e37-950b-86b7a32d74a5',
    userId: 'ken2484@gmail.com',
    title: '오류 해결 방법',
    lastMessageDate: '2024-01-01',
    botId: 'g35',
  },
  {
    chatId: 'dc40e094-35da-4d51-8d80-3af884d304c0',
    userId: 'ken2484@gmail.com',
    title: 'Python 3.10',
    lastMessageDate: '2022-01-01',
    botId: 'g35',
  },
  {
    chatId: '777cd3fa-d331-4c93-aa78-56736e94e6a0',
    userId: 'ken2484@gmail.com',
    title: 'Java 17',
    lastMessageDate: '2023-01-01',
    botId: 'g4',
  }
]

const messages = [
  {
    chatId: '3af321a2-0e26-4044-9576-4d608e6b452f',
    messageId: 0,
    botId: 'g4',
    isMine: false,
    content: 'Hello! I am ChatGPT 4. I am here to help you with any questions you have. Feel free to ask me anything!',
  },
  {
    chatId: '3af321a2-0e26-4044-9576-4d608e6b452f',
    messageId: 1,
    botId: 'copus',
    isMine: true,
    content: 'Hi! I am doing great. How are you?',
  }, {
    chatId: '3af321a2-0e26-4044-9576-4d608e6b452f',
    messageId: 2,
    botId: 'g35',
    isMine: false,
    content: "물론입니다! 여기 간단한 HTML 파일 예제가 있습니다. 이 예제는 기본적인 HTML 구조를 가지고 있으며, 제목과 간단한 문장을 포함하고 있습니다. 본문 내용은 필요에 따라 수정하실 수 있습니다.\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>나의 첫 번째 웹 페이지</title>\n  <meta charset=\"UTF - 8\">\n</head>\n<body>\n  <h1>환영합니다!</h1>\n  <p>이것은 당신의 첫 번째 웹 페이지입니다.</p>\n</body>\n</html>\n```\n\n이 HTML 파일은 다음을 포함하고 있습니다:\n\n- `<!DOCTYPE html>`: 문서 유형 선언으로, 현재 문서가 HTML5 문서임을 나타냅니다.\n- `<html>`: HTML 문서의 루트 요소입니다.\n- `<head>`: 문서의 메타데이터를 포함하는 부분으로, 문서 제목과 문자 인코딩을 정의합니다.\n- `<title>`: 브라우저 탭에 표시될 문서의 제목을 정의합니다.\n- `<meta charset=\"UTF - 8\">`: 문서 인코딩을 UTF-8로 설정합니다. 이는 다양한 언어와 특수 문자를 올바르게 표시하는 데 도움이 됩니다.\n- `<body>`: 문서의 본문을 나타내며, 사용자에게 표시되는 내용을 포함합니다.\n- `<h1>`: 가장 큰 제목을 나타내는 태그입니다.\n- `<p>`: 문단을 나타내는 태그입니다.\n\n이 코드를 사용하여 자신만의 HTML 파일을 만들고, 필요에 따라 내용을 추가하거나 변경할 수 있습니다. HTML은 웹 페이지의 구조를 정의하는 데 사용되며, CSS와 JavaScript를 함께 사용하여 스타일과 상호작용을 추가할 수 있습니다.",
  },
  {
    chatId: '3af321a2-0e26-4044-9576-4d608e6b452f',
    messageId: 3,
    botId: 'g4',
    isMine: true,
    content: 'That is good to hear!',
  },
  {
    chatId: '9ee26631-3d33-4183-ba2d-e5343af6b910',
    messageId: 0,
    botId: 'cpro',
    isMine: false,
    content: 'Hello! I am Claude Pro. I am here to help you with any questions you have. Feel free to ask me anything!',
  }, {
    chatId: '9ee26631-3d33-4183-ba2d-e5343af6b910',
    messageId: 1,
    botId: 'g4',
    isMine: true,
    content: 'Hi! I am doing great. How are you?',
  }, {
    chatId: '9ee26631-3d33-4183-ba2d-e5343af6b910',
    messageId: 2,
    botId: 'cpro',
    isMine: false,
    content: "물론입니다! 여기 간단한 HTML 파일 예제가 있습니다. 이 예제는 기본적인 HTML 구조를 가지고 있으며, 제목과 간단한 문장을 포함하고 있습니다. 본문 내용은 필요에 따라 수정하실 수 있습니다.\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>나의 첫 번째 웹 페이지</title>\n  <meta charset=\"UTF - 8\">\n</head>\n<body>\n  <h1>환영합니다!</h1>\n  <p>이것은 당신의 첫 번째 웹 페이지입니다.</p>\n</body>\n</html>\n```\n\n이 HTML 파일은 다음을 포함하고 있습니다:\n\n- `<!DOCTYPE html>`: 문서 유형 선언으로, 현재 문서가 HTML5 문서임을 나타냅니다.\n- `<html>`: HTML 문서의 루트 요소입니다.\n- `<head>`: 문서의 메타데이터를 포함하는 부분으로, 문서 제목과 문자 인코딩을 정의합니다.\n- `<title>`: 브라우저 탭에 표시될 문서의 제목을 정의합니다.\n- `<meta charset=\"UTF - 8\">`: 문서 인코딩을 UTF-8로 설정합니다. 이는 다양한 언어와 특수 문자를 올바르게 표시하는 데 도움이 됩니다.\n- `<body>`: 문서의 본문을 나타내며, 사용자에게 표시되는 내용을 포함합니다.\n- `<h1>`: 가장 큰 제목을 나타내는 태그입니다.\n- `<p>`: 문단을 나타내는 태그입니다.\n\n이 코드를 사용하여 자신만의 HTML 파일을 만들고, 필요에 따라 내용을 추가하거나 변경할 수 있습니다. HTML은 웹 페이지의 구조를 정의하는 데 사용되며, CSS와 JavaScript를 함께 사용하여 스타일과 상호작용을 추가할 수 있습니다.",
  }, {
    chatId: '9ee26631-3d33-4183-ba2d-e5343af6b910',
    messageId: 3,
    botId: 'g35',
    isMine: true,
    content: 'That is good to hear!',
  }
]



module.exports = {
  bots,
  messages,
  chats
};
