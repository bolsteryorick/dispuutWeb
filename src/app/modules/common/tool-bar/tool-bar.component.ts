import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisV, faHome } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/authentication/user.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  faHome = faHome;
  faEllipsisV = faEllipsisV;

  dropdownIsActive:boolean = false;

  constructor(
    private _router: Router,
    private _userService: UserService
    ) { 
    }

  ngOnInit(): void {
  }
  
  home(){
    this._router.navigate(['/']);
  }

  settings(){
    this.dropdownIsActive = !this.dropdownIsActive;
  }

  removeSetting(){
    this.dropdownIsActive = false;
  }

  profile(){
    this._router.navigate(['/profile']);
    this.dropdownIsActive = false;
  }
  
  groupOverview(){
    this._router.navigate([`/group/overview`]);
    this.dropdownIsActive = false;
  }

  logout(){
    this._userService.logout();
    this.dropdownIsActive = false;
  }
}