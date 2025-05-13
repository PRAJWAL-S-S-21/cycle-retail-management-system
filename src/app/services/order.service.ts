import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://localhost:7113/api/order'; // Update as needed

  constructor(private http: HttpClient) {}

  createOrder(order: any) {
    console.log('Order:', order);
    return this.http.post(`${this.apiUrl}`, order);
  }

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getTotalRevenue(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalsales`);
  }

  getRevenueToday(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/revenue-today`);
  }

  getRevenueThisMonth(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/revenue-this-month`);
  }

  getTotalOrders(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalorders`);
  }

  getMonthlyRevenueBreakdown(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sales-over-time`);
  }

  getOrderStatusCounts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/status-counts`);
  }

  getTopSellingCycles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-selling`);
  }


}
