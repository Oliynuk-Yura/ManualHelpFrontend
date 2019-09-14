import { Injectable } from '@angular/core';
import {ApiService} from "../common/api.service"
import { from, Observable, BehaviorSubject } from 'rxjs';
import { Food } from "../../core/models/food.model";
import { map } from 'rxjs/operators';
import { DataResult } from '../../core/models/dataResult.model';
import { SortFilter, FilterCriteria } from '../../core/models/entity';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private apiService: ApiService) { }

  getProducts(): Observable<Food[]>{
    return this.apiService.get('/values').
        pipe(map(data => {
          return data.map((food: any) => {
           return food
          });
        }));
  }


  getSortFilter(): Observable<DataResult<SortFilter[]>> {
    return this.apiService.get('/values/getsortfilter').
      pipe(map(data => {        
        return data
      }));
  }


  getFilteredProducts(data: FilterCriteria): Observable<Food[]> {
    //const params = new HttpParams().set("id", id.toString());
    return this.apiService.post("/values/filterProduct", data)
                        .pipe(map(data => {                          
                          return data.map((food: any) => {                           
                            return food
                          });
                        }));

  }
}
