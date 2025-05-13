import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7113/api/User';

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateUser(userId: number, userData: any) {
    console.log(userData);
    console.log(userId);
    return this.http.put(`${this.apiUrl}/edit-employee/${userId}`, userData);
  }

}
