import {Injectable} from '@angular/core';

@Injectable()
export class AppConfig {
  public static get API_ENDPOINT(): string { return process.env.API_ENDPOINT || '' }
  public static get API_ENDPOINT_IMAGE(): string { return process.env.API_ENDPOINT_IMAGE || '' }
  public static get STRIPE_KEY(): string { return process.env.STRIPE_KEY || '' }
  public static get API_KEY(): string { return process.env.API_KEY || '' }
  public static get ACESS_CONTROL_ALLOW_ORIGIN(): string { return  process.env.ACESS_CONTROL_ALLOW_ORIGIN || '*' }
  public static get CONTENT_TYPE(): string { return  process.env.CONTENT_TYPE || 'application/json' }
}


export class VALIDATOR_CONFIG_PROJECT {
  public static get MESSAGE_MAX_LENGTH(): number { return process.env.MESSAGE_MAX_LENGTH || 200 }
}
