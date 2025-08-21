import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/models/iproduct.interface';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
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
