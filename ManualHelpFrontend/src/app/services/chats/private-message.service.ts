import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResult } from '../../core/models/dataResult.model';
import {PreviousDirectMessage} from "../../private-message/models/previous-direct-message"
import {ApiService} from "../common/api.service"
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivateMessageService {

  constructor(private apiService: ApiService) { }

  getMessageByUser(idUser:string): Observable<DataResult<PreviousDirectMessage>>{
      const params = new HttpParams().set("idUser", idUser);
      return this.apiService.get("/directmesages/allmessages", params)
                  .pipe(map(data => { console.log(data); return data}));
  }
  
}
