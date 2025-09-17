import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IProduct } from '../../../core/models/iproduct.interface';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements AfterViewInit, OnChanges{
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  @Input({required:true}) product:IProduct = {} as IProduct;
  @ViewChild('favourite') favourite!:ElementRef;
  heartIcon!:HTMLElement;
  @Input() isFavourite: boolean = false;
  @Output() favouriteToggled = new EventEmitter<string>();

  imageLoaded = false;
  
  ngAfterViewInit(): void {
    this.heartIcon = this.favourite.nativeElement;

    this.updateHeartIcon();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isFavourite'] && this.heartIcon) {
      this.updateHeartIcon();
    }
  }
  onImageLoad() {
    this.imageLoaded = true;
  }
  addToCart(pid:string):void{
    this.cartService.addProductToCart(pid).subscribe({
      next: (res)=> {
        if(res.status === 'success'){
          this.toastrService.success(res.message);
          this.cartService.countNumber.next(res.numOfCartItems);
        }
      }
    })
  }
  private updateHeartIcon(): void {
    if (!this.heartIcon) return;

    if (this.isFavourite) {
      this.heartIcon.classList.replace('fa-regular', 'fa-solid');
      this.heartIcon.classList.add('text-red-600');
      this.heartIcon.classList.remove('txt-color');
    } else {
      this.heartIcon.classList.replace('fa-solid', 'fa-regular');
      this.heartIcon.classList.remove('text-red-600');
      this.heartIcon.classList.add('txt-color');
    }
  }
  addToFavourites(pid:string):void{
    // on click change the isFavourite value
    this.isFavourite = !this.isFavourite;
    // if it is favourit
    if(this.isFavourite){
      // call addToWishlist API
      this.wishlistService.addToWishlist(pid).subscribe({
        next: (res)=>{
          if(res.status === 'success'){
          // show success message
          this.toastrService.success(res.message);
          // update the heart icon
          this.updateHeartIcon();
          this.favouriteToggled.emit(this.product.id);
          }
        }
      })
    }
    else {
      // call removeFromWishlist API
      this.wishlistService.removeFromWishlist(pid).subscribe({
        next: (res)=>{
          if(res.status === 'success'){
          // show success message
          // update the heart icon
          this.updateHeartIcon();
          this.favouriteToggled.emit(this.product.id);
          }
        }
      })
    }
  }
}
