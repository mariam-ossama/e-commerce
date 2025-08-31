import { Component, input, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() label!:string;
  @Input() control!:any;
  @Input() inputId!:string;
  @Input() inputType!:string;
  @Input() inputPlaceholder!:string;
  flag:boolean = true;
}
