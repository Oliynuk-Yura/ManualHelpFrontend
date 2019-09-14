import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import { Validators, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DirectMessagesState } from '../store/directmessages.state';
import * as directMessagesAction from '../store/directmessages.action';
import { OnlineUser } from '../models/online-user';
import { DirectMessage } from '../models/direct-message';
import {PreviousDirectMessage} from '../models/previous-direct-message';

import { DirectMessagesService } from '../../../../services/user/directmessages.service';
import { User } from '../../../../core/models/user.model';
import {DirectChatUsers, FirstDirectChat,DirectMessageUser} from '../../../../core/models/directMessage.model';
import {ActivatedRoute} from "@angular/router"
import { switchMap, takeWhile } from 'rxjs/operators';
import { userInfo } from 'os';

@Component({
  selector: 'app-private-message',
  templateUrl: './private-message.component.html',
  styleUrls: ['./private-message.component.css'],
})
export class PrivateMessageComponent implements OnInit {

  @ViewChild("sendMessageForm") sendMessageForm: ElementRef; 
  public async: any;
  public scrollAnimateAvailable: boolean;
  onlineUsers: OnlineUser[];
  onlineUser: OnlineUser;

  previousDirectMessage: PreviousDirectMessage;
  directChatUsers:DirectChatUsers;
  public id: string;
  user:User;
  selectedUser :User = new User();
  page: number = 0; 
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
    this.msgForm.reset();
  }

  ngOnInit() {   

    this.msgForm = this.fb.group({      
      "message": ["", Validators.required]
    });
        
    this.connect();
  }

  ngOnDestroy(): void {
   // this.isAuthorizedSubscription.unsubscribe();
  //  this.dmStateSubscription.unsubscribe();
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

    // setTimeout(()=>{
    //   this.animateScrollTo(this.sendMessageForm),
    //   10
    // });

  }

  sendMessage() {
    console.log('send message to:' + this.selectedOnlineUserName + ':' + this.msgForm.get("message").value);
    this.store.dispatch(new directMessagesAction.SendDirectMessageAction(this.msgForm.get("message").value, this.selectedOnlineUserName));
    this.msgForm.reset();
    setTimeout(()=>{
      this.animateScrollTo(this.sendMessageForm),
      10
    });
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
    this.loadMessages();
  }

  onScroll() {  
    console.log(this.page);
    this.page = this.page + 1;  
    this.loadMessages();  
  }

  loadMessages(){
    this.directMessagesService.loadChatUser(this.id, this.page)
    .subscribe((data)=>{this.directChatUsers = data.data;}); 
  }

  animateScrollTo(target: ElementRef) {
    this.scrollAnimateAvailable = true;
    let prevOffset = -1;
    let scrollContainer = document.getElementById("scrollcontainer");       
   
    timer(0, 100).pipe(
      takeWhile(() => this.scrollAnimateAvailable))
      .subscribe((e) => {
        console.log( "h: " + scrollContainer.scrollHeight);
         if (scrollContainer.scrollHeight >= target.nativeElement.offsetTop)
          {
          scrollContainer.scrollTo(0,  scrollContainer.scrollHeight - e);
         } else if (scrollContainer.scrollHeight <= target.nativeElement.offsetTop) {
           scrollContainer.scrollTo(0, scrollContainer.scrollHeight + e);
        }

        if (prevOffset < scrollContainer.scrollHeight) {
           prevOffset = scrollContainer.scrollHeight;
         } else {
          this.scrollAnimateAvailable = false;
         }
       
      });
  }

}
