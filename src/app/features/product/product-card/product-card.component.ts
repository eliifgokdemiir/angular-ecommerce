import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../models/product.model';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() addToCartEvent = new EventEmitter<Product>();
  @Output() addToFavoritesEvent = new EventEmitter<Product>();
  
  isInFavorites = false;
  
  constructor(private favoritesService: FavoritesService) {}
  
  ngOnInit(): void {
    // Ürünün favorilerde olup olmadığını kontrol et
    this.checkIfInFavorites();
    
    // Favoriler değiştiğinde durumu güncelle
    this.favoritesService.getFavorites().subscribe(() => {
      this.checkIfInFavorites();
    });
  }
  
  checkIfInFavorites(): void {
    this.isInFavorites = this.favoritesService.isInFavorites(this.product.id);
  }

  addToCart(): void {
    this.addToCartEvent.emit(this.product);
  }

  addToFavorites(): void {
    this.addToFavoritesEvent.emit(this.product);
    // Favorilere ekleme/çıkarma işlemi sonrası durumu güncelle
    setTimeout(() => this.checkIfInFavorites(), 0);
  }
}