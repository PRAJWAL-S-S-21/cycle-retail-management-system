import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems : any[] = [];
  private cartKey = 'cartItems';

  constructor() {
    this.loadCartFromStorage();
  }

  private saveCartToStorage() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
  }

  private loadCartFromStorage() {
    const storedItems = localStorage.getItem(this.cartKey);
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
  }
  
  addToCart(cycle : any){
    console.log('Adding to cart:', cycle);
    const existingItem = this.cartItems.find(item => item.cycleID === cycle.cycleID);
    if (!existingItem){
      this.cartItems.push({...cycle, quantity: 1});
    }
    else{
      existingItem.quantity += 1;
    }
    this.saveCartToStorage();
  }

  getCartItems(){
    console.log('Cart items:', this.cartItems);
    return this.cartItems || [];
  }

  removeItem(cycleID : string){
    this.cartItems = this.cartItems.filter(item => item.cycleID !== cycleID);
  }

  clearCart(){
    this.cartItems = [];
    localStorage.removeItem(this.cartKey);
  }

}
