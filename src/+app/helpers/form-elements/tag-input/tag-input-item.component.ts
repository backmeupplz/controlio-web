import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tag-input-item',
  template:
  `{{text}}
  <span
  class="ng2-tag-input-remove"
  (click)="removeTag()">&times;</span>`,
  
  styles: [`

    :host.ng2-tag-input-item-selected {
      color: white;
      background: #0d8bff;
    }

    .ng2-tag-input-remove {
      cursor: pointer;
      display: inline-block;
      padding: 0 3px;
    }

    :host {
      margin-bottom: 0;
    }
  `],
  host: {
    '[class.ng2-tag-input-item-selected]': 'selected'
  }
})
export class TagInputItemComponent {
  @Input() selected: boolean;
  @Input() text: string;
  @Input() index: number;
  @Output() tagRemoved = new EventEmitter();

  constructor() { }

  removeTag() {
    this.tagRemoved.emit(this.index);
  }
}