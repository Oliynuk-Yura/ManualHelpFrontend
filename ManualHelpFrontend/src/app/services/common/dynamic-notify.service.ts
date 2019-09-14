import { Injectable } from '@angular/core';
import {NotifyService} from "./notify.service";
import { ValidationResult } from "../../core/common/validationResult";
import { ValidationState } from "../../core/common/enum/ValidationState";

@Injectable({
  providedIn: 'root'
})
export class DynamicNotifyService {

  constructor(public notify :NotifyService) { }

  validationMessage(validationResult: ValidationResult): boolean {
    let flag: boolean = false;

    switch (validationResult.status) {
      case ValidationState.Warning:
        this.notify.warning("", validationResult.message);
        flag = true;
        break;      
      case ValidationState.Error:
        this.notify.error("", validationResult.message);
        flag = true;
        break;
      case ValidationState.Info:
        this.notify.info("", validationResult.message);
        flag = true;
        break;
      default:
    }  

    return flag;
  }

  invalidFormMessagePop(fieldKey: string, keyError: string) {
    let message = '';
    switch (keyError) {
      case 'required':
        message = fieldKey + ' ' + 'required';
        break;
      case 'email':
        message = fieldKey + ' ' + 'required';;
        break;
      case 'min':
        message = fieldKey + ' ' + 'required';
        break;
      case 'max':
        message = fieldKey + ' ' + 'required';
        break;
      case 'mustMatch':
        message = fieldKey + ' ' + 'mustMatch';
      default:
        message = fieldKey + ' ' + keyError;
        break;
    }
    this.notify.warning('', message);
  }
  
}
