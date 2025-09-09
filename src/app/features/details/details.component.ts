import { Component, inject, OnInit } from '@angular/core';
import { ProductDetailsService } from './product-details.service';
import { IProduct } from '../../core/models/iproduct.interface';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { count } from 'console';


@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly toastrServitce = inject(ToastrService);

  productDetails:IProduct = {} as IProduct;
  quantity:number = 0;
  id:string|null = null;
  slug:string|null = null;
  isLoading:boolean = false;

  selectedImage:string = '';

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetailsData();
    this.getCartItems()
  }
  getProductId():void{
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams)=>{
        //console.log(urlParams);
        this.id = urlParams.get('id');
        this.slug = urlParams.get('slug');
      }
    })
  }
  getProductDetailsData():void{
    this.isLoading = true;
    this.productDetailsService.getProductDetails(this.id).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.productDetails = res.data;
        this.selectedImage = this.productDetails.imageCover;
        this.isLoading = false;
      },
      error: (err)=>{
        console.log(err);
        this.isLoading = false;
      }
    })
  }
  addToCart(pid:string):void {
    this.cartService.addProductToCart(pid).subscribe({
      next: (res)=> {
        console.log(res);
        if (res.status === 'success') {
        this.toastrServitce.success(res.message);

        const item = res.data.products.find(
          (p: any) => p.product === this.id
        );

        this.quantity = item ? item.count : 0;
      }
      }
    })
  }
  updateProductQuantity(pid:string, count:number):void {
    // unsubscribe
    // show loading
    this.cartService.updateItemQuantity(pid,count).subscribe({
      next: (res)=> {
        console.log(res.data);
        if (res.status === 'success') {
        const item = res.data.products.find(
          (p: any) => p.product._id === this.id
        );
        this.quantity = item ? item.count : 0;
      }
      }
    })
  }
  getCartItems():void {
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res);
        const item = res.data.products.find(
        (p: any) => p.product._id === this.id
      );

      this.quantity = item ? item.count : 0;
    }
    })
  }
  changeImage(img: string): void {
    this.selectedImage = img;
    //console.log(this.selectedImage);
  }
}
