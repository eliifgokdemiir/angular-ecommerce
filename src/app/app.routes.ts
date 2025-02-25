// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/home/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'products', 
    loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule) 
  },
  { 
    path: 'cart', 
    loadComponent: () => import('./features/cart/cart/cart.component').then(m => m.CartComponent) 
  },
  { 
    path: 'checkout', 
    loadChildren: () => import('./features/checkout/checkout.module').then(m => m.CheckoutModule) 
  },
  { 
    path: 'profile', 
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule) 
  },
  { 
    path: 'favorites', 
    loadComponent: () => import('./features/favorites/favorites/favorites.component').then(m => m.FavoritesComponent) 
  }
];