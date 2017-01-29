export class AppSettings {
  private static get DEBUG_MODE(): boolean { return false; }
  public static get API_ENDPOINT(): string { return AppSettings.DEBUG_MODE ? 'http://localhost:8443' : 'https://test.controlio.co' }
  public static get DEFAUL_IMG(): string { return 'assets/img-icon.svg'; }
  public static get API_KEY(): string { return "p[oqkix=%FAi]&FMAYnLUJJWC,w" }
  public static get ACESS_CONTROL_ALLOW_ORIGIN(): string { return  '*' }
  public static get CONTENT_TYPE(): string { return  'application/json' }
}
