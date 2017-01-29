import { AbstractControl }  from '@angular/forms';

export class GlobalValidator{
  static mailFormat(control: AbstractControl): ValidationResult {

    var EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
        return { "incorrectMailFormat": true };
    }

    return null;
  }

  static confirm( controlCheck: AbstractControl ){
    return function( control: AbstractControl ): ValidationResult {
      if (control.value != controlCheck.value ) {
          return { "noConfirm": true };
      }
      return null;
    }

  } 
}

interface ValidationResult {
    [key: string]: boolean;
}