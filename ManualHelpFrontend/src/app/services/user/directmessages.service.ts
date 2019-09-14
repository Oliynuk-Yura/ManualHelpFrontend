import { Subscription, Observable } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HubConnection } from '@aspnet/signalr';
import { Store } from '@ngrx/store';
//import * as directMessagesActions from './store/directmessages.action';
//import { OidcSecurityService } from 'angular-auth-oidc-client';
import { OnlineUser } from '../../../app/core/models/user.model';
import * as signalR from '@aspnet/signalr';
import { HttpParams } from '@angular/common/http';
import { User } from './../../core/models/user.model';
import {ApiService } from '../../services/common/api.service';
import { DataResult } from '../../core/models/dataResult.model';
import {DirectChatUsers, FirstDirectChat} from '../../core/models/directMessage.model';
import { map } from 'rxjs/operators';


@Injectable()
export class DirectMessagesService {

    private _hubConnection: HubConnection | undefined;
    private headers: HttpHeaders | undefined;

    isAuthorizedSubscription: Subscription | undefined;
    isAuthorized = false;

    constructor(
        private store: Store<any> ,
        private apiService: ApiService          
    ) {
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');

       // this.init();
       //this.initHub();
    }

    sendDirectMessage(message: string, userId: string): string {

        if (this._hubConnection) {
            this._hubConnection.invoke('SendDirectMessage', message, userId);
        }
        return message;
    }

    leave(): void {
        if (this._hubConnection) {
            this._hubConnection.invoke('Leave');
        }
    }

    join(): void {
        console.log('send join');
        if (this._hubConnection) {
            this._hubConnection.invoke('Join');
        }
    }

    // private init() {
    //     this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
    //         (isAuthorized: boolean) => {
    //             this.isAuthorized = isAuthorized;
    //             if (this.isAuthorized) {
    //                 this.initHub();
    //             }
    //         });
    //     console.log('IsAuthorized:' + this.isAuthorized);
    // }

    private initHub() {
        console.log('initHub');
        let user: User =JSON.parse(localStorage.getItem('currentUser'));
        const token = user.accessToken;
        let tokenValue = '';
         if (token !== '') {
             tokenValue =  token; //'?token=' +
         }
      
        const url = 'http://localhost:62630/';

        this._hubConnection = new signalR.HubConnectionBuilder()            
            .withUrl(`${url}direct-message`, { accessTokenFactory: () => tokenValue })
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this._hubConnection.start().catch(err => console.error(err.toString()));

        // this._hubConnection.on('NewOnlineUser', (onlineUser: OnlineUser) => {
        //     console.log('NewOnlineUser received');
        //     console.log(onlineUser);
        //    // this.store.dispatch(new directMessagesActions.ReceivedNewOnlineUser(onlineUser));
        // });

        // this._hubConnection.on('OnlineUsers', (onlineUsers: OnlineUser[]) => {
        //     console.log('OnlineUsers received');
        //     console.log(onlineUsers);
        //    // this.store.dispatch(new directMessagesActions.ReceivedOnlineUsers(onlineUsers));
        // });

        // this._hubConnection.on('Joined', (onlineUser: OnlineUser) => {
        //     console.log('Joined received');
        //     //this.store.dispatch(new directMessagesActions.JoinSent());
        //     console.log(onlineUser);
        // });

        this._hubConnection.on('SendDM', (message: string, onlineUser: OnlineUser) => {
            console.log('SendDM received');
            //this.store.dispatch(new directMessagesActions.ReceivedDirectMessage(message, onlineUser));
        });

        this._hubConnection.on('UserLeft', (name: string) => {
            console.log('UserLeft received');
            //this.store.dispatch(new directMessagesActions.ReceivedUserLeft(name));
        });
    }

    loadChatUser(idUser:string, page:number): Observable<DataResult<DirectChatUsers>>{
       const params = new HttpParams().set("idUser", idUser).set("page", page.toString());
       return this.apiService.get("/directmesages/allmessages",params)
       .pipe( map(data => { return data;}))
    }

    getChatByUser(idUser): Observable<DataResult<FirstDirectChat[]>>
    {
       const params = new HttpParams().set("idUser", idUser);
       return this.apiService.get("/directmesages/messagebyuser",params)
       .pipe( map(data => { return data;}))
    }
}
