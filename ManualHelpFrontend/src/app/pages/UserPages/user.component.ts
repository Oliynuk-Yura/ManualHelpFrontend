import { Component, OnInit } from '@angular/core';
import {User} from '../../core/models/user.model';
import {FriendsService} from '../../services/friends/friends.service'
import { MaybeYouKnow } from '../../core/models/friends.model';
import { NotifyService } from '../../services/common/notify.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public user: User;
  public friends: MaybeYouKnow[] = [] ;

  constructor
  (
    private friendService: FriendsService,
    private notifyService : NotifyService) {   
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.friendService.maybeYouKnow().subscribe
        (data =>{this.friends =  data.data;}); 
  }

  addFriend(idFriend:string){    
    this.friendService.addFriend(idFriend).subscribe(
      data => {
          if(data.sucssess){
            this.notifyService.success(data.message);
          }
      });
  }

}
