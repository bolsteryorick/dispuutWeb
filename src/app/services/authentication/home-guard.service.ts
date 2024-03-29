import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardService  implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(): boolean {
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['calendar']);
      return false;
    }
    return true; 
  }
}