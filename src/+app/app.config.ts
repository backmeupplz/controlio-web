import {Injectable} from '@angular/core';

@Injectable()
export class AppConfig {

  // change
  private static get DEBUG_MODE(): boolean { return true; }
  public static get API_ENDPOINT(): string { return AppConfig.DEBUG_MODE ? 'http://localhost:8443' : 'https://test.controlio.co' }

  public get API_ENDPOINT(): string { return AppConfig.DEBUG_MODE ? 'http://localhost:8443' : 'https://test.controlio.co' }

  // remove
  public static get DEFAUL_IMG(): string { return 'assets/img-icon.svg'; }

  // change view
  public static get API_KEY(): string { return "p[oqkix=%FAi]&FMAYnLUJJWC,w" }
  public static get ACESS_CONTROL_ALLOW_ORIGIN(): string { return  '*' }

  // remove
  public static get CONTENT_TYPE(): string { return  'application/json' }
}
