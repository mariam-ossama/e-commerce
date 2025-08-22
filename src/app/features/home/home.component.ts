import { Component } from '@angular/core';
import { PopularProductsComponent } from "./popular-products/popular-products.component";
import { PopularCategoriesComponent } from "./popular-categories/popular-categories.component";
import { MainSliderComponent } from "./main-slider/main-slider.component";
import { WelcomeComponent } from "./welcome/welcome.component";

@Component({
  selector: 'app-home',
  imports: [PopularProductsComponent, PopularCategoriesComponent, MainSliderComponent, WelcomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
