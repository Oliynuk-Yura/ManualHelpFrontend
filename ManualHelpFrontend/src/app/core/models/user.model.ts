export class User {
  id: string; 
  accessToken?: string;
  email: string;
  role : string;  
}

export class UserSignUp {  
  name: string;
  password: string;
  email: string;  
}

export class OnlineUser {
  public id = '';
  public userName = '';
  public photo = '';
}

export class DirectMessage {
  public fromOnlineUser: OnlineUser | null = {id: '', userName: '', photo:''};
  public message = '';    
}

export interface DirectMessagesStateContainer {
  onlineUsers: OnlineUser[],
  directMessages: DirectMessage[],
  connected: boolean
};

export interface DirectMessagesState {
  dm: DirectMessagesStateContainer
};

export interface Images{
  id:string;
  imageSrc: string;
}