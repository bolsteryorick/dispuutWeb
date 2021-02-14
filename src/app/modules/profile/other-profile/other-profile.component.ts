import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { GetOtherUser } from '../../../models/user-models/get-other-user';
import { ProfileService } from '../../../services/profile/profile.service';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.scss']
})
export class OtherProfileComponent implements OnInit {

  private otherUserId: string = "";
  public email: string = "";
  public userName: string = "";

  constructor(
    private _route: ActivatedRoute,
    private _profileService: ProfileService
    ) {
      this._route.params.subscribe( params => this.otherUserId = params.id )
    }

  ngOnInit(): void {
    const request = this._profileService.getOtherProfile(this.otherUserId);
    request.subscribe((result: ApolloQueryResult<GetOtherUser>) => {
      this.email = result.data.getOtherUser.email;
      this.userName = result.data.getOtherUser.userName;
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

}