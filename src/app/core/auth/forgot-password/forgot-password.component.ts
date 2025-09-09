import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  isLoading:boolean = false;
  step:number = 1;

  verifyEmail!:FormGroup;
  verifyCode!:FormGroup;
  resetPassword!:FormGroup;

  ngOnInit(): void {
    this.initForms();
  }

  initForms():void{
    this.verifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
    this.verifyCode = this.fb.group({
      resetCode: [null, [Validators.required, Validators.minLength(4)]]
    })
    this.resetPassword = this.fb.group({
      email: [null,[Validators.required, Validators.email]],
      newPassword: [null, [Validators.required, Validators.pattern(/^\w{4,}$/)]]
    })
  }

  verifyUserEmail():void {
    this.isLoading = true
    if(this.verifyEmail.valid){
      this.authService.verifyUserEmail(this.verifyEmail.value).subscribe({
      next: (res)=>{
        if(res.statusMsg === 'success'){
          this.isLoading = false;
          this.toastrService.success(res.message);
        this.step = 2;
         // keep the entered user email value
         const emailValue = this.verifyEmail.get('email')?.value;
          this.resetPassword.get('email')?.setValue(emailValue);
          this.resetPassword.get('email')?.disable();
        }
      }
    });
    }
  }
  verifyUserCode():void {
    this.isLoading = true;
    if(this.verifyCode.valid){
      this.authService.verifyUserResetCode(this.verifyCode.value).subscribe({
      next: (res)=>{
        if(res.status === 'Success'){
          this.isLoading = false;
          this.step = 3
          this.toastrService.success('verification code sent successfully')
        }
      }
    });
    }
  }
  resetUserPassword():void {
    this.isLoading = true;
    if(this.resetPassword.valid){
      this.authService.resetUserPassword(this.resetPassword.getRawValue()).subscribe({
      next: (res)=>{
        this.isLoading = false;
        // set token to cookies
        this.cookieService.set('token', res.token)
        // navigate to home
        this.router.navigate(['/home']);
      }
    });
    }
  }
}
