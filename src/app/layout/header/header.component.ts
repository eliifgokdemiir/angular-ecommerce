// src/app/layout/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class HeaderComponent implements OnInit {
  cartItemCount$!: Observable<number>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItemCount$ = this.cartService.getCart().pipe(
      map(cart => cart.items.reduce((count, item) => count + item.quantity, 0))
    );
  }
}