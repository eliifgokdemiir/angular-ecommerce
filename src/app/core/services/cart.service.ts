import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../../models/cart.model';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = { items: [], totalPrice: 0 };
  private cartSubject = new BehaviorSubject<Cart>(this.cart);

  constructor() {
    // LocalStorage'dan sepeti yükle
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.cartSubject.next(this.cart);
    }
  }

  getCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cart.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.items.push({ product, quantity });
    }
    
    this.updateCart();
  }

  removeFromCart(productId: number): void {
    this.cart.items = this.cart.items.filter(item => item.product.id !== productId);
    this.updateCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cart.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.updateCart();
    }
  }

  clearCart(): void {
    this.cart = { items: [], totalPrice: 0 };
    this.updateCart();
  }

  private updateCart(): void {
    this.calculateTotal();
    this.cartSubject.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private calculateTotal(): void {
    this.cart.totalPrice = this.cart.items.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);
  }
}
