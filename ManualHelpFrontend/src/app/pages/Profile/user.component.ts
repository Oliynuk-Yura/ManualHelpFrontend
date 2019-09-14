import { Component, OnInit } from '@angular/core';
import {User} from '../../core/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public user: User;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
   }


  ngOnInit() {
  }

}
