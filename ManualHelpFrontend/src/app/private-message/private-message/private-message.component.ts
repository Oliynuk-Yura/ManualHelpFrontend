import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DirectMessagesState } from '../store/directmessages.state';
import * as directMessagesAction from '../store/directmessages.action';
import { PrivateMessageService } from '../../services/chats/private-message.service';
import { OnlineUser } from '../models/online-user';
import { DirectMessage } from '../models/direct-message';
import {PreviousDirectMessage} from '../models/previous-direct-message';

import { DirectMessagesService } from '../directmessages.service';
import { User } from '../../core/models/user.model';
import {DirectChatUsers, FirstDirectChat,DirectMessageUser} from '../../core/models/directMessage.model';
import {ActivatedRoute} from "@angular/router"
import { switchMap } from 'rxjs/operators';
import { userInfo } from 'os';

@Component({
  selector: 'app-private-message',
  templateUrl: './private-message.component.html',
  styleUrls: ['./private-message.component.css'],
})
export class PrivateMessageComponent implements OnInit {

  public async: any;
  onlineUsers: OnlineUser[];
  onlineUser: OnlineUser;

  previousDirectMessage: PreviousDirectMessage;
  directChatUsers:DirectChatUsers;
  public id: string;
  user:User;
  selectedUser :User = new User();

  directMessages: DirectMessage[]= [];

  selectedOnlineUserName = '';
  dmState$: Observable<DirectMessagesState>;
  dmStateSubscription: Subscription;
  isAuthorizedSubscription: Subscription;
  isAuthorized: boolean;
  connected: boolean;  

  msgForm: FormGroup;

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private directMessageService: PrivateMessageService,
    private directMessagesService: DirectMessagesService,
    private route: ActivatedRoute   
  ) {
    

    this.dmState$ = this.store.select<DirectMessagesState>(state => state.dm);
    this.dmStateSubscription = this.store.select<DirectMessagesState>(state => state.dm)
      .subscribe((o: DirectMessagesState) => {
        this.connected = o.dm.connected;
        console.log('o.dm');
        console.log(o.dm);
      });
  }

  public sendDm(): void {
    this.store.dispatch(new directMessagesAction.SendDirectMessageAction(this.msgForm.get("message").value, this.onlineUser.userName));
  }

  ngOnInit() {   

    this.msgForm = this.fb.group({      
      "message": ["", Validators.required]
    });
        
    //this.connect();
  }

  ngOnDestroy(): void {
    this.isAuthorizedSubscription.unsubscribe();
    this.dmStateSubscription.unsubscribe();
  }

  selectChat(user: DirectMessageUser): void { 
    console.log(user.id);   
    this.selectedOnlineUserName = user.id;
    this.selectedUser.id = user.id;
    //this.selectedUser.userImage = user.userImage;
    //this.selectedUser.firstName = user.userFullName;

    this.directMessagesService.getChatByUser(user.id)    
    .subscribe(
      (data)=>{       
        this.directChatUsers.messagesFirstUser = [];
        this.directChatUsers.messagesFirstUser = data.data 
    });
  }

  sendMessage() {
    console.log('send message to:' + this.selectedOnlineUserName + ':' + this.msgForm.get("message").value);
    this.store.dispatch(new directMessagesAction.SendDirectMessageAction(this.msgForm.get("message").value, this.selectedOnlineUserName));
  }

  getUserInfoName(directMessage: DirectMessage) {
    if (directMessage.fromOnlineUser) {
      return directMessage.fromOnlineUser.userName;
    }

    return '';
  }

  getUserInfo(onlineuserUserName: string) {    
    return this.selectedOnlineUserName === onlineuserUserName? onlineuserUserName: '';
  }

  disconnect() {
    this.store.dispatch(new directMessagesAction.Leave());
  }

  connect() {
    this.store.dispatch(new directMessagesAction.Join());
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.id = this.route.snapshot.paramMap.get("id");       
    this.directMessagesService.loadChatUser(this.id)
    .subscribe((data)=>{this.directChatUsers = data.data;});
  }


}
