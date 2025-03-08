export interface LastMessage {
  body: string;
  timestamp: string;
  fromMe: boolean;
  hasMedia: boolean;
}

export interface Chat {
  id: string;
  name: string;
  number: string;
  unreadCount: number;
  timestamp: string;
  lastMessage: LastMessage;
  profilePicUrl: string | null;
  petshopId: number;
}

export interface QuotedMessage {
  body: string;
  sender: string;
}

export interface MediaInfo {
  mimetype: string;
  filename: string;
  hasMedia: boolean;
}

export interface Message {
  id: string;
  timestamp: string;
  from: string;
  fromMe: boolean;
  to: string;
  body: string;
  hasQuotedMsg: boolean;
  quotedMsg?: QuotedMessage;
  media?: MediaInfo;
  isForwarded: boolean;
  broadcast: boolean;
}

export interface ChatHistory extends Chat {
  isGroup: boolean;
  messages: Message[];
}

export interface ChatHistoryResponse {
  success: boolean;
  message: string;
  data: ChatHistory;
}

export interface MessageResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    timestamp: string;
    from: string;
    fromMe: boolean;
    to: string;
    body: string;
    hasMedia: boolean;
    mediaType: string;
    ack: number;
  };
}
