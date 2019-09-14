import { UserDMModel } from "./userDM-model";
import { MessageModel } from "./message-model";

export class PreviousDirectMessage {
    public user: UserDMModel;
    public directMessages: MessageModel;    
}
