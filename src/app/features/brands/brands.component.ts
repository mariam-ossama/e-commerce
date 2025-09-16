import { BrandsService } from './services/brands.service';
import { Component, inject, OnInit } from '@angular/core';
import { Brand } from './models/brand.interface';
import { SearchBarComponent } from "../../shared/components/search-bar/search-bar.component";
import { SearchPipe } from '../../shared/pipes/search/search-pipe';
import { Highlight } from "../../shared/directives/highlight";

@Component({
  selector: 'app-brands',
  imports: [SearchBarComponent, SearchPipe, Highlight],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{
  private readonly brandsService = inject(BrandsService);
  brands:Brand[] = [];
  searchKeyword:string = '';

  ngOnInit(): void {
    this.getAllBrandsData()
  }
  getAllBrandsData():void {
    this.brandsService.getAllBrands().subscribe({
      next: (res)=>{
        console.log(res);
        this.brands = res.data;
      }
    })
  }
  onSearchChanged(searchKeyword: string): void {
  this.searchKeyword = searchKeyword;
}
}
