import { RouterModule, Routes } from '@angular/router';

import { TimelineComponent } from '../../../app/pages/Profile/timeline/timeline.component';
import { FriendsComponent } from '../../../app/pages/Profile/friends/friends.component';
import { AboutComponent } from '../../../app/pages/Profile/about/about.component';
import { AlbumComponent } from '../../../app/pages/Profile/album/album.component';
import {UserComponent} from './user.component';

const routes: Routes = [  
  {
    path: '',
    component: UserComponent,
    children: [
    { path: '', redirectTo: 'timeline', pathMatch: 'full' },
    {
      path: 'timeline/:id',
      component: TimelineComponent      
    },
    { 
      path: 'about/:id', 
      component: AboutComponent
    },
    { 
      path: 'friends/:id', 
      component: FriendsComponent
    },
    { 
      path: 'album/:id', 
      component: AlbumComponent
    }    
  ]
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);



