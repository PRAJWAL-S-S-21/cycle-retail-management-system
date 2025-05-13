import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStoreService } from '../../../services/order-store.service';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {
  @Input() order: any;
  @Input() showPrintButton: boolean = true;
  @Input() showActions: boolean = true;
  @Output() backToHistory = new EventEmitter<void>();

  constructor(public router: Router, private orderStore: OrderStoreService) {
    // const nav = this.router.getCurrentNavigation();
    // this.order =nav?.extras.state?.['order'];
    // if(this.order) {
    //   console.log('Order data:', this.order);
    // }
    // else{
    //   console.error('No order data found in navigation state.');

    // }
  }
  ngOnInit(): void {
    if(!this.order) {
    this.order = this.orderStore.getOrder();
    }
    console.log('Order data:', this.order);
  }

  getPaymentTypeLabel(type: number): string {
    switch (type) {
      case 0: return 'Cash';
      case 1: return 'UPI';
      case 2: return 'Card';
      default: return 'Unknown';
    }
  }

  getOrderStatusLabel(status: number): string {
    switch (status) {
      case 0: return 'Pending';
      case 1: return 'Success';
      default: return 'Unknown';
    }
  }



  getOrderStatusClass(status: string): string {
    const statusClassMap: {[key: string]: string} = {
      'PENDING': 'status-pending',
      'PROCESSING': 'status-processing',
      'SHIPPED': 'status-shipped',
      'DELIVERED': 'status-delivered',
      'CANCELLED': 'status-cancelled'
    };
    return statusClassMap[status] || '';
  }


  printReceipt(): void {
    const printContents = document.getElementById('print-section')?.innerHTML;
    const originalContents = document.body.innerHTML;
  
    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      location.reload(); // Optional: reload to restore original app state (Angular)
    }
  }

 

}
