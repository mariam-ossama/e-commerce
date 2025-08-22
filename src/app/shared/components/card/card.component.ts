import { Component, Input } from '@angular/core';
import { IProduct } from '../../../core/models/iproduct.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({required:true}) product:IProduct = {} as IProduct;
}
