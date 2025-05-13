import { Component, Input } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule, OrderDetailsComponent, FormsModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {

  orders: any[] = [];
  selectedOrder: any = null;
  @Input() showPrintButton: boolean = true;

  searchTerm: string = '';
  selectedStatus: string = 'all';
  selectedPaymentType: string = 'all';
  fromDate: Date | null = null;
  toDate: Date | null = null;
  filteredOrders: any[] = [];

  // Add these to your component class
  currentPage: number = 1;
  itemsPerPage: number = 5; // 5 records per page as requested
  totalPages: number = 1;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.fetchOrderHistory();
  }

  fetchOrderHistory(): void {
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        console.log('Fetched orders:', res);
        this.currentPage = 1;
        this.orders = res;
        this.filteredOrders = [...res]; // Initialize filteredOrders
        this.applyFilters(); // Apply filters after loading
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }

  getPaymentType(type: number): string {
    switch (type) {
      case 0: return 'Cash';
      case 1: return 'UPI';
      case 2: return 'Card';
      default: return 'Unknown';
    }
  }

  getOrderStatus(status: number): string {
    switch (status) {
      case 0: return 'Pending';
      case 1: return 'Success';
      case 2: return 'Failed';
      default: return 'Unknown';
    }
  }

  viewDetails(order: any): void {
    this.selectedOrder = order;
  }

  getPaymentTypeClass(paymentType: number): string {
    switch (paymentType) {
      case 1: return 'payment-cash';
      case 2: return 'payment-upi';
      case 3: return 'payment-card';
      default: return '';
    }
  }
  
  getStatusClass(status: number): string {
    switch (status) {
      case 1: return 'status-pending';
      case 2: return 'status-complete';
      case 3: return 'status-cancelled';
      default: return '';
    }
  }

  backToHistory(): void {
    this.selectedOrder = null;
  }


  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      // Search term filter (checks order number, customer name, amount)
      const matchesSearch = !this.searchTerm || 
        this.doesOrderMatchSearch(order, this.searchTerm);
      
      // Status filter
      const matchesStatus = this.selectedStatus === 'all' || 
        order.status.toString() === this.selectedStatus;
      
      // Payment type filter
      const matchesPaymentType = this.selectedPaymentType === 'all' || 
        order.payment.paymentType.toString() === this.selectedPaymentType;
      
      // Date range filter
      const matchesDate = this.doesOrderMatchDate(order);
      
      return matchesSearch && matchesStatus && matchesPaymentType && matchesDate;
    });

    this.updatePagination();
  }
  
  doesOrderMatchSearch(order: any, searchTerm: string): boolean {
    const term = searchTerm.toLowerCase();
    return (
      order.orderNumber.toLowerCase().includes(term) ||
      `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase().includes(term) ||
      order.totalAmount.toString().includes(term) ||
      this.getPaymentType(order.payment.paymentType).toLowerCase().includes(term)
    );
  }
  
  doesOrderMatchDate(order: any): boolean {
    if (!this.fromDate && !this.toDate) return true;
    
    const orderDate = new Date(order.orderDate);
    const fromDate = this.fromDate ? new Date(this.fromDate) : null;
    const toDate = this.toDate ? new Date(this.toDate) : null;
    
    if (fromDate && toDate) {
      return orderDate >= fromDate && orderDate <= toDate;
    } else if (fromDate) {
      return orderDate >= fromDate;
    } else if (toDate) {
      return orderDate <= toDate;
    }
    return true;
  }
  
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = 'all';
    this.selectedPaymentType = 'all';
    this.fromDate = null;
    this.toDate = null;
    this.applyFilters();
  }


  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredOrders.length / this.itemsPerPage);
    // Ensure current page doesn't exceed total pages
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
  }
  
  // Get current page's orders
  getPaginatedOrders(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrders.slice(startIndex, startIndex + this.itemsPerPage);
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
