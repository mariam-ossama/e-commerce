import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { InputComponent } from "../../../shared/components/input/input.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);
  flag:boolean = true;
  isLoading:boolean = false;
  errorMessage:string = '';
  subscription:Subscription = new Subscription();
  registerForm!:FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm():void {
    this.registerForm = this.fb.group({
      name: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required, Validators.pattern(/^\w{4,}$/)]],
      rePassword: [null,[Validators.required, Validators.pattern(/^\w{4,}$/)]],
      phone: [null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    },
  {validators: [this.confirmPassword]})
  }
  confirmPassword(group:AbstractControl) {
    let password = group.get('password')?.value;
    let rePassword = group.get('rePassword')?.value;
    if(password === rePassword) {
      return null;
    }
    else {
      group.get('rePassword')?.setErrors({mismatch:true});
      return { mismatch:true };
    }
  }
  submit():void {
    if(this.registerForm.valid){
      // show loading
      this.isLoading = true;
      // unsubscribe
      this.subscription.unsubscribe();
      console.log(this.registerForm.value)
      // send data to the backend
      this.authService.register(this.registerForm.value).subscribe({
        next: (res)=> {
          console.log(res);
          if(res.message == 'success'){
            // remove loading
            this.isLoading = false;
            // store token in cookies
            this.cookieService.set('token',res.token);
            // navigate to login
            setTimeout(()=>{
              this.router.navigate(['/login']);
            }, 3000);
          }
        },
        error: (err)=>{
          // remove loading
          this.isLoading = false;
          // show error message
          this.errorMessage = err.error.message;
        }
      });
    }
    else {
      // mark all touched
      this.registerForm.markAllAsTouched();
    }
  }
   navigateToLogin():void {
    this.router.navigate(['/login']);
  }
}
