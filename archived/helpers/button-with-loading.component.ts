import { Component, Input } from '@angular/core';

@Component({
  selector: "buttonl",
  template: `<button class="btn"><p *ngIf="!loading">{{ text }}</p><p *ngIf="loading">Loading</p></button>`
})
export class ButtonWithLoading {
  @Input() text: string;
  @Input() loading: boolean = false;
}

