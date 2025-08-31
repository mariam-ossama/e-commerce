import { Validators } from '@angular/forms';
import { Routes } from '@angular/router';
import { isLoggedInGuard } from './core/guards/is-logged-in-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    loadComponent: () =>
      import('./core/layouts/blank-navbar/blank-navbar.component').then(
        (m) => m.BlankNavbarComponent
      ),
    canActivate: [isLoggedInGuard],
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Register Page',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'Login Page',
      },
    ],
  },

  {
    path: '',
    loadComponent: () =>
      import('./core/layouts/main-navbar/main-navbar.component').then(
        (m) => m.MainNavbarComponent
      ),
      canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'Home Page',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'Products Page',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component').then(
            (m) => m.CartComponent
          ),
        title: 'Cart Page',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'Categories Page',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'Brands Page',
      },
      {
        path: 'details/:slug/:id',
        loadComponent: () =>
          import('./features/details/details.component').then(
            (m) => m.DetailsComponent
          ),
        title: 'Details Page',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/details/details.component').then(
            (m) => m.DetailsComponent
          ),
        title: 'Details Page',
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
    title: '404',
  },
];
