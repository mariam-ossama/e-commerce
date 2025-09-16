import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../../core/models/category.interface';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from "../../shared/components/search-bar/search-bar.component";
import { SearchPipe } from '../../shared/pipes/search/search-pipe';
import { Highlight } from '../../shared/directives/highlight';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, SearchBarComponent,SearchPipe,Highlight],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  private readonly categoriesService = inject(CategoriesService);

  categories:Category[] = [];
  searchKeyword: string = '';

  ngOnInit(): void {
    this.getAllCategoriesData()
  }
  onSearchChanged(searchKeyword: string): void {
  this.searchKeyword = searchKeyword;
}
  getAllCategoriesData():void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res)=> {
        console.log(res);
        this.categories = res.data;
      }
    })
  }
}
