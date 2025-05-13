import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  selectedCustomer: any = null; // for editing customer
  showModal: boolean = false; // for modal visibility

  // Search and Filter 
  searchTerm: string = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;
  filteredCustomers: any[] = [];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5; // 5 records per page 
  totalPages: number = 1;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void{
    this.customerService.getAllCustomers().subscribe({
      next: (response)=>{
        this.customers = response;
        this.filteredCustomers = [...response]; // Initialize filtered array
        this.updatePagination(); // Update pagination after loading customers
        this.applyFilters(); // Apply filters after loading
        console.log('Customers:', this.customers);
        console.log('Customers:', this.customers); // Debug output  
      },
      error: (error) =>{
        console.error('Error fetching customers:', error);
      }
    })
  }

  // Open modal for editing
  openEditModal(customer: any) {
    this.selectedCustomer = JSON.parse(JSON.stringify(customer));
    this.showModal = true; // Show modal
  }

  // Cancel editing
  cancelEdit() {
    this.selectedCustomer = null;
    this.showModal = false; // Hide modal
  }

  // Save update
  updateCustomer() {
    this.customerService.updateCustomer(this.selectedCustomer.customerID, this.selectedCustomer).subscribe({
      next: (res) => {
        this.fetchCustomers(); // refresh table
        this.selectedCustomer = null;
        this.showModal = false; // Hide modal
        console.log('Customer updated successfully', res);
      },
      error: (err) => console.error('Update failed', err),
    });
  }

  // Close modal if clicked outside
  closeModal(event: MouseEvent) {
    this.selectedCustomer = null;
    this.showModal = false; // Hide modal
  }


  onDeleteCustomer(customerId: string): void {
    // Logic to delete customer
    console.log('Delete customer with ID:', customerId);
  }

  // Delete customer
  deleteCustomer(id: string) {
    console.log(id)
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: (res) => {
          console.log('Customer deleted');
          console.log(res)
          this.fetchCustomers(); // Refresh list
        },
        error: (err) => {
          console.error('Error deleting customer:', err);
        }
      });
    }
  }


  applyFilters(): void {
    this.currentPage = 1; // Reset to first page on filter change
    this.filteredCustomers = this.customers.filter(customer => {
      // Search term filter (checks multiple fields)
      const matchesSearch = !this.searchTerm || 
        this.doesCustomerMatchSearch(customer, this.searchTerm);
      
      // Date range filter
      const matchesDate = this.doesCustomerMatchDate(customer);
      
      return matchesSearch && matchesDate;
    });
    this.updatePagination(); // Update pagination after filtering
  }
  
  doesCustomerMatchSearch(customer: any, searchTerm: string): boolean {
    const term = searchTerm.toLowerCase();
    return (
      customer.firstName.toLowerCase().includes(term) ||
      customer.lastName.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term) ||
      customer.phone.toLowerCase().includes(term) ||
      this.formatAddress(customer.billingAddress).toLowerCase().includes(term) ||
      this.formatAddress(customer.shippingAddress).toLowerCase().includes(term)
    );
  }
  
  formatAddress(address: any): string {
    if (!address) return '';
    return `${address.streetLine1 || ''}, ${address.city || ''}, ${address.state || ''}`.trim();
  }
  
  doesCustomerMatchDate(customer: any): boolean {
    if (!this.fromDate && !this.toDate) return true;
    
    const customerDate = new Date(customer.createdAt);
    const fromDate = this.fromDate ? new Date(this.fromDate) : null;
    const toDate = this.toDate ? new Date(this.toDate) : null;
    
    if (fromDate && toDate) {
      return customerDate >= fromDate && customerDate <= toDate;
    } else if (fromDate) {
      return customerDate >= fromDate;
    } else if (toDate) {
      return customerDate <= toDate;
    }
    return true;
  }
  
  resetFilters(): void {
    this.searchTerm = '';
    this.fromDate = null;
    this.toDate = null;
    this.applyFilters();
  }

  // Update pagination whenever filtered customers change
updatePagination(): void {
  this.totalPages = Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
  // Ensure current page doesn't exceed total pages
  if (this.currentPage > this.totalPages && this.totalPages > 0) {
    this.currentPage = this.totalPages;
  }
}

// Get current page's customers
getPaginatedCustomers(): any[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.filteredCustomers.slice(startIndex, startIndex + this.itemsPerPage);
}

// Page navigation methods
goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}


}
