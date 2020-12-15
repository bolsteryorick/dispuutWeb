import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthComponent } from './auth/auth.component';
import { CommonAppModule } from '../common/common-app.module';



@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent, 
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthenticationRoutingModule,
    CommonAppModule
  ]
})
export class AuthenticationModule { }
