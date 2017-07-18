import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent {
  @Output() add = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();
  @Input() disabled: boolean;
}
