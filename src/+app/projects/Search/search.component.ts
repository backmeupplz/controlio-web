import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalValidator } from '../validation/global-validator';

@Component({
  styles: [`
    :host form {
      margin-top: 24px;
    }

    .search-icon {
      width: 20px;
      height: auto;
      display: flex;
      margin-right: 15px;
    }

    .search-cancel {
      position: absolute;
      right: 15px;
      top: 2px;
      width: 7px;
      height: 20px;
    }

    .search-input {
      border-width: 0;
      background: rgba(0,0,0,0);
      border-bottom: 1px solid #a3adbb;
      border-radius: 0;
      height: 2em;
      color: #585d6c;
      flex-grow: 1;
      display: flex;
      max-width: 100%;
      width: 100%;
    }

    .mark-text {
      padding: 0 10px;
      font-size: 12px;
      color: #585d6c;
      line-height: 2.38em;
    }

    .material-input {
      border-width: 0;
      background: rgba(0,0,0,0);
      color: rgba(88, 93, 108, 0.75);
    }

    .js-hidden-border .search-input {
      border-bottom-width: 0;
    }
  `],
  selector: 'search',
  template: require("./search.pug")
})
export class SearchComponent implements OnInit {
  public myForm: FormGroup;
  private typeProjects: any[] = ["active", "all projects","archived"];
  private typeOrders: any[] = ["recent", "old"];
  @Output() valueChange = new EventEmitter(true);
  private isSetText: boolean = false;
  private typeProject: any;
  constructor(private _fb: FormBuilder) {
    this.myForm = this._fb.group({
      text: new FormControl(''),
      typeProject: new FormControl("active"),
      typeOrder: new FormControl("recent"),
    });

    this.myForm.valueChanges.subscribe(data => {
      this.valueChange.emit(data);
      this.isSetText = data.text.length > 0;
    })
  }

  clearText(){
    this.myForm.controls['text'].setValue("");
  }

  ngOnInit() { }
}
