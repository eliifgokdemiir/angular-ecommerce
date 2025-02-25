// src/app/features/home/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  newArrivals: Product[] = [];
  categories = [
    { id: 'electronics', name: 'Elektronik', icon: 'laptop' },
    { id: 'fashion', name: 'Moda', icon: 'tshirt' },
    { id: 'home', name: 'Ev & Yaşam', icon: 'home' },
    { id: 'cosmetics', name: 'Kozmetik', icon: 'spa' },
    { id: 'sports', name: 'Spor', icon: 'futbol' },
    { id: 'books', name: 'Kitap', icon: 'book' }
  ];
  
  banners = [
    { 
      id: 1, 
      imageUrl: 'assets/images/banner1.jpg', 
      title: 'Yaz İndirimleri', 
      subtitle: 'Tüm yaz ürünlerinde %50\'ye varan indirimler', 
      buttonText: 'Alışverişe Başla', 
      link: '/products/category/fashion' 
    },
    { 
      id: 2, 
      imageUrl: 'assets/images/banner2.jpg', 
      title: 'Yeni Teknoloji', 
      subtitle: 'En yeni elektronik ürünleri keşfedin', 
      buttonText: 'Keşfet', 
      link: '/products/category/electronics' 
    }
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.loadNewArrivals();
  }

  loadFeaturedProducts(): void {
    this.productService.getFeaturedProducts().subscribe(
      products => this.featuredProducts = products,
      error => console.error('Error loading featured products', error)
    );
  }

  loadNewArrivals(): void {
    this.productService.getProducts().subscribe(
      products => this.newArrivals = products.slice(0, 8),
      error => console.error('Error loading new arrivals', error)
    );
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}