import { Injectable } from '@angular/core';

function getWindow (): any {
    return window;
}
function getURL (file: any): any {
  return window.URL.createObjectURL(file);
}

@Injectable()
export class NativeWindow {
	get nativeWindow (): any {
	  return getWindow();
	}
	createObjectURL(file: any): any {
	  return getURL(file);
	}
}