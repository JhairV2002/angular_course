//base class for form control, form group and form array
// contains everything about them
import { AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidator {
  static ValidateName(control: AbstractControl) {
    // save the control value
    const value: string = control.value;

    // check if the value contains test
    if (value.includes('test')) {
      return {
        validateName: {
          valid: false,
        },
      };
    }
    // if everything is fine return null
    return null;
  }

  /**
   * ValidateSpecialChar
   */
  // passing parameters
  static ValidateSpecialChar(char: string) {
    return (control: AbstractControl) => {
      const value = control.value as string;
      if (value.includes(char)) {
        return {
          validateSpecialChar: {
            valid: false,
          },
        };
      }
      return null;
    };
  }

  static ValidateDate(control: FormGroup) {
    const checkInDate: any = new Date(control.get('checkInDate')?.value);
    const checkOutDate: any = new Date(control.get('checkOutDate')?.value);
    const diffTime = checkOutDate - checkInDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      // asign the error to the control
      control.get('checkOutDate')?.setErrors({
        invalidDate: true,
      });
      return {
        invalidDate: {
          valid: true,
        },
      };
    }
    return null;
  }
}
