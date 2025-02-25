// src/app/core/services/favorites.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: Product[] = [];
  private favoritesSubject = new BehaviorSubject<Product[]>(this.favorites);

  constructor() {
    // LocalStorage'dan favorileri yükle
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
      this.favoritesSubject.next(this.favorites);
    }
  }

  getFavorites(): Observable<Product[]> {
    return this.favoritesSubject.asObservable();
  }

  addToFavorites(product: Product): void {
    if (!this.isInFavorites(product.id)) {
      this.favorites.push(product);
      this.updateFavorites();
    }
  }

  removeFromFavorites(productId: number): void {
    this.favorites = this.favorites.filter(product => product.id !== productId);
    this.updateFavorites();
  }

  isInFavorites(productId: number): boolean {
    return this.favorites.some(product => product.id === productId);
  }

  private updateFavorites(): void {
    this.favoritesSubject.next(this.favorites);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}