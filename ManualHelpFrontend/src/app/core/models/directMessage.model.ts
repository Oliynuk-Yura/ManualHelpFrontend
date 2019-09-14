export class DirectMessageUser { 
  id: string;
  userImage: string;
  userFullName: string;
}

export class FirstDirectChat { 
  id: string;
  messageText: string;
  statusMessage: number;
  date: string;
  idSender: string;
  idUser: string;
  userImage: string;
  userFullName: string;
}

export class DirectChatUsers{ 
  users: DirectMessageUser[];
  messagesFirstUser: FirstDirectChat[];
}