import { RouterModule, Routes } from '@angular/router';

import {MyNewsfeedComponent} from "../../../app/pages/UserPages/my-newsfeed/my-newsfeed.component";
import { PeopleNearlyComponent } from '../../../app/pages/UserPages/people-nearly/people-nearly.component';
import { FriendsComponent } from '../../../app/pages/UserPages/friends/friends.component';
import { ImagesComponent } from '../../../app/pages/UserPages/images/images.component';
import { VideosComponent } from '../../../app/pages/UserPages/videos/videos.component';
import { PrivateMessageComponent } from '../../../app/pages/UserPages/direct-messages/private-message/private-message.component';
import { UserComponent } from './user.component';
import { JwtInterceptor, } from  '../../../app/helpers/jwt.interceptor';
import {AuthGuard} from "../../../app/guards/auth.guard";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [   
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
    { path: '', redirectTo: 'newsfeed/:id', pathMatch: 'full' },
    {
      path: 'newsfeed/:id',
      component: MyNewsfeedComponent      
    },
    { 
      path: 'people-nearly/:id', 
      component: PeopleNearlyComponent
    },
    { 
      path: 'friends/:id', 
      component: FriendsComponent
    },
    { 
      path: 'dm/:id', 
      component: PrivateMessageComponent },
    { 
      path: 'images/:id', 
      component: ImagesComponent
    },
    { 
      path: 'videos/:id', 
      component: VideosComponent,
    }     
  ]
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);