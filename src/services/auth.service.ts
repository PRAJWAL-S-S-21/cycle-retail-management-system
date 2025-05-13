import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private apiUrl = 'https://localhost:7113/api/auth/login'; 
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any) {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  storeToken(token: string) {
    localStorage.setItem('jwtToken', token);
    console.log('Token:', token);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      console.log('Decoded Token:', decodedToken); // Debug output
      return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
    }
    return null;
  }

  getUserId() : string | null{

    const token = this.getToken();
    if(token){
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    }
    return null;
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }
}
