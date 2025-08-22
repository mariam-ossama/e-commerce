import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/models/iproduct.interface';
import { CardComponent } from "../../shared/components/card/card.component";
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  private readonly productService = inject(ProductsService);
  productsList:IProduct[] = [];
  pageSize:number = 0;
  p:number = 0;
  total:number = 0;

  ngOnInit():void 
  {
    this.getAllProductsData(this.p);
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
}
