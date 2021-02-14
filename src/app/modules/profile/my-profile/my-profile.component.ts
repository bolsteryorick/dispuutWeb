import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { Contact } from '../../../models/app-models/contact';
import { GetUser } from '../../../models/user-models/get-user';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public userName: string = "";
  public email: string = "";
  public contacts: Contact[] = [];
  constructor(
    private _profileService: ProfileService,
    private _router: Router    
    ) { }

  ngOnInit(): void {
    this._profileService.getProfile().subscribe((data: ApolloQueryResult<GetUser>) => {
      this.userName = data.data.getUser.userName;
      this.email = data.data.getUser.email;
      this.contacts = data.data.getUser.contacts;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  goToOtherProfile(userId: string){
    this._router.navigate([`/profile/profile/${userId}`]);
  }

}
