import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {
  @Output() updated = new EventEmitter();
  @Input() opened: boolean;  
}
