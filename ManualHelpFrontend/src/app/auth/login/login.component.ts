import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ValidationErrors} from "@angular/forms";
import { AuthService } from "../../services/auth/auth.service";
import { LoginModel } from "../../core/models/login.model";
import { DynamicNotifyService } from '../../services/common/dynamic-notify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;  

  constructor
  (
    private router: Router, 
    public fb: FormBuilder,
    public authService : AuthService,
    public dynamicNotifyService: DynamicNotifyService
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ["", Validators.required],
      password: ["", Validators.required],
      rememberMe:[]
    });
  }

  submit(){    
    if(!this.loginForm.valid){
      Object.keys(this.loginForm.controls).forEach(key =>{
          const controlError = this.loginForm.get(key).errors;
          if(controlError != null){
            Object.keys(controlError).forEach(error =>{
                    this.dynamicNotifyService.invalidFormMessagePop(key,error);
            });
          }
      });

      return;
    }

    let model:LoginModel  = new LoginModel
    {      
      model.email = this.loginForm.get("login").value,
      model.password= this.loginForm.get("password").value
      //model.rememberFlag = this.loginForm.get("rememberMe").value
    };
    
    this.authService.login(model).subscribe(data => {
      this.router.navigate([`//my-account/newsfeed/${data.id}`]); //  '/my-account/newsfeed/${7}'
    });

  }

}
