import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty',
  imports: [],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.css'
})
export class EmptyComponent {
  @Input() title = 'Nothing here';
  @Input() description: string = "There is no items yet";
}
