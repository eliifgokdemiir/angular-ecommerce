// src/app/features/checkout/checkout.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CheckoutRoutingModule,
    CheckoutComponent,
    CheckoutSuccessComponent
  ]
})
export class CheckoutModule { }