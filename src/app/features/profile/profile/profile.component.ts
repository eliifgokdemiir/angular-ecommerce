// src/app/features/profile/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../models/user.model';
import { Address } from '../../../models/address.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  user!: User;
  addresses: Address[] = [];
  isEditMode = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadUserAddresses();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      user => this.user = user,
      error => console.error('Error loading user profile', error)
    );
  }

  loadUserAddresses(): void {
    this.userService.getUserAddresses().subscribe(
      addresses => this.addresses = addresses,
      error => console.error('Error loading user addresses', error)
    );
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveProfile(): void {
    this.userService.updateUserProfile(this.user).subscribe(
      updatedUser => {
        this.user = updatedUser;
        this.isEditMode = false;
      },
      error => console.error('Error updating user profile', error)
    );
  }

  addNewAddress(): void {
    // Yeni adres ekleme işlemi
  }

  editAddress(address: Address): void {
    // Adres düzenleme işlemi
  }

  deleteAddress(id: number): void {
    this.userService.deleteAddress(id).subscribe(
      () => {
        this.addresses = this.addresses.filter(address => address.id !== id);
      },
      error => console.error('Error deleting address', error)
    );
  }

  setDefaultAddress(id: number): void {
    // Varsayılan adres ayarlama işlemi
  }
}