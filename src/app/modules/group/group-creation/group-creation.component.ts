import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GroupConstants } from 'src/app/constants/group-constants';
import { CreateGroupData } from '../../models/create-group';
import { GetUserData } from '../../models/get-user';
import { ContactsService } from '../services/contacts.service';
import { GroupService } from '../services/group.service';
import { ContactItem } from './models/contactItem';

@Component({
  selector: 'app-group-creation',
  templateUrl: './group-creation.component.html',
  styleUrls: ['./group-creation.component.scss']
})
export class GroupCreationComponent implements OnInit {

  public readonly groupNameValidators: ValidatorFn[] = GroupConstants.groupNameValidators;
  public readonly groupDescriptionValidators: ValidatorFn[] = GroupConstants.groupDescriptionValidators;
  public readonly contactsValidators: ValidatorFn[] = GroupConstants.contactsValidators;

  public readonly groupNameMessage: string = GroupConstants.groupNameMessage;
  public readonly groupDescriptionMessage: string = GroupConstants.groupDescriptionMessage;
  public readonly contactsMessage: string = GroupConstants.contactsMessage;
  public groupForm!: FormGroup;

  contacts: Array<ContactItem> = [];
  dropdownSettings!: IDropdownSettings;
  
  constructor(
    private _contactsService: ContactsService,
    private _formBuilder: FormBuilder,
    private _groupService: GroupService,
    private _router: Router
  ) 
  {
  }

  ngOnInit() {
    console.log("group creation init");
    // get user contacts

    const request = this._contactsService.getUserContactsInformation();
    request.subscribe((result: GetUserData) => {
      this.contacts = result.data.getUser.contacts?.map(x => <ContactItem>{userId : x.contactUserId, email: x.emailAddress});
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'userId',
      textField: 'email',
      enableCheckAll: false,
      itemsShowLimit: 100,
      allowSearchFilter: true,
      defaultOpen: true
    };

    this.groupForm = this._formBuilder.group({
      groupNameInput: new FormControl({ value: '', disabled: false }),
      groupDescriptionInput: new FormControl({ value: '', disabled: false }),
      contacts: [[]]
    });

    this.groupForm?.controls?.groupNameInput?.setValidators(this.groupNameValidators);
    this.groupForm?.controls?.groupDescriptionInput?.setValidators(this.groupDescriptionValidators);
    this.groupForm?.controls?.contacts?.setValidators(this.contactsValidators);
  }

  onItemSelect(item: any) {
      console.log('onItemSelect', item);
  }
  onSelectAll(items: any) {
      console.log('onSelectAll', items);
  }


  
  public buttonDisabled() {
    return !this.groupForm.controls.groupNameInput.valid || !this.groupForm.controls.groupDescriptionInput.valid || !this.groupForm.controls.contacts.valid;
  }

  public createGroup(){
    const formVal = this.groupForm.getRawValue();
    let name = formVal.groupNameInput.toString();
    let description = formVal.groupDescriptionInput.toString();
    let contacts : [ContactItem] = formVal.contacts;
    let platformContacts = contacts.filter(x => x.userId != null);
    let userIds = platformContacts.map(c => c.userId);
    const request = this._groupService.createGroup(name, description, userIds);
    request.subscribe((result: CreateGroupData) => {
      let groupId = result.data.createGroup.id;
      this._router.navigate([`/group/view/${groupId}`])
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });

    // todo allow user to send emails for these
    let outsideContacts = contacts.filter(x => x.userId == null);
    console.log(`Outside contacts: ${outsideContacts}`)
  }
}
