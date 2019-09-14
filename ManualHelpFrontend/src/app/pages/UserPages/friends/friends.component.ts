import { Component, OnInit } from '@angular/core';
import { FriendsService } from "../../../services/friends/friends.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor
  (
    public friendsService: FriendsService
  ) { }

  ngOnInit() {
    this.friendsService.getFriends().subscribe(data => {
      console.log(data);
    });
  }

}
