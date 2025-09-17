import { Component, inject, OnInit } from '@angular/core';
import { PaymentService } from '../checkout/services/payment.service';
import { Order } from './models/order.interface';
import { AuthService } from '../../core/auth/services/auth.service';
import { UserToken } from '../../core/models/user-token.interface';
import { DatePipe } from '@angular/common';
import { EmptyComponent } from "../../shared/components/empty/empty.component";
import { Highlight } from "../../shared/directives/highlight";

@Component({
  selector: 'app-all-orders',
  imports: [DatePipe, EmptyComponent, Highlight],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit{
  private readonly paymentService = inject(PaymentService);
  private readonly authService = inject(AuthService);
  ordersList:Order[] = [];
  user:UserToken = {} as UserToken;
  isLoading:boolean = false;

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllUserOrders();
  }
  // get user id
  getCurrentUser():void {
    this.user = this.authService.decodeToken();
  }



  getAllUserOrders():void {
    this.isLoading = true;
    this.paymentService.getUserOrders(this.user.id).subscribe({
      next: (res)=> {
        this.ordersList = res;
        this.isLoading = false;
      }
    })
  }
}
