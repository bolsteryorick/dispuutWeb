import { HttpErrorResponse } from '@angular/common/http';
import { tokenName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/authentication/login.service';
import { UserCredentials } from '../../../models/auth-models/userCredentials';
import { TokenObject } from './models/token-object';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/services/authentication/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public readonly emailValidators: ValidatorFn[] = [Validators.email, Validators.required];
  public readonly passwordValidators: ValidatorFn[] = [Validators.minLength(8), Validators.required];

  public emailMessage: string = 'Vul je email in.';
  public passwordMessage: string = 'Minimaal 8 characters.';
  public loginForm: FormGroup = this._formBuilder.group({
    emailInput: new FormControl({ value: '', disabled: false }),
    passwordInput: new FormControl({ value: '', disabled: false })
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _router: Router,
    private _userService: UserService
  ) 
  { 
    this.loginForm?.controls?.emailInput?.setValidators(this.emailValidators);
    this.loginForm?.controls?.passwordInput?.setValidators(this.passwordValidators);
  }

  ngOnInit(): void {
  }

  public buttonDisabled() {
    return !this.loginForm.controls.emailInput.valid ||
      !this.loginForm.controls.passwordInput.valid;
  }

  public login(){
    const formVal = this.loginForm.getRawValue();
    let userCredentials : UserCredentials = { 
      Email : formVal.emailInput.toString(), 
      Password : formVal.passwordInput.toString()}
    const request = this._loginService.login(userCredentials);
    request.subscribe((token: TokenObject) => {
      console.log(token);
      this._userService.setAccesstoken(token.accessToken);
      this._userService.setRefreshtoken(token.refreshToken);
      console.log("success")
      this._router.navigate(['/calendar/list']);
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    },
    () => {
      
      
    });
  }
}
