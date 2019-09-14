import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResult } from '../../core/models/dataResult.model';
import {Images} from "../../core/models/user.model"
import {ApiService} from "../common/api.service"
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private apiService: ApiService) { }

  loadImages(page:number): Observable<DataResult<Images[]>>{
    const params = new HttpParams().set("page", page.toString());
    return this.apiService.get("/images/getimages",params)
    .pipe( map(data => { return data;}))
 }
}
