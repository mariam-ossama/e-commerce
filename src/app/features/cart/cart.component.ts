import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  cart:Cart = {} as Cart;
  cartItemsCount:number = 0;

  ngOnInit(): void {
    this.getCartData();
  }
  getCartData():void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res)=> {
        console.log(res);
        if(res.status === 'success'){
          this.cart = res.data;
          this.cartItemsCount = res.numOfCartItems;
        }
      }
    })
  }
  updateProductQuantity(pid:string, count:number):void {
    // unsubscribe
    // show loading
    this.cartService.updateItemQuantity(pid,count).subscribe({
      next: (res)=> {
        console.log(res);
        if(res.status === 'success') {
          this.cart = res.data;
        }
      }
    })
  }
  deleteProductItem(pid:string):void {
    this.cartService.deleteCartItem(pid).subscribe({
      next: (res)=> {
        console.log(res);
        if(res.status === 'success'){
          this.cart = res.data;
          this.cartItemsCount = res.numOfCartItems
        }
      }
    })
  }
  clearCartData():void {
    this.cartService.clearCart().subscribe({
      next: (res)=> {
        console.log(res);
        if(res.message === 'success') {
          this.toastrService.success(res.message);
        }
      }
    })
  }
}
