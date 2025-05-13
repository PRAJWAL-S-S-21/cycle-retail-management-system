import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'https://localhost:7113/api/admin/';

  private registerEmployeeUrl = `${this.baseUrl}register-employee`;
  private viewEmployeesUrl  = `${this.baseUrl}view-employees`;

  constructor(private http: HttpClient) {}

  registerEmployee(employee: any): Observable<any> {
    const token = localStorage.getItem('jwtToken'); // Get the stored token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Attach token to request
    });

    return this.http.post<any>(this.registerEmployeeUrl, employee, { headers });
  }

  getEmployees(): Observable<any> {
    const token = localStorage.getItem('jwtToken'); // Get stored token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Send token in request
    });

    return this.http.get<any>(this.viewEmployeesUrl, { headers });

  }

  updateEmployee(userID: number, updatedData: any): Observable<any> {
    console.log(updatedData);
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`${this.baseUrl}edit-employee/${userID}`, updatedData, { headers });
  }

  deleteEmployee(userID: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.delete<any>(`${this.baseUrl}delete-employee/${userID}`, { headers });
  }

}
