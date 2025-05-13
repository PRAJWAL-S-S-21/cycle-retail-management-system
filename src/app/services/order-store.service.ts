import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderStoreService {

  private currentOrder: any;

  constructor() {
    const stored = localStorage.getItem('currentOrder');
    if(stored){
      this.currentOrder = JSON.parse(stored);
    }
   }

  setOrder(order:any){
    this.currentOrder = order;
    localStorage.setItem('currentOrder', JSON.stringify(order));
  }

  getOrder()
  {
    return this.currentOrder;
  }

  clearOrder()
  {
    this.currentOrder = null;
    localStorage.removeItem('currentOrder');
  }

}
