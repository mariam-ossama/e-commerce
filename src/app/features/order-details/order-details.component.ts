import { Component, inject, Input, OnInit } from '@angular/core';
import { Order } from '../all-orders/models/order.interface';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Highlight } from "../../shared/directives/highlight";

@Component({
  selector: 'app-order-details',
  imports: [DatePipe, Highlight],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit{
  orderDetails:Order = {} as Order;
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.getCurrentOrderData();
  }
  // get the order details

  getCurrentOrderData(): void {
  const state = history.state;
  if (state && state['order']) {
    this.orderDetails = state['order'];
  }
}
}
