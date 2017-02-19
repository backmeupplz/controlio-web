import { AbstractControl }  from '@angular/forms';

export interface AbstractControlWarn extends AbstractControl { warnings: any; }

export class GlobalValidator {
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

  static checkPassword(control: AbstractControlWarn): ValidationResult {
    function getTime(str){

      let res: string;
      var chars = 0;
      var rate = 2800000000;

      if((/[a-z]/).test(str)) chars +=  26;
      if((/[A-Z]/).test(str)) chars +=  26;
      if((/[0-9]/).test(str)) chars +=  10;
      if((/[^a-zA-Z0-9]/).test(str)) chars +=  32;

      var pos = Math.pow(chars,str.length);
      var s = pos/rate;

      var decimalYears = s/(3600*24*365);
      var years = Math.floor(decimalYears);

      var decimalMonths =(decimalYears-years)*12;
      var months = Math.floor(decimalMonths);

      var decimalDays = (decimalMonths-months)*30;
      var days = Math.floor(decimalDays);

      var decimalHours = (decimalDays-days)*24;
      var hours = Math.floor(decimalHours);

      var decimalMinutes = (decimalHours-hours)*60;
      var minutes = Math.floor(decimalMinutes);

      var decimalSeconds = (decimalMinutes-minutes)*60;
      var seconds = Math.floor(decimalSeconds);

      var time: string[] = [];

      if(years > 0){
        if(years == 1)
          time.push("1 year");
        else
          time.push(years + " years");
      }
      if(months > 0){
        if(months == 1)
          time.push("1 month");
        else
          time.push(months + " months");
      }
      if(days > 0){
        if(days == 1)
          time.push("1 day");
         else
          time.push(days + " days");
      }
      if(hours > 0){
        if(hours == 1)
          time.push("1 hour");
        else
          time.push(hours + " hours");
      }
      if(minutes > 0){
        if(minutes == 1)
          time.push("1 minute, ");
        else
          time.push(minutes + " minutes");
      }
      if(seconds > 0){
        if(seconds == 1)
          time.push("1 second, ");
        else
          time.push(seconds + " seconds");
      }

      if(time.length <= 0)
        res = "less than one second";
      else if(time.length == 1)
        res = time[0];
      else
        res = time[0] + ", " + time[1];

      let strong: number = 0;
      let strongStr: string;
      let strongClass: string;
      let timeStr = res;

      if(s > 3600*24*365*100){
        strong = 4;
        strongStr = "Great";
        strongClass = "great";
      } else if(s > 3600*24*365*2){
        strong = 3;
        strongStr = "Good";
        strongClass = "good";
      } else if(s > 3600*24*100){
        strong = 2;
        strongStr = "So so";
        strongClass = "so-so";
      } else if(s > 600){
        strong = 1;
        strongStr = "Week";
        strongClass = "week";
      } else {
        strongStr = "Very week";
        strongClass = "very-week";
        strong = 0;
      }
     return { timeStr, strong, strongStr, strongClass };
    }

    control.warnings = getTime(control.value);
    return null;
  }
}

interface ValidationResult {
    [key: string]: boolean;
}
