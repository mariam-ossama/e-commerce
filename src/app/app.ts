import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { NgxSpinnerService, NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private readonly ngxSpinnerService = inject(NgxSpinnerService);
  protected readonly title = signal('e-commerce');
  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.showLoadingScreen()
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  showLoadingScreen():void {
    this.ngxSpinnerService.show();
    setTimeout(()=> {
      this.ngxSpinnerService.hide();
    },2000)
  }
}
