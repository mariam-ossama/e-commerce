import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from "../../shared/components/input/input.component";
import { AuthService } from '../../core/auth/services/auth.service';
import { UserToken } from '../../core/models/user-token.interface';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../checkout/services/payment.service';
import { Order } from '../all-orders/models/order.interface';
import { AllOrdersComponent } from "../all-orders/all-orders.component";
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [InputComponent, ReactiveFormsModule, AllOrdersComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  private readonly authService = inject(AuthService);
  private readonly paymentService = inject(PaymentService);
  private readonly fb = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  
  userData:UserToken = {} as UserToken;
  ordersList:Order[] = []
  changePassword!:FormGroup;
  userAddress!:FormArray;
  subscription:Subscription = new Subscription()

  constructor(private flowbiteService: FlowbiteService) {}
  
  ngOnInit(): void {
    this.getUserData();
    this.getAllUserOrders();
    this.initForm();
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  getUserData():void{
    this.userData = this.authService.decodeToken();
  }

  initForm():void {
    this.changePassword = this.fb.group({
      currentPassword: [null, [Validators.required, Validators.pattern('')]],
      password: [null, [Validators.required, Validators.pattern('')]],
      rePassword: [null, [Validators.required, Validators.pattern('')]],
    },
  {validators: [this.confirmPassword]});
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
  getAllUserOrders():void {
    this.paymentService.getUserOrders(this.userData.id).subscribe({
      next: (res)=> {
        console.log(res);
        this.ordersList = res;
      }
    })
  }
  changeUserPawword():void {
    this.subscription.unsubscribe();
    if(this.changePassword.valid){
      this.authService.updateUserPassword(this.changePassword.value).subscribe({
        next: (res)=> {
          if(res.message === 'success'){
            this.cookieService.set('token', res.token);
            this.toastrService.success('password changed successfully');
            this.router.navigate(['/login']);

          } else {
            this.toastrService.error('failed to change password');
          }
        }
      });
    } else {
      this.changePassword.markAllAsTouched();
    }
  }
}
