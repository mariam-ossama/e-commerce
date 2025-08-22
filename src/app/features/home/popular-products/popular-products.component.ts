import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../../core/models/iproduct.interface';
import { ProductsService } from '../../../core/services/products.service';
import { CardComponent } from "../../../shared/components/card/card.component";

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent implements OnInit{
  private readonly productService = inject(ProductsService);
  productsList:IProduct[] = [];
  ngOnInit():void 
  {
    this.getAllProductsData();
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
}
