import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { UserService } from 'src/app/services/authentication/user.service';
import { ToolbarAdditionService } from 'src/app/services/DataShareServices/toolbar-addition.service';
import { Contact } from '../../../models/app-models/contact';
import { GetUser } from '../../../models/user-models/get-user';
import { ProfileService } from '../../../services/profile/profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public userName: string = "";
  public email: string = "";
  public contacts: Contact[] = [];
  loading: boolean = true;
  constructor(
    private _profileService: ProfileService,
    private _router: Router,
    private _titleService: ToolbarAdditionService,
    private _userService: UserService
    ) { }

  ngOnInit(): void {
    this._profileService.getProfile().subscribe((data: ApolloQueryResult<GetUser>) => {
      this.userName = data.data.getUser.userName;
      this.email = data.data.getUser.email;
      this.contacts = data.data.getUser.contacts;
      this._titleService.changeTitleMessage(this.userName);
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  goToOtherProfile(userId: string){
    let contact = this.contacts.find(c => c.contactUserId == userId);
    console.log(this.contacts)
    console.log(contact?.user.email)
    this._router.navigate([`/profile/profile/${userId}`, {data: {toolbarSuffix: contact?.user.email}}]);
  }

  logout(){
    this._userService.logout();
  }
}
