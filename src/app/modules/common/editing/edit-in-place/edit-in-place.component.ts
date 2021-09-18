import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-in-place',
  templateUrl: './edit-in-place.component.html',
  styleUrls: ['./edit-in-place.component.scss']
})
export class EditInPlaceComponent implements OnInit {

  @Input() data!: any;
  @Input() validators: ValidatorFn[] = []; 
  @Input() errorMessage: string = "Input is invalid";
  @Input() type: string = "text";
  @Input() styling = {'font-size': '16px'};
  @Input() textArea = false;
  @Input() editPossible = false;
  @Input() maxLines = 10;
  @Output() focusOut: EventEmitter<string> = new EventEmitter<string>();
  viewData: string = "";
  viewMode = true;
  editInPlaceControl!: FormControl;
  faPen = faPen;


  constructor() {
  }

  ngOnInit() {
    this.editInPlaceControl = new FormControl(this.data, this.validators);
    this.setViewData();
  }

  onFocusIn(){
    this.viewMode=false;
  }

  onFocusOut() {
    this.viewMode=true;
    if(!this.inputIsValid()){
      this.editInPlaceControl.setValue(this.data);
    }
    else{
      this.setViewData();
    }
    this.focusOut.emit(this.editInPlaceControl.value);
  }

  inputIsValid(){
    return this.editInPlaceControl.valid;
  }

  setType(): string{
    return this.type;
  }

  showView(): boolean{
    if(!this.editPossible){
      return true;
    }
    return this.viewMode;
  }

  showInput(): boolean{
    if(!this.editPossible){
      return false;
    }
    return !this.viewMode && !this.textArea;
  }
  
  showTextArea(): boolean{
    if(!this.editPossible){
      return false;
    }
    return !this.viewMode && this.textArea;
  }

  private setViewData(){
    if(this.type == "date"){
      this.viewData = new Date(this.editInPlaceControl.value).toLocaleDateString();
    }
    else{
      this.viewData = this.editInPlaceControl.value;
    }
  }
}
