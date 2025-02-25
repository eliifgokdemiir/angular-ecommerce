// src/app/features/favorites/favorites/favorites.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../models/product.model';
import { FavoritesService } from '../../../core/services/favorites.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class FavoritesComponent implements OnInit {
  favorites: Product[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.favoritesService.getFavorites().subscribe(
      favorites => this.favorites = favorites
    );
  }

  removeFromFavorites(productId: number): void {
    this.favoritesService.removeFromFavorites(productId);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}