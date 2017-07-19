import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'update-modal',
  templateUrl: './update-modal.component.html'
})
export class UpdateModalComponent {
  @Output() updated = new EventEmitter();
  @Input() opened: boolean;  
}
