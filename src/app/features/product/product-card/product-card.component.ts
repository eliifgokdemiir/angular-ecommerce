import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCartEvent = new EventEmitter<Product>();
  @Output() addToFavoritesEvent = new EventEmitter<Product>();

  addToCart(): void {
    this.addToCartEvent.emit(this.product);
  }

  addToFavorites(): void {
    this.addToFavoritesEvent.emit(this.product);
  }
}