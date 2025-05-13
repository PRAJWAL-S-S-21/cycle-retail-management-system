import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems: any[] = [];

  // @Output() closeCart = new EventEmitter<void>();

  constructor(public cartService: CartService, private router : Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeItem(cycleID: string) {
    this.cartService.removeItem(cycleID);
    this.cartItems = this.cartService.getCartItems(); // update view
  }

  checkout() {
    // console.log('Order placed for:', this.cartItems);
    // this.cartService.clearCart();
    // this.cartItems = [];
    // alert('Order placed successfully!');
    // this.closeCart.emit();
    this.router.navigate(['employee-dashboard/customer-registration']);
  }

  closeCart() {
    this.router.navigate(['employee-dashboard/cycle-list']);
  }
  

}
