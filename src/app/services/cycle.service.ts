import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectableObservable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CycleService {

  private cycleApiUrl  = 'https://localhost:7113/api/cycles'; 

  constructor(private http: HttpClient) {}

  // Get all cycles
  getCycles(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.cycleApiUrl }/view-all`, { headers });
  }

  // Add new cycle
  addCycle(cycle: any): Observable<any> {
    console.log('Cycle:', cycle);
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.cycleApiUrl }/add`, cycle, { headers });
  }

  updateCycle(cycle_id : string, updatedCycle: any): Observable<any> {
    console.log('Cycle:', updatedCycle);
    console.log('Cycle ID:', cycle_id);
    const header = this.getAuthHeaders();
    return this.http.put(`${this.cycleApiUrl}/edit/${cycle_id}`, updatedCycle, {headers: header});
  }

  getCycleById(cycle_id : string) : Observable<any>{
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.cycleApiUrl}/view/${cycle_id}`, { headers });
  }

  deleteCycle(cycle_id :string) : Observable<any>{
    console.log('Cycle ID:', cycle_id);
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.cycleApiUrl}/delete/${cycle_id}`, { headers });
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
