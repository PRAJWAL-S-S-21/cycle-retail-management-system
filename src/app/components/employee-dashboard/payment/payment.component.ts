import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

export enum PaymentType {
  CASH = 0,
  UPI = 1,
  CARD = 2
}

export enum PaymentStatus {
  PENDING = 0,
  SUCCESS = 1,
  FAILED = 2
}

@Component({
  selector: 'app-payment',
  imports: [FormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  PaymentType = PaymentType; // ✅ Expose enum to template

  customer: any;
  cartItems: any[] = [];
  paymentType: PaymentType = PaymentType.CASH; // ✅ Fix typo here

  // Payment form fields
  confirmedByEmployee: boolean = false;
  upiTransactionId: string = '';
  stripePaymentId: string = '';
  cardLast4: string = '';
  isBuyNow: boolean = false;
  cycleToBuy: any = null;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    const storedCustomer = localStorage.getItem('selectedCustomer');
    if (storedCustomer) {
      this.customer = JSON.parse(storedCustomer);
      console.log('Loaded customer:', this.customer);
    }

    this.isBuyNow = this.route.snapshot.queryParamMap.get('buyNow') === 'true';

  if (this.isBuyNow) {
    this.cycleToBuy = JSON.parse(localStorage.getItem('buyNowCycle')!);
    console.log('Loaded cycle to buy:', this.cycleToBuy);
  }



    this.cartItems = this.cartService.getCartItems();
    console.log('Loaded cart items:', this.cartItems);
  }

  getSubtotal(): number {
    if(this.isBuyNow && this.cycleToBuy) {
      return this.cycleToBuy.price;
    }
    return this.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  // submitOrder() {
  //   const subtotal = this.getSubtotal();
  //   const tax = subtotal * 0.18;
  //   const total = subtotal + tax;

  //   const orderPayload = {
  //     customerId: this.customer.customerID,
  //     employeeId: 1,
  //     subtotal: subtotal,
  //     tax: tax,
  //     discount: 0,
  //     totalAmount: total,
  //     notes: '',
  //     shippingAddress: this.customer.shippingAddress,
  //     orderItems: this.cartItems.map(i => ({
  //       cycleId: i.cycleID,
  //       quantity: i.quantity,
  //       unitPrice: i.price,
  //       taxRate: 0.18,
  //       totalPrice: i.quantity * i.price * 1.18
  //     })),
  //     payment: {
  //       paymentType: this.paymentType,
  //       amount: total,
  //       status: PaymentStatus.SUCCESS,
  //       confirmedByEmployee: this.confirmedByEmployee,
  //       upiTransactionId: this.upiTransactionId,
  //       stripePaymentId: this.stripePaymentId,
  //       cardLast4: this.cardLast4
  //     }
  //   };

  //   console.log('Order Payload:', orderPayload);

  //   this.orderService.createOrder(orderPayload).subscribe({
  //     next: (orderDetailsResponse) => {
  //       alert('Order placed successfully!');
  //       this.cartService.clearCart();
  //       this.router.navigate(['employee-dashboard/payment-success'],{
  //         state: {order : orderDetailsResponse}
  //       });
  //     },
  //     error: (err) => {
  //       alert('Error: ' + (err.error?.message || 'Failed to place order.'));
  //     }
  //   });
  // }
  submitOrder() {
    const subtotal = this.getSubtotal();
    const tax = subtotal * 0.18;
    const total = subtotal + tax;
  
    const orderItems = this.isBuyNow && this.cycleToBuy
      ? [{
          cycleId: this.cycleToBuy.cycleID,
          quantity: 1,
          unitPrice: this.cycleToBuy.price,
          taxRate: 0.18,
          totalPrice: this.cycleToBuy.price * 1.18
        }]
      : this.cartItems.map(i => ({
          cycleId: i.cycleID,
          quantity: i.quantity,
          unitPrice: i.price,
          taxRate: 0.18,
          totalPrice: i.quantity * i.price * 1.18
        }));
  
    const orderPayload = {
      customerId: this.customer.customerID,
      employeeId: 1,
      subtotal: subtotal,
      tax: tax,
      discount: 0,
      totalAmount: total,
      notes: '',
      shippingAddress: this.customer.shippingAddress,
      orderItems: orderItems,
      payment: {
        paymentType: this.paymentType,
        amount: total,
        status: PaymentStatus.SUCCESS,
        confirmedByEmployee: this.confirmedByEmployee,
        upiTransactionId: this.upiTransactionId,
        stripePaymentId: this.stripePaymentId,
        cardLast4: this.cardLast4
      }
    };
  
    console.log('Order Payload:', orderPayload);
  
    this.orderService.createOrder(orderPayload).subscribe({
      next: (orderDetailsResponse) => {
        // alert('Order placed successfully!');
        this.toaster.success('Order placed successfully!');
        this.cartService.clearCart();
        this.router.navigate(['employee-dashboard/payment-success'], {
          state: { order: orderDetailsResponse }
        });
      },
      error: (err) => {
        // alert('Error: ' + (err.error?.message || 'Failed to place order.'));
        this.toaster.error(err.error?.message || 'Failed to place order.', 'Error');

      }
    });
  }
  

}
