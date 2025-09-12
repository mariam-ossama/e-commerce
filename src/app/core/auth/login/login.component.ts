import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlowbiteService } from '../../services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  flag:boolean = true;
  isLoading:boolean = false;
  errorMessage:string = '';
  subscription:Subscription = new Subscription();
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  loginForm!:FormGroup;

  ngOnInit(): void {
    this.initForm();
  }




  initForm():void {
    this.loginForm = this.fb.group({
      email: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required, Validators.pattern(/^\w{4,}$/)]],
    });
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  submit():void {
    if(this.loginForm.valid){
      // show loading
      this.isLoading = true;
      // unsubscribe
      this.subscription.unsubscribe();
      // send data to the backend
      this.authService.login(this.loginForm.value).subscribe({
        next: (res)=> {
          console.log(res);
          if(res.message == 'success'){
            // remove loading
            this.isLoading = false;
            // store token in cookies
            this.cookieService.set('token',res.token);
            // navigate to login
            setTimeout(()=>{
              this.router.navigate(['/home']);
            }, 3000);
          }
        },
        error: (err)=>{
          console.log(err);
          // remove loading
          this.isLoading = false;
          // show error message
          this.errorMessage = err.error.message;
          
        }
      });
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
  navigateToRegister():void {
    this.router.navigate(['/register']);
  }
}
