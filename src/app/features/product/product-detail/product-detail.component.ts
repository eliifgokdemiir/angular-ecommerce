// src/app/features/product/product-detail/product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, ProductCardComponent]
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  quantity: number = 1;
  relatedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private favoritesService: FavoritesService,
    public cartService: CartService // public yapıldı çünkü template'de doğrudan erişiliyor
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadProduct(id);
    });
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      product => {
        this.product = product;
        this.loadRelatedProducts(product.category);
      },
      error => console.error('Error loading product', error)
    );
  }

  loadRelatedProducts(category: string): void {
    this.productService.getProductsByCategory(category).subscribe(
      products => {
        this.relatedProducts = products
          .filter(p => p.id !== this.product.id)
          .slice(0, 4);
      },
      error => console.error('Error loading related products', error)
    );
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    this.cartService.addToCart(this.product, this.quantity);
  }
  
  addToFavorites(product?: Product): void {
    const productToAdd = product || this.product;
    this.favoritesService.addToFavorites(productToAdd);
  }
}