import { Component, Output, EventEmitter, ElementRef, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';

@Component({
  selector: 'limit-input',
  styles: [`
    :host {
      position: relative;
      display: inline-block;
      width: 100%;
    }

    #hiddenDivTextarea {
      z-index: 1;
      opacity: 0;
      position: absolute;
      background: red;
      word-wrap: break-word;
    }

    #description {
      z-index: 2;
      position: relative;
      height: 56px;
    }

    .mytextarea {
      padding: 10px 20px;
      resize: none;
      overflow: hidden;
      padding-right: 47px;
      background: #fff;
      margin-top: 0px;
      padding-left: 20px;
      font-size: 1em;
      border-radius: 3px;
      color: #585d6c;
      width: 100%;
      border: 1px solid #eceff3;
    }

    .limit-output {
      position: relative;
      z-index: 4;
      font-size: .8em;
      font-weight: bolder;
      opacity: .5;
      margin: -2.3em .8em 0 .8em;
    }

    .limit-output .limit-str {
      position: absolute;
      right: 0;
      text-align: right;
    }
  `],
  template: `
    <label class="context" for="description" *ngIf="label">{{ label }}</label>
    <div class="mytextarea" id="hiddenDivTextarea">{{ inputValue + checkStr }}</div>
    <textarea
      type="text"
      class="mytextarea"
      placeholder="Message"
      id="description"
      [(ngModel)]="inputValue"
      name="inputValue"
      (paste)="inputPaste($event)"
      (keydown)="inputChanged($event)"
      (blur)="inputBlurred($event)"
      ngDefaultControl row="3">
    </textarea>
    <p class="limit-output"><span class="limit-str" *ngIf="(limit < InfinityValue) && showLimit" [ngClass]="{ 'js-is-used-limit': use >= limit }">{{ use }} / {{ limit }}</span></p>
  `,
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LimitInput),
    multi: true,
  }]
})
export class LimitInput implements ControlValueAccessor {

  private checkStr: string = "";
  private InfinityValue: number = Infinity;
  private inputValue: string = '';
  private use: number = 0;

  @Input() limit: number = 210;
  @Input() shorten: boolean = true;
  @Input() showLimit: boolean = true;

  @Input() label: string;
  @Input() minHeight: number = 46;
  @Input() addDown: number = 10;


  constructor(private elementRef: ElementRef) {}

  onChange( str: string ){
    if(this.shorten === true){
      this.inputValue = str.slice( 0, this.limit );
    }
    this.use = this.inputValue.length;
    this.adjustHeight( this.elementRef.nativeElement );
    this.propagateChange(this.inputValue);
  }

  ngAfterViewChecked(){
    this.onChange(this.inputValue);
  }

  private propagateChange = (_: any) => {};
  public writeValue(obj: string) {
    if (obj) {
        this.inputValue = obj;
    }
  }
  public registerOnChange(fn: any) {
      this.propagateChange = fn;
  }
  public registerOnTouched() {}

  public adjustHeight(textarea){
    let minHeight = this.minHeight;
    let addDown = this.addDown;
    let childs = textarea.children;
    if( childs.description ){
      let clild = childs.description;
      let hiddenDiv = childs.hiddenDivTextarea;

      this.checkStr = "checkStr";
      clild.style.height = (((hiddenDiv.clientHeight) > minHeight ? hiddenDiv.clientHeight: minHeight ) + addDown ) + "px";
    }
    this.checkStr = "";
  }

  // Input

  inputChanged(event) {
    this.onChange( this.inputValue );
  }

  inputBlurred(event) {
  	this.onChange( this.inputValue );
  }

  inputPaste(event) {
  	this.onChange( this.inputValue );
  }

}
