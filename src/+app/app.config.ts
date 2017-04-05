import {Injectable} from '@angular/core';

@Injectable()
export class AppConfig {

// 'https://api.controlio.co'


  private static get DEBUG_MODE(): boolean { return false; }
  //'http://192.168.1.66:8443'
  public static get API_ENDPOINT(): string { return AppConfig.DEBUG_MODE ? 'http://localhost:8443' : 'http://api.controlio.co:3001'}
  public static STRIPE_KEY(): string { return 'pk_test_MybaaRNvH9ndvmA5ty1atlGO' }

  // remove
  public static get DEFAUL_IMG(): string { return 'assets/img-icon.svg'; }


  public static get API_KEY(): string { return "p[oqkix=%FAi]&FMAYnLUJJWC,w" }
  public static get ACESS_CONTROL_ALLOW_ORIGIN(): string { return  '*' }
  public static get CONTENT_TYPE(): string { return  'application/json' }
}


export class VALIDATOR_CONFIG_PROJECT {
  public static get MESSAGE_MAX_LENGTH(): number { return 200 }
}
