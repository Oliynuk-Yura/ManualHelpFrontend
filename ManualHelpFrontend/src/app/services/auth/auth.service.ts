import { Injectable } from '@angular/core';
import { ApiService } from '../../services/common/api.service';
import { map } from 'rxjs/operators';
import { User } from '../../core/models/user.model';
import { UserSignUp } from '../../core/models/user.model';
import { DataResult } from '../../core/models/dataResult.model';
import { HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from "../../core/models/login.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private apiService : ApiService) 
  {     
   this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
    
  public get currentUserValue(): User {
        return this.currentUserSubject.value;
  } 
  

  register(user: UserSignUp): Observable<any> {
       return this.apiService.post("/identity/signup", user)
       .pipe(data => {        
         return data        
      });
  }  

  login(model: LoginModel) : Observable<any>{
        return this.apiService.post("/identity/signIn", model) //login
        .pipe( map((data:User) =>{
          localStorage.setItem('currentUser', JSON.stringify(data));
          return data;
        }))
  }

}
