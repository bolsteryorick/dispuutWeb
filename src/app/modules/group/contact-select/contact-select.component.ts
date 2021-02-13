import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ValidatorFn } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GroupConstants } from 'src/app/constants/group-constants';
import { Contact } from '../../models/app-models/contact';
import { GetUserData } from '../../models/get-user';
import { ContactItem } from '../group-creation/models/contactItem';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contact-select',
  templateUrl: './contact-select.component.html',
  styleUrls: ['./contact-select.component.scss']
})
export class ContactSelectComponent implements OnInit {
  public readonly contactsValidators: ValidatorFn[] = GroupConstants.contactsValidators;
  public readonly contactsMessage: string = GroupConstants.contactsMessage;

  contacts: Array<ContactItem> = [];
  dropdownSettings!: IDropdownSettings;
  contactSelectControl!: FormControl;
  @Input() alreadyUsedEmails: string[] = [];
  @Output() selectedContactsChanged: EventEmitter<ContactItem[]> = new EventEmitter<ContactItem[]>();

  constructor(
    private _contactsService: ContactsService,
    private _formBuilder: FormBuilder) { }

  
  ngOnInit(): void {
    this.contactSelectControl = new FormControl(null, this.contactsValidators)

    const request = this._contactsService.getUserContactsInformation();
    request.subscribe((result: GetUserData) => {
      let contacts = result.data.getUser.contacts?.map(x => <ContactItem>{userId : x.contactUserId, email: x.user.userName});
      this.contacts = contacts.filter(x => !this.alreadyUsedEmails.includes(x.email))
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'userId',
      textField: 'email',
      enableCheckAll: false,
      itemsShowLimit: 10,
      allowSearchFilter: true,
      defaultOpen: false
    };
  }

  onItemChange(item: any) {
    this.selectedContactsChanged.emit(this.contactSelectControl.value);
  }

  showErrorMessage() : boolean{
    return !this.contactSelectControl.valid && this.contactSelectControl.touched
  }

}
