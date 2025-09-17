import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../core/models/iproduct.interface';
import { NgxPaginationModule } from "ngx-pagination";
import { CardComponent } from "../../shared/components/card/card.component";
import { ToastrService } from 'ngx-toastr';
import { Highlight } from "../../shared/directives/highlight";

@Component({
  selector: 'app-wishlist',
  imports: [NgxPaginationModule, CardComponent, Highlight],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  wishList:IProduct[] = [];
  wishlistIds: string[] = [];

  ngOnInit(): void {
    this.getWishlistItems();
  }
  getWishlistItems():void {
    this.wishlistService.getWishlist().subscribe({
      next: (res)=>{
        this.wishList = res.data;
        this.wishlistIds = res.data.map((item: any) => item._id);
      }
    })
  }
  removeWishlistItem(pid: string): void {
  this.wishlistService.removeFromWishlist(pid).subscribe({
    next: (res) => {
      if (res.status === 'success') {
        // show success message
        this.toastrService.success(res.message);

        // update the UI list
        this.wishList = this.wishList.filter(product => product.id !== pid);
      }
    }
  });
}
}
