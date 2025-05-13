import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl = 'https://localhost:7113/api/brands'; // Backend API for Brands

  constructor(private http: HttpClient) {}

  // Get all brands
  getBrands(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/view-all`, { headers });
  }

  // Add a new brand
  addBrand(brand: any): Observable<any> {
    console.log('Brand:', brand);
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/add`, brand, { headers });
  }

  updateBrand(brandId: string, updatedBrand: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/edit-brand/${brandId}`, updatedBrand, { headers });
  }

  deleteBrand(brandId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/delete-brand/${brandId}`, { headers });
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
