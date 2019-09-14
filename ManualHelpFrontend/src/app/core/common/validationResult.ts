import { ValidationState } from "../../core/common/enum/ValidationState";

export class ValidationResult {
  public status: ValidationState = ValidationState.Success;
  public message: string = "";
}
