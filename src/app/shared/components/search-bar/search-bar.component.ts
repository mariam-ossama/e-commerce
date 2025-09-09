import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();
  @Input() placeholder!:string;

  onSearch(): void {
    this.search.emit(this.searchTerm.trim());
  }
}
