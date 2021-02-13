import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetOtherUserData } from '../../models/get-other-user';
import { ProfileService } from '../services/profile.service';

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
    request.subscribe((result: GetOtherUserData) => {
      this.email = result.data.getOtherUser.email;
      this.userName = result.data.getOtherUser.userName;
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

}