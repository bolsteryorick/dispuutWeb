import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/authentication/registration.service';
import { UserRegisterCredentials } from '../../../models/auth-models/userCredentials';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public readonly emailValidators: ValidatorFn[] = [Validators.email, Validators.required];
  public readonly passwordValidators: ValidatorFn[] = [Validators.minLength(8), Validators.required];

  public emailMessage: string = 'Vul je email in.';
  public passwordMessage: string = 'Minimaal 8 characters.';
  public registrationForm: FormGroup = this._formBuilder.group({
    emailInput: new FormControl({ value: '', disabled: false }),
    passwordInput: new FormControl({ value: '', disabled: false })
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _registrationService: RegistrationService,
    private _router: Router
  ) 
  { 
    this.registrationForm?.controls?.emailInput?.setValidators(this.emailValidators);
    this.registrationForm?.controls?.passwordInput?.setValidators(this.passwordValidators);
  }

  ngOnInit(): void {
  }

  public buttonDisabled() {
    return !this.registrationForm.controls.emailInput.valid ||
      !this.registrationForm.controls.passwordInput.valid;
  }

  public register(){
    const formVal = this.registrationForm.getRawValue();
    let userCredentials : UserRegisterCredentials = { 
      Email : formVal.emailInput.toString(), 
      Password : formVal.passwordInput.toString()}
    const request = this._registrationService.register(userCredentials);
      request.subscribe((success: boolean) => {
        console.log(success)
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      },
      () => {
        this._router.navigate(['/auth/login']);
      });
  }
}
