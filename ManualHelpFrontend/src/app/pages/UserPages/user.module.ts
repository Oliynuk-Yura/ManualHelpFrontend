import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MyNewsfeedComponent} from "../../../app/pages/UserPages/my-newsfeed/my-newsfeed.component";
import { PeopleNearlyComponent } from '../../../app/pages/UserPages/people-nearly/people-nearly.component';
import { FriendsComponent } from '../../../app/pages/UserPages/friends/friends.component';
import { ImagesComponent } from '../../../app/pages/UserPages/images/images.component';
import { VideosComponent } from '../../../app/pages/UserPages/videos/videos.component';
import { TimelineComponent } from '../../../app/pages/Timeline/timeline/timeline.component';
import { FriendsTemplateComponent } from '../../../app/pages/UserPages/shared/friends-template/friends-template.component';
import {UserRoutingModule} from "./user-routing.module";
import { UserComponent } from './user.component';
import { PrivateMessageComponent } from '../../../app/pages/UserPages/direct-messages/private-message/private-message.component';
import { DirectMessagesService } from './../../services/user/directmessages.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DirectMessagesEffects } from './direct-messages/store/directmessages.effects';
import { directMessagesReducer } from './direct-messages/store/directmessages.reducer';

@NgModule({  
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('dm', directMessagesReducer),
    EffectsModule.forFeature([DirectMessagesEffects]),
  ],
  declarations: 
  [
    MyNewsfeedComponent,
    PeopleNearlyComponent,
    FriendsComponent,
    ImagesComponent,
    VideosComponent,
    TimelineComponent,
    FriendsTemplateComponent,
    UserComponent,
    PrivateMessageComponent
  ],
  exports: [
    RouterModule
  ],

  providers: [
    DirectMessagesService
  ]
})
export class UserModule { }