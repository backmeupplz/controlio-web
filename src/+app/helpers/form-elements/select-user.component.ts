import { Component, OnInit, ViewEncapsulation, Input, ElementRef, Output, EventEmitter } from '@angular/core';



@Component({
  styles: [``],
  selector: 'select-user',
  template: `
  <ng-select class="user-select" 
    [active]="active"
    [allowClear]="true"
    [items]="items"
    [disabled]="disabled"
    (data)="refreshValue($event)"
    (selected)="selected($event)"
    (removed)="removed($event)"
    (typed)="typed($event)"
    placeholder="No select user">
  </ng-select>`,
  //encapsulation: ViewEncapsulation.None 
})

//    [closeList]="close"
export class SelectUser implements OnInit {
  componentName: "SelectUser";
  private _disabledV:string = '0';
  private disabled:boolean = false;
  private items:Array<any> = [];
  public close: boolean = false;
  constructor(private elementRef: ElementRef) { }
  public value: any = null;
  private active: any;
  @Input()
  set input(val){
    if( typeof val === "object" && val !== null ) val.text = this.getText( val.name );
    if(val != this.active) this.active = [val];
  }

  @Input()
  set users(items: Array<any>){

    let res = [];
    items.forEach((user:{name:string, id:string, user_id: number}) => {
      res.push({
        id: user.id,
        text: this.getText( user.name ),
      });
    });
    this.items = res;
  }

  @Output() valueChange = new EventEmitter(true);

  onChanges(newValue) {
    this.valueChange.emit(newValue);
  }

  @Input()
  set event(event: any) {
    if( event != null ) this.handleClick(event);
  }

  handleClick(event){
    if (!this.elementRef.nativeElement.contains(event.target)){ // or some similar check
      this.close = !this.close;
    }
  }


  public getText(text){
    return `<div class="line-select"><img src="assets/EF23F3CC-80AC-4C50-9CF7-23E6934C4A0B.png"><p>` +  text  + `</p></div>`;
  }

  public ngOnInit():any {}

  private get disabledV():string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {
    //this.value = value;
    this.onChanges(value);
  }

  public removed(value:any):void {
    this.value = null;
    this.onChanges(value);
  }

  public typed(value:any):void {
    
  }

  public refreshValue(value:any):void {
    this.value = value;
  }
}