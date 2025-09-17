import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from './services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InputComponent } from "../../shared/components/input/input.component";
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/services/auth.service';
import { Address } from '../../shared/components/shipping-addresses/models/address.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  private readonly fb = inject(FormBuilder);
  private readonly paymentService = inject(PaymentService);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  isLoading:boolean = false;
  cartId:string|null = '';
  subscription:Subscription = new  Subscription();

  shippingAddressForm!:FormGroup;
    Addresses:Address[] = [];
    showForm = false;
    selectedAddressId: string | null = null;
  
  
    ngOnInit(): void {
      this.getCartId();
      this.getAllSavedAddresses();
      this.initForm();
    }
    initForm():void {
      this.shippingAddressForm = this.fb.group({
        name: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        details: [null,[Validators.required, Validators.minLength(3)]],
        phone: [null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      });
      this.shippingAddressForm = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    details: [null, [Validators.required, Validators.minLength(3)]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
  });
    }
  
    addNewAddresses():void {
      if(this.shippingAddressForm.valid){
        this.authService.addUserAddress(this.shippingAddressForm.value).subscribe({
          next: (res)=> {
            if(res.status === 'success'){
              this.showForm = false;
              this.Addresses = res.data;
              this.toastrService.success(res.message);

              // auto select the last added address
              const newAddress = res.data[res.data.length - 1];
              this.selectAddress(newAddress._id);
            }
          }
        })
      }
    }
    getAllSavedAddresses():void {
        this.authService.getAllUserAddresses().subscribe({
          next: (res)=> {
            if(res.status === 'success'){
              this.Addresses = res.data;
              if(this.Addresses === null){
                this.showForm = true;
              }
            const savedAddressId = localStorage.getItem('selectedAddressId');
            if (savedAddressId && this.Addresses.some(a => a._id === savedAddressId)) {
              this.selectedAddressId = savedAddressId;
              this.getSpecificAddress(savedAddressId);
            }
            }
          }
        })
    }
    selectAddress(id: string): void {
  this.selectedAddressId = id;
  localStorage.setItem('selectedAddressId', id);

  const selected = this.Addresses.find(a => a._id === id);
  if (selected) {
    this.shippingAddressForm.patchValue({
      details: selected.details,
      phone: selected.phone,
      city: selected.city
    });
  }
}

    // pass id of the selected address
    getSpecificAddress(id:string):void {
        this.authService.getSpecificUserAddress(id).subscribe({
          next: (res)=> {
            console.log(res);
          }
        })
    }
    removeAddress(id:string):void {
        this.authService.deleteUserAddress(id).subscribe({
          next: (res)=> {
            if(res.status === 'success'){
              this.showForm = false;
              this.Addresses = res.data;
              this.toastrService.success(res.message);
              if (this.selectedAddressId === id) {
              localStorage.removeItem('selectedAddressId');
              this.selectedAddressId = null;
            }
            }
          }
        })
    }
  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams)=> {
        this.cartId = urlParams.get('cid');
      }
    })
  }
 payByCash(event: Event): void {
  event.preventDefault();
  this.subscription.unsubscribe();
  this.isLoading = true;

  let payload;

  if (this.selectedAddressId) {
    // Use selected saved address
    const selected = this.Addresses.find(a => a._id === this.selectedAddressId);
    payload = {
      shippingAddress: {
        details: selected?.details,
        phone: selected?.phone,
        city: selected?.city,
      }
    };
  } else if (this.shippingAddressForm.valid) {
    // Use newly entered address
    payload = {
      shippingAddress: {
        details: this.shippingAddressForm.value.details,
        phone: this.shippingAddressForm.value.phone,
        city: this.shippingAddressForm.value.city,
      }
    };
  } else {
    this.toastrService.error("Please select or enter a shipping address");
    this.isLoading = false;
    return;
  }

  this.paymentService.createCashOrder(this.cartId, payload).subscribe({
    next: (res) => {
      this.isLoading = false;
      if (res.status === 'success') {
        this.router.navigate(['/order-details'], { state: { order: res.data } });
      }
    },
    error: (err) => {
      this.isLoading = false;
      console.error(err);
    }
  });
}
  payByVisa(event: Event): void {
  event.preventDefault();
  this.subscription.unsubscribe();
  this.isLoading = true;

  let payload;

  if (this.selectedAddressId) {
    const selected = this.Addresses.find(a => a._id === this.selectedAddressId);
    payload = {
      shippingAddress: {
        details: selected?.details,
        phone: selected?.phone,
        city: selected?.city,
      }
    };
  } else if (this.shippingAddressForm.valid) {
    payload = {
      shippingAddress: {
        details: this.shippingAddressForm.value.details,
        phone: this.shippingAddressForm.value.phone,
        city: this.shippingAddressForm.value.city,
      }
    };
  } else {
    this.toastrService.error("Please select or enter a shipping address");
    this.isLoading = false;
    return;
  }

  this.paymentService.createVisaOrder(this.cartId, payload).subscribe({
    next: (res) => {
      this.isLoading = false;
      if (res.status === 'success') {
        window.open(res.session.url, '_blank');
        this.router.navigate(['/allorders']);
      } else {
        this.router.navigate([res.session.cancel_url]);
      }
    },
    error: (err) => {
      this.isLoading = false;
      console.error(err);
      this.router.navigate([err.session?.cancel_url || '/cart']);
    }
  });
}
}
