import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this._authService.isAuthenticated();
    if (!isAuthenticated) {
      this._router.navigate(['auth/login']);
      return false;
    }
    return true;
  }
}
