import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-registration',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './customer-registration.component.html',
  styleUrl: './customer-registration.component.css'
})
export class CustomerRegistrationComponent {

  customerForm: FormGroup;
  existingCustomerId: string | null = null;
  isLoading = false;
  isExistingCustomer  = false;
  isBuyNow = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {
    this.customerForm = this.fb.group({
      phone: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      loyaltyPoints: [0],
      billingAddress: this.fb.group({
        streetLine1: ['', Validators.required],
        streetLine2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required]
      }),
      shippingAddress: this.fb.group({
        streetLine1: ['', Validators.required],
        streetLine2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.isBuyNow = this.route.snapshot.queryParamMap.get('buyNow') === 'true';
  }

  // Check if customer exists based on phone number
  checkCustomerByPhone(): void {
    const phone = this.customerForm.get('phone')?.value;
    if (!phone) return;

    this.isLoading = true;

    this.customerService.getCustomerByPhone(phone).subscribe({
      next: (customer: any) => {
        this.existingCustomerId = customer.customerID;
        this.prefillForm(customer);
        this.isLoading = false;
        this.isExistingCustomer  = true;
      },
      error: () => {
        this.existingCustomerId = null;
        this.isLoading = false;
        this.isExistingCustomer  = false;
      }
    });
  }

  // Prefill form with customer details
  prefillForm(customer: any): void {
    this.customerForm.patchValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      loyaltyPoints: customer.loyaltyPoints || 0,
      billingAddress: customer.billingAddress,
      shippingAddress: customer.shippingAddress
    });
  }

  // Submit: Create or Update
  onSubmit(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    const customerData = this.customerForm.value;

    if (this.existingCustomerId) {
      console.log('Customer ID:', this.existingCustomerId);
      // Update existing
      this.customerService.updateCustomer(this.existingCustomerId, customerData).subscribe({
        next: (res) => {
          const customerId = res.customer.customerID;
          console.log('Customer updated:', res);
          console.log('Customer ID:', customerId);
          // alert('Customer updated successfully');
          this.toaster.success('Customer updated successfully')
          this.router.navigate(['/employee-dashboard/billing-details', customerId],{
            queryParams: { buyNow: this.isBuyNow }
          });
        },
        error: (err) => {
          console.error(err);
          // alert('Error updating customer');
          this.toaster.error('Error updating customer');
        }
      });
    } else {
      // Create new
      this.customerService.createCustomer(customerData).subscribe({
        next: (res) => {
          const customerId = res.customer.customerID;
          console.log('Customer created:', res);
          console.log('Customer ID:', customerId);
          // alert('Customer created successfully');
          this.toaster.success('Customer created successfully');
          this.router.navigate(['/employee-dashboard/billing-details', customerId],{
            queryParams: { buyNow: this.isBuyNow }
          });
        },
        error: (err) => {
          console.error(err);
          // alert('Error creating customer');
          this.toaster.error('Error creating customer');
        }
      });
    }
  }

  goToCart()
  {
    this.router.navigate(['/employee-dashboard/cart']);
  }

}
