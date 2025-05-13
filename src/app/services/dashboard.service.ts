import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private userBaseUrl = 'https://localhost:7113/api/User/employees/count';

  private customerBaseUrl = 'https://localhost:7113/api/customer/count';

  private orderBaseUrl = 'https://localhost:7113/api/order/totalorders';

  private orderItemBaseUrl = 'https://localhost:7113/api/OrderItem/total-cycles-purchased';

  private paymentRevenueBaseUrl = 'https://localhost:7113/api/Payment/revenue-by-payment-method';

  private ordersPerDayBaseUrl = 'https://localhost:7113/api/order/orders-per-day';

  constructor(private http: HttpClient) {}

  getCustomerCount() {
    return this.http.get<number>(`${this.customerBaseUrl}`);
  }

  getEmployeeCount() {
    return this.http.get<number>(`${this.userBaseUrl}`);
  }

  getOrderCount() {
    return this.http.get<number>(`${this.orderBaseUrl}`);
  }

  getOrderItemCount() {
    return this.http.get<number>(`${this.orderItemBaseUrl}`);
  }

  getRevenueByPaymentType(): Observable<{ paymentType: string, totalRevenue: number }[]> {
    return this.http.get<{ paymentType: string, totalRevenue: number }[]>(`${this.paymentRevenueBaseUrl}`);
  }

  getOrdersPerDay(): Observable<{ date: string, orderCount: number }[]> {
    return this.http.get<{ date: string, orderCount: number }[]>(`${this.ordersPerDayBaseUrl}`);
  }


}
