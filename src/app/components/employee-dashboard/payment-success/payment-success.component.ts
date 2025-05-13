import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStoreService } from '../../../services/order-store.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-success',
  imports: [OrderDetailsComponent, CommonModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {

  order: any;
  @Input() showPrintButton: boolean = true;

  constructor(private router: Router, private orderStore : OrderStoreService) {
    const nav = this.router.getCurrentNavigation();
    this.order = nav?.extras.state?.['order'];
    console.log('Order data:', this.order);

    if(this.order){
      this.orderStore.setOrder(this.order);
    }
    else{
      this.order = this.orderStore.getOrder();
      console.log('Order data from store:', this.order);
    }
    
  }

  viewOrderDetails() {
    this.router.navigate(['/employee-dashboard/order-details']);
  }

  downloadReceipt() {
    // TODO: Implement PDF download logic
    alert('Download receipt functionality coming soon!');
  }

  printReceipt(): void {
    const printContents = document.getElementById('print-section')?.innerHTML;
    const originalContents = document.body.innerHTML;
  
    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      location.reload(); // Restore the app
    }
  }

}
