import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { BuyNowService } from '../../../services/buy-now.service';

@Component({
  selector: 'app-billing-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './billing-details.component.html',
  styleUrl: './billing-details.component.css'
})
export class BillingDetailsComponent implements OnInit {

  customerId!: string;
  customerData: any;
  cartItems: any[] = [];
  isBuyNow: boolean = false;
  buyNowCycle: any;
  cycleOrderItems: any[] = [];



  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private cartService: CartService,
    private buyNowService: BuyNowService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('customerId')!;
    this.isBuyNow = this.route.snapshot.queryParamMap.get('buyNow') === 'true';
    
    this.customerService.getCustomerById(this.customerId).subscribe(res => {
      console.log(res);
      this.customerData = res;
    });

    if(this.isBuyNow){
      this.buyNowCycle = this.buyNowService.getCycle();
      console.log(this.buyNowCycle);
    }
    else{
      this.cartItems = this.cartService.getCartItems();
      console.log(this.cartItems);
    }

  }

  getTotalAmount(): number {
    if(this.isBuyNow && this.buyNowCycle){
      return this.buyNowCycle.price;
    }
    return this.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  getCurrentDate()
  {
    const currentDate = new Date();
    return currentDate;
  }

  goBackToCustomerDetails()
  {
    this.router.navigate(['employee-dashboard/customer-registration']);

  }

  checkout() {
    localStorage.setItem('selectedCustomer', JSON.stringify(this.customerData));

    if(this.isBuyNow && this.buyNowCycle){
      localStorage.setItem('selectedCycle', JSON.stringify(this.buyNowCycle));
    }

    this.router.navigate(['employee-dashboard/payment'], {
      queryParams: { buyNow : this.isBuyNow }

    });
  }

}
