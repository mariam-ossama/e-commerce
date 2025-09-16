import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../../core/models/iproduct.interface';
import { ProductsService } from '../../../core/services/products.service';
import { CardComponent } from "../../../shared/components/card/card.component";
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { Highlight } from "../../../shared/directives/highlight";

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent, Highlight],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent implements OnInit{
  private readonly productService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService);
  productsList:IProduct[] = [];
  wishlistIds: string[] = [];
  ngOnInit():void 
  {
    this.getAllProductsData();
    this.getWishlistIds();
  }
  getAllProductsData():void {
    this.productService.getAllProducts().subscribe({
      next: (res)=> {
        this.productsList = res.data;
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }
  getWishlistIds():void {
    this.wishlistService.getWishlist().subscribe({
    next: (res) => {
      if (res.status === 'success') {
        this.wishlistIds = res.data.map((item: any) => item._id);
      }
    }
  });
  }
}
