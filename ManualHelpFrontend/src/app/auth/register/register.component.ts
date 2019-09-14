import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth/auth.service";
import {ConfirmPassword} from "../../helpers/confirm-password.validator";
import { error } from '@angular/compiler/src/util';
import { first } from 'rxjs/operators';
import { UserSignUp } from '../../core/models/user.model';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotifyService } from '../../services/common/notify.service';
import { DynamicNotifyService } from '../../services/common/dynamic-notify.service';
import { ValidationState } from "../../core/common/enum/ValidationState";
import { FormvalidatorService } from "../../services/common/formvalidator.service";
import { ValidationResult } from "../../core/common/validationResult";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  subscribeForm: FormGroup;
  message: string;
  loading: boolean = false;  
  public validationResult: ValidationResult;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private http : HttpClient,
    private dynamicNotifyService: DynamicNotifyService, 
    private notifyService: NotifyService,
    private formValidator: FormvalidatorService
    ) {
   
  }    

  ngOnInit() {
    this.createRegisterForm();
    this.subscribeForm = new FormGroup({});
  }

  private createRegisterForm() {

    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      userEmail: ['', [Validators.required, this.formValidator.emailValidator()]],
      userPassword: ['', [Validators.required]],
      repeatUserPassword: ['', Validators.required]
      }, {
        validator: ConfirmPassword('userPassword', 'repeatUserPassword').bind(this)
      });

    this.registerForm.get('userName').valueChanges.subscribe(() => { this.ValidateUserName() });
  }

  private ValidateUserName() {
    let userName: string = this.registerForm.get('userName').value;   
    this.validationResult = this.formValidator.validateUserName(userName);   
  }
  
  submit() {
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach(key => { 
        const controlErrors: ValidationErrors = this.registerForm.get(key).errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            this.dynamicNotifyService.invalidFormMessagePop(key, keyError)
          });
        }
      });
      return;
    }
    
    if (this.dynamicNotifyService.validationMessage(this.validationResult)) {            
      return;
    }
    
    let model: UserSignUp = new UserSignUp
    {
      model.email = this.registerForm.get("userEmail").value,
      model.name = this.registerForm.get("userName").value,     
      model.password = this.registerForm.get("userPassword").value
    }
    

    this.authService.register(model) 
          .pipe(first())
          .subscribe(
            data => {
              console.log(data);
              if (data == null) {
                //this.notifyService.success("", "Hello " + data.data.email);               
                this.router.navigate(['/login']);
              }
            },
            error => {
              this.validationResult.status = ValidationState.Error;
              this.validationResult.message = error.message;
              this.dynamicNotifyService.validationMessage(this.validationResult)
              this.loading = false;
            }
          )
  }

}
