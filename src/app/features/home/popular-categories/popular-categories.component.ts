import { Component, inject } from '@angular/core';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Category } from '../../../core/models/category.interface';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css'
})
export class PopularCategoriesComponent {
  private readonly categoriesService = inject(CategoriesService);
  categoriesList:Category[] = [];
  popularCategoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    margin:8,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 8
      },
    },
    nav: false
  }
  ngOnInit(): void {
    this.getAllCategoriesData();
  }
  getAllCategoriesData():void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res)=> {
        //console.log(res);
        this.categoriesList = res.data;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}
