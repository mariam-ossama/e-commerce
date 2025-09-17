import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../input/input.component";
import { Address } from './models/address.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shipping-addresses',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './shipping-addresses.component.html',
  styleUrl: './shipping-addresses.component.css'
})
export class ShippingAddressesComponent implements OnInit{
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);

  shippingAddressForm!:FormGroup;
  Addresses:Address[] = [];
  showForm = false;
  selectedAddressId: string | null = null;


  ngOnInit(): void {
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
  }

  addNewAddresses():void {
    if(this.shippingAddressForm.valid){
      this.authService.addUserAddress(this.shippingAddressForm.value).subscribe({
        next: (res)=> {
          if(res.status === 'success'){
            this.showForm = false;
            this.Addresses = res.data;
            this.toastrService.success(res.message);
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
    this.getSpecificAddress(id);
  }
  // pass id of the selected address
  getSpecificAddress(id:string):void {
      this.authService.getSpecificUserAddress(id).subscribe({
        next: (res)=> {
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
}
