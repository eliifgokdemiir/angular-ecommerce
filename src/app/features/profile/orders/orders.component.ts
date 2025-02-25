// src/app/features/profile/orders/orders.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../models/order.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder: Order | null = null;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      orders => {
        this.orders = orders.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      },
      error => console.error('Error loading orders', error)
    );
  }

  viewOrderDetails(order: Order): void {
    this.selectedOrder = order;
  }

  closeOrderDetails(): void {
    this.selectedOrder = null;
  }

  cancelOrder(id: number): void {
    if (confirm('Bu siparişi iptal etmek istediğinize emin misiniz?')) {
      this.orderService.cancelOrder(id).subscribe(
        () => {
          this.loadOrders();
          if (this.selectedOrder && this.selectedOrder.id === id) {
            this.selectedOrder = null;
          }
        },
        error => console.error('Error cancelling order', error)
      );
    }
  }

  getStatusText(status: string): string {
    const statusMap: {[key: string]: string} = {
      'pending': 'Beklemede',
      'processing': 'İşleniyor',
      'shipped': 'Kargoya Verildi',
      'delivered': 'Teslim Edildi',
      'cancelled': 'İptal Edildi'
    };
    return statusMap[status] || status;
  }

  getStatusClass(status: string): string {
    const statusClassMap: {[key: string]: string} = {
      'pending': 'status-pending',
      'processing': 'status-processing',
      'shipped': 'status-shipped',
      'delivered': 'status-delivered',
      'cancelled': 'status-cancelled'
    };
    return statusClassMap[status] || '';
  }
}