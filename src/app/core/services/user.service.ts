import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Address } from '../../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'api/users'; // Gerçek API URL'si ile değiştirilecek

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, user);
  }

  getUserAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/addresses`);
  }

  addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}/addresses`, address);
  }

  updateAddress(address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}/addresses/${address.id}`, address);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/addresses/${id}`);
  }
}