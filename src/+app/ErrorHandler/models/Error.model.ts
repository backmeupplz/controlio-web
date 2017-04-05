export class ErrorCommon {
  public title: string;
  public type: string;
  public message: string;
  constructor(obj: { title: string, type: string, message: string }){
    this.title = obj.title;
    this.type = obj.type;
    this.message = obj.message;
  }
}

export class ErrorServer extends ErrorCommon {
  public status: number;
  constructor(obj: { title: string, status: number, type: string, message: string }){
    super(obj)
    this.status = obj.status;
  }
}

export class ErrorServerConnect extends ErrorServer {
  constructor(){
    super({ title: "Check you internet connection and try again", status: 0, type: "ERROR_CONNECT", message: "We couldn't connect to the server" })
  }
}

export class ErrorRequest extends ErrorServer {
  constructor(obj: { status: number, type: string, message: string }){
    super({ title: "Ошибка при отправке запроса!", status: obj.status, type: obj.type, message: obj.message })
  }
}
