// src/app/core/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'api/products';
  
  // Mock ürünler
  private mockProducts: Product[] = [
    {
      id: 1,
      name: 'iPhone 13 Pro',
      description: 'Apple iPhone 13 Pro 128GB',
      price: 25999,
      discountPrice: 23999,
      imageUrl: 'assets/images/products/iphone13.jpg',
      category: 'electronics',
      rating: 4.8,
      stock: 15,
      featured: true
    },
    {
      id: 2,
      name: 'Samsung Galaxy S21',
      description: 'Samsung Galaxy S21 5G 128GB',
      price: 18999,
      discountPrice: 16999,
      imageUrl: 'assets/images/products/samsung-s21.jpg',
      category: 'electronics',
      rating: 4.5,
      stock: 20,
      featured: true
    },
    // Diğer mock ürünler...
  ];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    // API yerine mock data dönüyoruz
    return of(this.mockProducts);
  }

  // Bu metot eksikti, ekliyoruz
  getProductById(id: number): Observable<Product> {
    const product = this.mockProducts.find(p => p.id === id);
    if (product) {
      return of(product);
    }
    // Ürün bulunamazsa hata fırlatabilirsiniz
    return of({} as Product); // Basit çözüm için boş ürün dönüyoruz
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const products = this.mockProducts.filter(p => p.category === category);
    return of(products);
  }

  getFeaturedProducts(): Observable<Product[]> {
    const featuredProducts = this.mockProducts.filter(p => p.featured);
    return of(featuredProducts);
  }

  getNewArrivals(): Observable<Product[]> {
    // Son eklenen ürünleri simüle etmek için ilk 4 ürünü dönüyoruz
    return of(this.mockProducts.slice(0, 4));
  }
}