import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchResult } from '@apollo/client/core';
import { GroupConstants } from 'src/app/constants/group-constants';
import { GroupService } from 'src/app/services/group/group.service';
import { CreateGroup } from '../../../models/group-models/create-group';
import { ContactItem } from './models/contactItem';

@Component({
  selector: 'app-group-creation',
  templateUrl: './group-creation.component.html',
  styleUrls: ['./group-creation.component.scss']
})
export class GroupCreationComponent implements OnInit {

  public readonly groupNameValidators: ValidatorFn[] = GroupConstants.groupNameValidators;
  public readonly groupDescriptionValidators: ValidatorFn[] = GroupConstants.groupDescriptionValidators;

  public readonly groupNameMessage: string = GroupConstants.groupNameMessage;
  public readonly groupDescriptionMessage: string = GroupConstants.groupDescriptionMessage;
  public groupForm!: FormGroup;

  selectedContacts: Array<ContactItem> = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _groupService: GroupService,
    private _router: Router
  ) 
  {
  }

  ngOnInit() {
    this.groupForm = this._formBuilder.group({
      groupNameInput: new FormControl({ value: '', disabled: false }),
      groupDescriptionInput: new FormControl({ value: '', disabled: false }),
    });

    this.groupForm?.controls?.groupNameInput?.setValidators(this.groupNameValidators);
    this.groupForm?.controls?.groupDescriptionInput?.setValidators(this.groupDescriptionValidators);
  }

  selectedContactsChanged(items: ContactItem[]){
    this.selectedContacts = items;
  }
  
  public buttonDisabled(){
    return !this.groupForm.controls.groupNameInput.valid || !this.groupForm.controls.groupDescriptionInput.valid || !(this.selectedContacts.length > 0);
  }

  public createGroup(){
    const formVal = this.groupForm.getRawValue();
    let name = formVal.groupNameInput.toString();
    let description = formVal.groupDescriptionInput.toString();
    let contacts : ContactItem[] = this.selectedContacts;
    let platformContacts = contacts.filter(x => x.userId != null);
    let userIds = platformContacts.map(c => c.userId);
    const request = this._groupService.createGroup(name, description, userIds);
    request.subscribe((result: FetchResult<CreateGroup>) => {
      let groupId = result.data?.createGroup.id;
      this._router.navigate([`/group/view/${groupId}`])
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });

    // todo allow user to send emails for these
    let outsideContacts = contacts.filter(x => x.userId == null);
  }
}
