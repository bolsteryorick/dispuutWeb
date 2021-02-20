import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/authentication/user.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  constructor(
    private _router: Router,
    private _userService: UserService
    ) { }

  ngOnInit(): void {
  }

  logout(){
    this._userService.logout();
  }

  home(){
    this._router.navigate(['/']);
  }

  profile(){
    this._router.navigate(['/profile']);
  }
}