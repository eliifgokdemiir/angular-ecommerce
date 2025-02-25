// src/app/features/checkout/checkout/checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { UserService } from '../../../core/services/user.service';
import { OrderService } from '../../../core/services/order.service';
import { Cart } from '../../../models/cart.model';
import { Address } from '../../../models/address.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class CheckoutComponent implements OnInit {
  cart?: Cart;
  addresses: Address[] = [];
  paymentForm!: FormGroup;
  selectedAddressId: number | null = null;
  paymentMethods = [
    { id: 'credit_card', name: 'Kredi Kartı' },
    { id: 'bank_transfer', name: 'Havale / EFT' },
    { id: 'cash_on_delivery', name: 'Kapıda Ödeme' }
  ];
  currentStep = 1;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadCart();
    this.loadAddresses();
    this.initPaymentForm();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(
      cart => {
        this.cart = cart;
        if (!cart || cart.items.length === 0) {
          this.router.navigate(['/cart']);
        }
      }
    );
  }

  loadAddresses(): void {
    this.userService.getUserAddresses().subscribe(
      addresses => {
        this.addresses = addresses;
        const defaultAddress = addresses.find(addr => addr.isDefault);
        if (defaultAddress) {
          this.selectedAddressId = defaultAddress.id;
        } else if (addresses.length > 0) {
          this.selectedAddressId = addresses[0].id;
        }
      },
      error => console.error('Error loading addresses', error)
    );
  }

  initPaymentForm(): void {
    this.paymentForm = this.fb.group({
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryMonth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]],
      expiryYear: ['', [Validators.required, Validators.pattern(/^(2[3-9]|[3-9][0-9])$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });
  }

  selectAddress(addressId: number): void {
    this.selectedAddressId = addressId;
  }

  nextStep(): void {
    if (this.currentStep === 1 && this.selectedAddressId) {
      this.currentStep = 2;
    }
  }

  prevStep(): void {
    if (this.currentStep === 2) {
      this.currentStep = 1;
    }
  }

  placeOrder(): void {
    if (this.paymentForm.invalid || !this.selectedAddressId) {
      return;
    }

    this.isSubmitting = true;
    const selectedAddress = this.addresses.find(addr => addr.id === this.selectedAddressId);

    const order = {
      items: this.cart?.items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.discountPrice || item.product.price
      })),
      totalPrice: this.cart?.totalPrice,
      shippingAddress: selectedAddress,
      paymentMethod: 'credit_card'
    };

    this.orderService.createOrder(order).subscribe(
      createdOrder => {
        this.cartService.clearCart();
        this.router.navigate(['/checkout/success'], { 
          queryParams: { orderId: createdOrder.id } 
        });
      },
      error => {
        console.error('Error creating order', error);
        this.isSubmitting = false;
      }
    );
  }
}