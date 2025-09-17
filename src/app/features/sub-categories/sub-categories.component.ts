import { Component, inject, OnInit } from '@angular/core';
import { SubCategoriesService } from '../../core/services/sub-categories/sub-categories.service';
import { ActivatedRoute } from '@angular/router';
import { SubCategory } from '../../core/models/sub-category.interface';
import { Highlight } from "../../shared/directives/highlight";

@Component({
  selector: 'app-sub-categories',
  imports: [Highlight],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.css'
})
export class SubCategoriesComponent implements OnInit{
  private readonly subCategoriesService = inject(SubCategoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);

  id:string|null = '';
  categoryName:string|null = '';
  subCategoriesList:SubCategory[] = [];

  ngOnInit(): void {
    this.getCategoryIdAndName();
    this.getSubCategoriesData();
  }

  getCategoryIdAndName():void {
    this.activatedRoute.paramMap.subscribe({
    next: (urlParams)=>{
      this.id = urlParams.get('id');
      this.categoryName = urlParams.get('name');
    }
    });
  }

  getSubCategoriesData():void {
    this.subCategoriesService.getSubcategoriesOfCategory(this.id).subscribe({
      next: (res)=> {
        this.subCategoriesList = res.data;
      }
    })
  }

}
