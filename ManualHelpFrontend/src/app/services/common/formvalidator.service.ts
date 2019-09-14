import { Injectable } from '@angular/core';
import { ValidationResult } from "../../core/common/validationResult";
import { ToasterService } from 'angular2-toaster';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ValidationState } from "../../core/common/enum/ValidationState";
import { AbstractControl, ValidatorFn} from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class FormvalidatorService {

  constructor(private toaster: ToasterService) { }

  validateUserName(name: string): ValidationResult {

    let result: ValidationResult = new ValidationResult();
    
    if (name.match(/^\d/)) {
      result.status = ValidationState.Warning;
        result.message = "Don`t must start with number";
      }
    
      if (name.length < 3) {
        result.status = ValidationState.Warning;
        result.message += " Must have more 3 symbol";
      }    
    
    return result;

  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {      
      const reg: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const forbidden = !reg.test(control.value);
      return control.value === '' ? null : (forbidden ? { 'badFormat': { value: control.value } } : null);
    };
  }

}
