import { OnlineUser } from "./online-user";

export class DirectMessage {
    public fromOnlineUser: OnlineUser | null = {id: '', userName: '', photo:''};
    public message = '';    
}
