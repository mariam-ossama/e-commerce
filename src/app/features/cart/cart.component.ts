import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { EmptyComponent } from "../../shared/components/empty/empty.component";

@Component({
  selector: 'app-cart',
  imports: [RouterLink, EmptyComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  cart:Cart = {} as Cart;
  cartItemsCount:number = 0;
  isLoading:boolean = false;

  ngOnInit(): void {
    this.getCartData();
  }
  getCartData():void {
    this.isLoading = true;
    this.cartService.getLoggedUserCart().subscribe({
      next: (res)=> {
        console.log(res);
        if(res.status === 'success'){
          this.cart = res.data;
          this.cartItemsCount = res.numOfCartItems;
          this.isLoading = false;
          this.cartService.countNumber.next(res.numOfCartItems);
        }
      }
    })
  }
  updateProductQuantity(pid:string, count:number):void {
    // unsubscribe
    // show loading
    this.isLoading = true;
    this.cartService.updateItemQuantity(pid,count).subscribe({
      next: (res)=> {
        console.log(res);
        if(res.status === 'success') {
          this.cart = res.data;
          this.isLoading = false;
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
          this.cartService.countNumber.next(res.numOfCartItems);
        }
      }
    })
  }
  clearCartData():void {
    this.isLoading = true;
    this.cartService.clearCart().subscribe({
      next: (res)=> {
        console.log(res);
        if(res.message === 'success') {
          this.toastrService.success(res.message);
          this.isLoading = false;
          this.cartService.countNumber.next(res.numOfCartItems);
        }
      }
    })
  }
}
