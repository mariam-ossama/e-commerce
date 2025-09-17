import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  @Input() isLoggedIn!:boolean;
  private readonly router = inject(Router);
  private readonly cookiesService = inject(CookieService);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);


  count:number = 0;

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.getCartItemsCount()
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.loggedIn();
  }
  getCartItemsCount():void {
    this.cartService.countNumber.subscribe({
      next:(res)=>{
        this.count = res;
      }
    })
  }
  signUp():void {
    // navigate to sign up page
    this.router.navigate(['/register']);
  }
  login():void{
    // navigate to login page
    this.router.navigate(['/login']);
  }
  loggedIn():void {
    if(this.cookiesService.get('token')){
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }
  logout():void {
    // navigate to login page
    this.authService.logOut();
  }
}
