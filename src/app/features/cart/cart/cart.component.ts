// src/app/features/cart/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Cart, CartItem } from '../../../models/cart.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class CartComponent implements OnInit {
  cart!: Cart;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  updateQuantity(item: CartItem, quantityOrEvent: number | Event): void {
    let quantity: number;
    
    if (typeof quantityOrEvent === 'number') {
      quantity = quantityOrEvent;
    } else {
      const target = quantityOrEvent.target as HTMLInputElement;
      quantity = parseInt(target.value, 10);
    }
    
    this.cartService.updateQuantity(item.product.id, quantity);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}