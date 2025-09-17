import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/models/iproduct.interface';
import { CardComponent } from "../../shared/components/card/card.component";
import {NgxPaginationModule} from 'ngx-pagination';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { SearchBarComponent } from "../../shared/components/search-bar/search-bar.component";
import { SearchPipe } from '../../shared/pipes/search/search-pipe';
import { Highlight } from "../../shared/directives/highlight";

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, SearchBarComponent, SearchPipe, Highlight],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  private readonly productService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  productsList:IProduct[] = [];
  wishlistIds:string[] = []
  wishList:IProduct[] = [];
  pageSize:number = 0;
  p:number = 0;
  total:number = 0;
  searchKeyword: string = '';


  ngOnInit():void 
  {
    this.getAllProductsData(this.p);
    this.getWishlistIds();
  }
  onSearchChanged(searchKeyword: string): void {
  this.searchKeyword = searchKeyword;
}
  getAllProductsData(page:number = 1):void {
    this.productService.getAllProducts(page).subscribe({
      next: (res)=> {
        this.productsList = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results
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
        this.wishList = res.data;
      }
    }
  });
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
