import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FavoritesService } from '../../../core/services/favorites.service';
import { ProductCardComponent } from '../../product/product-card/product-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ProductCardComponent]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  featuredProducts: Product[] = [];
  newArrivals: Product[] = [];
  currentSlide = 0;
  sliderInterval: any;
  
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
      imageUrl: 'assets/images/banner1.png', 
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
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.loadNewArrivals();
  }

  ngAfterViewInit(): void {
    this.startSlider();
  }

  ngOnDestroy(): void {
    this.stopSlider();
  }

  loadFeaturedProducts(): void {
    this.productService.getFeaturedProducts().subscribe(
      products => this.featuredProducts = products,
      error => console.error('Error loading featured products', error)
    );
  }

  loadNewArrivals(): void {
    this.productService.getNewArrivals().subscribe(
      products => this.newArrivals = products,
      error => console.error('Error loading new arrivals', error)
    );
  }

  addToFavorites(product: Product): void {
    this.favoritesService.addToFavorites(product);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  // Slider fonksiyonları
  startSlider(): void {
    this.sliderInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // 5 saniyede bir geçiş
  }

  stopSlider(): void {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.banners.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.banners.length) % this.banners.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}