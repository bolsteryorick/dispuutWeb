import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { UserService } from 'src/app/services/authentication/user.service';
import { ContactsService } from 'src/app/services/contact/contacts.service';
import { ToolbarAdditionService } from 'src/app/services/DataShareServices/toolbar-addition.service';
import { GetOtherUser } from '../../../models/user-models/get-other-user';
import { ProfileService } from '../../../services/profile/profile.service';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.scss']
})
export class OtherProfileComponent implements OnInit {

  private otherUserId: string = "";
  email: string = "";
  userName: string = "";
  isContact!: boolean;
  loading: boolean = true;
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _profileService: ProfileService,
    private _contactService: ContactsService,
    private _titleService: ToolbarAdditionService
    ) {
      this._route.params.subscribe( params => this.otherUserId = params.id )
      if(_userService.userId() == this.otherUserId){
        this._router.navigate([`/profile/my-profile`])
      }
    }

  ngOnInit(): void {
    const request = this._profileService.getOtherProfile(this.otherUserId);
    request.subscribe((result: ApolloQueryResult<GetOtherUser>) => {
      this.email = result.data.getOtherUser.email;
      this.userName = result.data.getOtherUser.userName;
      this.isContact = result.data.getOtherUser.isContact!;
      this._titleService.changeTitleMessage(this.userName);
      this.loading = false;
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  addAsContact(): void{
    this.loading = true;
    const request = this._contactService.createContact(this.otherUserId);
    request.subscribe(() => {
      this.loading = false;
      this.isContact = true;
    });
  }

}