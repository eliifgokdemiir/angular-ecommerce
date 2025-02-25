// src/app/features/checkout/checkout-success/checkout-success.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../models/order.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class CheckoutSuccessComponent implements OnInit {
  order!: Order;
  orderId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
      if (this.orderId) {
        this.loadOrder();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  loadOrder(): void {
    this.orderService.getOrderById(this.orderId).subscribe(
      order => this.order = order,
      error => {
        console.error('Error loading order', error);
        this.router.navigate(['/']);
      }
    );
  }
}