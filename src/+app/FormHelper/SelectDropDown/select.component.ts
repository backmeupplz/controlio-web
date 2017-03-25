import { Component, OnInit, Input, ViewChild, forwardRef } from '@angular/core';
import { BurgerDropDownList } from '../../Navigation/DropDownList';
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';

@Component({
  selector: 'fh-select',styles:[`
    :host {
      position: relative;
    }
    .material-input {
      border-width: 0;
      background: rgba(0,0,0,0);
      color: rgba(88, 93, 108, 0.75);
      display: inline-flex;
      line-height: 2em;
      cursor: pointer;
    }
    :host burger-drop-down-list {
      position: absolute;
      left: -50%
    }
    .material-input img {
      padding: 0 0.5em
    }

    :host >>> .windows-options {
      width: 160px;
      z-index: 20;
    }
    :host >>> .windows-options ul {
      margin-bottom: 0;
      padding: .3em 0;
    }

    :host >>> .menu-block a.active, :host >>> .menu-block.checked a {
      border-width: 0;
    }
    :host >>> .menu-block.checked {
      background: #eaeaea;
    }
    :host >>> .menu-block .text-label {
      padding: 10px 0;
    }
  `],
  template: require('./fh-select.component.pug'),
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FHSelect),
    multi: true,
  }]
})
export class FHSelect implements OnInit {
  @ViewChild(BurgerDropDownList) list: BurgerDropDownList;

  constructor() { }
  ngOnInit() { }
  private value: number = 0;
  private _selected: any = null;
  set selected(value: any){
    if(this._selected) this._selected.ischecked = false;
    this._selected = value;
    if(this._selected) this._selected.ischecked = true;
  }
  get selected(): any {
    return this._selected;
  }

  private _elemenets: any[] = [];
  @Input()
  set elements(elements: any){
    this._elemenets = elements.map((elem)=>{
      elem.action = ()=>{
        this.onChange(elem.id);
      }
      if(elem.ischecked){
        this.value = elem.id;
      }
      return elem;
    });

    this.onChange(this.value);
  }
  get elements(){
    return this._elemenets;
  }

  onChange( value: number ){
    this.list.setClose();
    this.setValue(value)
    this.propagateChange(this.value);
  }

  // ControlValueAccessor

  private propagateChange = (_: any) => {};
  public writeValue(obj: number) {
    if (obj) {
        this.value = obj;
    }
  }
  public registerOnChange(fn: any) {
      this.propagateChange = fn;
  }
  public registerOnTouched() {}

  setValue(id){
    this.value = id;
    this.selected = this.elements.find((elem)=>{ return elem.id == this.value });
  }

  openDropDownList(){
    this.list.open();
  }
}
