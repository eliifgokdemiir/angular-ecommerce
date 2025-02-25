// src/app/core/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'api/orders'; // Gerçek API URL'si ile değiştirilecek

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  cancelOrder(id: number): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}/cancel`, {});
  }
}