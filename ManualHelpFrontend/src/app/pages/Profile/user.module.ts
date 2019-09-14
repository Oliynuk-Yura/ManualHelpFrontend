import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from '../../../app/pages/Profile/timeline/timeline.component';
import { FriendsComponent } from '../../../app/pages/Profile/friends/friends.component';
import { AboutComponent } from '../../../app/pages/Profile/about/about.component';
import { AlbumComponent } from '../../../app/pages/Profile/album/album.component';
import {UserRoutingModule} from "./user-routing.module";
import { UserComponent } from './user.component';
import { JwtInterceptor, } from  '../../../app/helpers/jwt.interceptor';
import {AuthGuard} from "../../../app/guards/auth.guard";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({  
  imports: [
    CommonModule,
    UserRoutingModule,
    InfiniteScrollModule
  ],
  declarations: 
  [
    TimelineComponent,
    FriendsComponent,
    AlbumComponent,
    AboutComponent,
    UserComponent
  ],
  exports: [
    RouterModule
],
providers:
  [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }   
  ]
})
export class UserModule { }

