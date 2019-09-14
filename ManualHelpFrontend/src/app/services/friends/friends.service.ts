import { Injectable } from '@angular/core';
import { DataResult, Result } from '../../core/models/dataResult.model';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import {ApiService} from "../common/api.service"
import { MaybeYouKnow } from '../../core/models/friends.model';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private apiService: ApiService) { }

  maybeYouKnow(): Observable<DataResult<MaybeYouKnow[]>> {
    return this.apiService.get('/friends/maybeyouknow').
      pipe(map(data => { return data}));
  }

  getFriends(): Observable<any> {
    return this.apiService.get('/friend/index').
      pipe(map(data => { return data}));
  }

  addFriend(idFriend:string ): Observable<Result>{
    var param = new HttpParams().set("idFriend", idFriend);
    return this.apiService.get("/friends/addFriend", param)
              pipe(map(data => {return data;}))
  }

  
}
