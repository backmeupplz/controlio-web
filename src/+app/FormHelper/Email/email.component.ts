import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { TagInputComponent } from "./tag-input/tag-input.component"
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

let temp = `  <tag-input
		class="tag-input"
    [placeholder]="placeholder"
    [allowedTagsPattern]="validEmailPattern"
    (valueChange)="onChange($event)"
    [lasttagsList]="lasttagsList"
    [setValue]="settings.recipients" name="recipients"
    delimiterCode="188"  ngDefaultControl>
  </tag-input>`;


@Component({
  styles: [`
  .tag-input {
    height: auto;
    flex-wrap: wrap;
  }
  `],
  selector: 'email-tag',
  template: temp,
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EmailComponent),
    multi: true,
  }
  ]
})

export class EmailComponent implements ControlValueAccessor {

  private propagateChange = (_: any) => {};
  public writeValue(value: string[]) {
    this._emails = value;
  }
  public registerOnChange(fn: any) {
      this.propagateChange = fn;
  }
  public registerOnTouched() {}

  onChange( value: { value: string[], isChanged: boolean } ){
    if( value.isChanged ){
      this._emails = value.value;
      this.emailsChange.emit( this._emails );
      this.propagateChange(this._emails);
    }
  }


  @Input() placeholder: string = "";

  private lasttagsList: string[] = null;
  private isSet: boolean = false;

  @Output() emailsChange = new EventEmitter();



  private _emails: string[];
  @Input()
  set emails( emails: string[] ){
   
    this.settings = { recipients: emails };
    this._emails = emails;
    if(!this.isSet ){
      this.lasttagsList = (emails) ? emails.map((elem)=>{
        return elem;
      }) : [];
      this.isSet = true;
    }
  }

  get emails() {
    return this._emails;
  }

	public validEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	public settings = {
		recipients: [],
	}
}
