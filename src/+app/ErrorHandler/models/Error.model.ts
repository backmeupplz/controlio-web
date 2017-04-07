export class ErrorCommon {
  public title: string;
  public type: string;
  public message: string;
  public data: any;
  constructor(obj: { title: string, type: string, message: string, data: any }){
    this.title = obj.title;
    this.type = obj.type;
    this.message = obj.message;
    this.data = obj.data;
  }
}

export class ErrorServer extends ErrorCommon {
  public status: number;
  constructor(obj: { title: string, status: number, type: string, message: string, data: any }){
    super(obj)
    this.status = obj.status;
  }
}

export class ErrorServerConnect extends ErrorServer {
  constructor(data: any){
    super({ data: data, title: "Check you internet connection and try again", status: 0, type: "ERROR_CONNECT", message: "We couldn't connect to the server" })
  }
}

export class ErrorRequest extends ErrorServer {
  constructor(obj: { data: any, status: number, type: string, message: string }){
    super({ data: obj.data, title: "Ошибка при отправке запроса!", status: obj.status, type: obj.type, message: obj.message })
  }
}
