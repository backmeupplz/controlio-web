import {Component, HostBinding, Input, Provider, forwardRef, Output, EventEmitter, ViewChild } from '@angular/core';
//import {NgControl} from '@angular/common';
import {TagInputItemComponent} from './tag-input-item.component';



@Component({
  selector: 'tag-input',
  template:
  `
    <div class="undo" *ngIf="isChanged && lasttagsList">
      <span class="glyphicon glyphicon-share-alt" aria-hidden="true" (click)="undo()"></span>
    </div>
    <div class="tags">
      <tag-input-item
        class="tag-input-item"
        [text]="tag"
        [index]="index"
        [selected]="selecletedTag === index"
        (tagRemoved)="_removeTag($event)"
        *ngFor="let tag of tagsList; let index = index; trackBy: trackByFn">
      </tag-input-item>
      <div class="list-item">
        <input
            #myInput
            [(ngModel)]="inputValue" name="inputValue"
            class="ng2-tag-input-field"
            type="text"
            [placeholder]="placeholder"
            (paste)="inputPaste($event)"
            (keydown)="inputChanged($event, myInput)"
            (blur)="inputBlurred($event)"
            (focus)="inputFocused()"
            #tagInputRef  ngDefaultControl>
      </div>
    </div>
    `,

  styles: [`
    list-item
    :host {
      display: inline-flex;
      width: auto;
      max-width: 100%;
      border: 1px solid #eceff3;
      box-shadow: 0 0 #fff;
      overflow-x: hidden;
      border-radius: 3px;
      padding: 0;
    }

    .tags {
      display: flex;
      flex-grow: 1;
      max-width: 100%;
      flex-wrap: wrap;
    }

    .list-item {
      flex-grow: 1;
      flex-basic: 25%;
    }
    .ng2-tag-input-field {
      box-shadow: none;
      border: 0;
      outline: none;
    }

    .undo {
      position: absolute;
      margin: 17px 15px;
      cursor: pointer;
      overflow: hidden;
      line-height: 2em;
      display: inline-flex;
      right: 0;
    }

    .undo span {
      opacity: .5;
      -moz-transform: scaleX(-1);
      -o-transform: scaleX(-1);
      -webkit-transform: scaleX(-1);
      transform: scaleX(-1);
      filter: FlipH;
      -ms-filter: "FlipH";
    }
  `],
})
export class TagInputComponent {
  @Input() placeholder: string = 'Add a tag';
  @Input()
  set setValue( arr: string[] ){
    this.tagsList = (arr) ? arr : [];
    this.onChange(this.tagsList);
    this.delimiter = parseInt(this.delimiterCode);
  }

  @ViewChild('myInput')
  myInputVariable: any;

  @Input() delimiterCode: string = '188';
  @Input() addOnBlur: boolean = true;
  @Input() addOnEnter: boolean = true;
  @Input() addOnPaste: boolean = true;
  @Input() allowedTagsPattern: RegExp = /.+/;
  //@HostBinding('class.ng2-tag-input-focus') isFocussed;

  @Output() valueChange = new EventEmitter();

  private isChanged: boolean = false;
  @Input() lasttagsList: string[];

  compareArray(){
    if( !this.tagsList || !this.lasttagsList ) return true;
    if(this.tagsList.length != this.lasttagsList.length) return true;

    this.lasttagsList.sort();
    this.tagsList.sort();
    let index = 0;
    this.lasttagsList.forEach((elem)=>{
      if(elem != this.tagsList[index]){
        return true;
      }
    });
    return false;
  }

  undo(){
    this.isChanged = false;
    this.tagsList = this.lasttagsList.map((elem)=>{
      return elem;
    });
    this.onChange(this.tagsList);
  }

  public tagsList: string[] = [];
  public inputValue: string = '';
  public delimiter: number;
  public selectedTag: number = null;
  private isFocussed: boolean;

  ngAfterViewInit() {
    if (!this.tagsList) {
      console.warn('TagInputComponent was passed an undefined value in ngModel. Please make sure the variable is defined.');
      this.tagsList = [];
      this.onChange(this.tagsList);
    }
  }

  inputChanged(event, input) {
    let key = event.keyCode;
    switch(key) {
      case 8: // Backspace
        this._handleBackspace(input);
        break;
      case 13: //Enter
        this.addOnEnter && this._addTags([this.inputValue]);
        event.preventDefault();
        break;

      case this.delimiter:
        this._addTags([this.inputValue]);
        event.preventDefault();
        break;
      case 37:
        if(this.isPostionStartNull(input)){
          if(this.selectedTag == null){
            this.selectedTag = this.tagsList.length - 1;
          } else if(this.selectedTag >= 0) {
            this.selectedTag -= 1;
          }
        }
        break;
      case 39:
        if(this.isPostionStartNull(input)){
          if(this.selectedTag <= 0 ){
            this.selectedTag = 1;
          } else if(this.selectedTag < this.tagsList.length) {
            this.selectedTag += 1;
          } else  {
            this._resetSelected();
          }
        }
        break;
      default:
        this._resetSelected();
        break;
    }
  }

  inputBlurred(event) {
    this.addOnBlur && this._addTags([this.inputValue]);
    this.isFocussed = false;
  }
  inputFocused(event) {
    this.isFocussed = true;
  }

  inputPaste(event) {
    let clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
    let pastedString = clipboardData.getData('text/plain');
    let tags = this._splitString(pastedString);
    let tagsToAdd = tags.filter((tag) => this._isTagValid(tag));
    this._addTags(tagsToAdd);
    setTimeout(() => this.inputValue = '', 3000);
  }

  private _splitString(tagString: string) {
    tagString = tagString.trim();
    let tags = tagString.split(String.fromCharCode(this.delimiter));
    return tags.filter((tag) => !!tag);
  }

  private _isTagValid(tagString: string) {
    return this.allowedTagsPattern.test(tagString);
  }

  private _addTags(tags: string[]) {
    let validTags = tags.filter((tag) => this._isTagValid(tag));
    this.tagsList = this.tagsList.concat(validTags);
    this._resetSelected();
    this._resetInput();
    if(this.compareArray()){ this.isChanged = true; }
    this.onChange(this.tagsList);
  }

  private _removeTag(tagIndexToRemove) {

    this.tagsList.splice(tagIndexToRemove, 1);
    this._resetSelected();
    if(this.compareArray()){ this.isChanged = true; }
    this.onChange(this.tagsList);
  }


  private isPostionStartNull(input){
    return input.selectionStart == 0 && input.selectionEnd == 0;
  }
  private _handleBackspace(input) {
    if ( this.isPostionStartNull(input) && this.tagsList.length > 0 ) {
      this._removeTag( (this.selectedTag) != null ? this.selectedTag : (this.tagsList.length - 1) );
    }
  }

  private _resetSelected() {
    this.selectedTag = null;
  }

  private _resetInput() {
    this.inputValue = '';
  }

  /** Implemented as part of ControlValueAccessor. */
  onChange: (value) => any = (value) => {
    this.valueChange.emit({ value: value, isChanged: this.isChanged })
  };

  onTouched: () => any = () => { };

  writeValue(value: any) { }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
