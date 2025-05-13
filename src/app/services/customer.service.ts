import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'https://localhost:7113/api/customer'; // Adjust to match your backend

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }  

  getCustomerByPhone(phone: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/phone/${phone}`);
  }

  createCustomer(data: any): Observable<any> {
    console.log('Customer Data:', data); // Debug output
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}`, data, { headers});
  }

  updateCustomer(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }

  getCustomerById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Get Auth Headers with JWT Token
    private getAuthHeaders() {
      const token = localStorage.getItem('jwtToken');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }
}
