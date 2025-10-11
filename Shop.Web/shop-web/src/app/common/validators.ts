import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static noSpaces(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = (control.value || '').trim();
      if (value.length === 0 && control.value) {
        return { noSpaces: 'The field cannot consist only of spaces.' };
      }
      return null;
    };
  }

  static userNamePattern(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      if (value && !/^[A-Za-z0-9_.]+$/.test(value)) {
        return {
          invalidChars: 'Only letters, numbers, "_" and "." are allowed.',
        };
      }
      return null;
    };
  }

  static getErrorMessage(control: AbstractControl | null): string | null {
    if (!control || !control.touched || !control.errors) return null;

    const errors = control.errors;

    if (errors['required']) return 'Field is required';
    if (errors['minlength'])
      return `Min length ${errors['minlength'].requiredLength} characters`;
    if (errors['maxlength'])
      return `Max length ${errors['maxlength'].requiredLength} characters`;
    if (errors['email']) return 'Enter a valid email';
    if (errors['noSpaces']) return errors['noSpaces'];
    if (errors['invalidChars']) return errors['invalidChars'];
    if (errors['passwordMismatch']) return 'Passwords do not match';

    return null;
  }
}
