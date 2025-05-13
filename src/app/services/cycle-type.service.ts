import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CycleTypeService {

  private apiUrl = 'https://localhost:7113/api/cycletypes'; // Backend API for Cycle Types

  constructor(private http: HttpClient) {}

  // Get all cycle types
  getCycleTypes(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/view-all`, { headers });
  }

  // Add a new cycle type
  addCycleType(cycleType: any): Observable<any> {
    console.log('Cycle Type:', cycleType);
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/add`, cycleType, { headers });
  }

  editCycleType(typeId: string, updatedType: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/edit-cycle-type/${typeId}`, updatedType, { headers});
  }
  
  deleteCycleType(typeId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/delete-cycle-type/${typeId}`, {headers});
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
