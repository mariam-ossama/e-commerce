import { Component, inject, OnInit } from '@angular/core';
import { ProductDetailsService } from './product-details.service';
import { IProduct } from '../../core/models/iproduct.interface';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly activatedRoute = inject(ActivatedRoute);

  productDetails:IProduct = {} as IProduct;
  quantity:number = 0;
  id:string|null = null;
  slug:string|null = null;

  selectedImage:string = '';

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetailsData();
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
    this.productDetailsService.getProductDetails(this.id).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.productDetails = res.data;
        this.selectedImage = this.productDetails.imageCover;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
  increaseQty():void{
    this.quantity++;
  }
  decreaseQty():void{
    this.quantity--;
  }
  changeImage(img: string): void {
    this.selectedImage = img;
    //console.log(this.selectedImage);
  }
}
