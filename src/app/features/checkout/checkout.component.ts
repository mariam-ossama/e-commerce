import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from './services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InputComponent } from "../../shared/components/input/input.component";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  private readonly fb = inject(FormBuilder);
  private readonly paymentService = inject(PaymentService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  checkoutForm!:FormGroup;
  isLoading:boolean = false;
  cartId:string|null = '';

  ngOnInit(): void {
    this.getCartId();
    this.initForm();
  }
  initForm():void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details:[null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city: [null, [Validators.required]]
      })
    })
  }
  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams)=> {
        this.cartId = urlParams.get('cid');
        console.log(this.cartId);
      }
    })
  }
  payByCash(event:Event):void {
    if(this.checkoutForm.valid){
      event.preventDefault();
    this.isLoading = true;
    console.log(this.checkoutForm.value);
    this.paymentService.createCashOrder(this.cartId,this.checkoutForm.value).subscribe({
      next: (res)=> {
        console.log(res);
        if(res.status === 'success'){
          this.isLoading = false;
          // navigate to order details
          this.router.navigate(
    ['/order-details'],
    { state: { order: res.data } }
  );

        }
      }, error: (err)=> {
        console.log(err);
      }
    })
    }
  }
  payByVisa(event:Event):void {
    if(this.checkoutForm.valid){
      event.preventDefault()
    this.isLoading = true;
    this.paymentService.createVisaOrder(this.cartId,this.checkoutForm.value).subscribe({
      next: (res)=> {
        console.log(res);
        if(res.status === 'success'){
          this.isLoading = false;
          // navigate to stripe payment gateway
          console.log(res.session.url);
          window.open(res.session.url, '_blank');
          // navigate to user orders page
          this.router.navigate(['/allorders']);
        }
        else {
          this.isLoading = false;
          console.log(res);
          // navigate to cart page
        this.router.navigate([res.session.cancel_url])
        }
      },
      error: (err)=>{
        this.isLoading = false;
        console.log(err);
        // navigate to cart page
        this.router.navigate([err.session.cancel_url])
      }
    });
    }
  }
}
