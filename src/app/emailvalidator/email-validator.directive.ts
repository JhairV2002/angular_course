import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  // letting angular know we add our own validator
  providers: [
    {
      // adding our validator in the existing validators
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    // use the type of the form controll
    const emailValue = control.value as string;
    if (emailValue.includes('test')) {
      return {
        invalidEmail: true,
      };
    }

    return null;
  }
}
