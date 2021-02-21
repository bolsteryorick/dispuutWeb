import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit{
  @Input() title = "";
  @Input() text = "";
  @Input() modalButtonText = "";
  @Input() confirmButtonText = "";
  @Input() cancelButtonText = "";
  @Input() modalId!: string;
  @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();
  modalSelector!: string;

  ngOnInit(): void {
    this.modalSelector = this.getModalIdSelector();
  }

  confirmButtonClick(){
    this.confirm.emit(true);
  }

  getModalIdSelector(): string{
    return `#${this.modalId}`;
  }

}
