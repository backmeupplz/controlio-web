import { Component, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { TagInputComponent } from "./tag-input/tag-input.component"
import { FormsModule } from '@angular/forms';

let temp = `  <tag-input
		class="tag-input" [ngClass]="{ 'input-mode': open }"
    placeholder="Add an email"
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
  template: temp
})

export class Email {
	componentName: "Email";
	public model: any = {};
  private lasttagsList: string[] = null;
  private isSet: boolean = false;
  private open: boolean;
  @Output() valueChange = new EventEmitter();
  onChange( value ){
    this.valueChange.emit( value );
  }

  @Input()
  set setEmails( emails: string[] ){
    this.settings = { recipients: emails };
    if(!this.isSet ){
      this.lasttagsList = (emails) ? emails.map((elem)=>{
        return elem;
      }) : [];
      this.isSet = true;
    }
  }


  @Input()
  set event(event: any) {
    if( event != null ) this.handleClick(event);
    else this.open = false;
  }

  handleClick(event){
    if (this.elementRef.nativeElement.contains(event.target)){
      this.open = true;
    } else this.open = false;
  }

  constructor(private elementRef: ElementRef) { }
	public validEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	public settings = {
		recipients: [],
	}
}