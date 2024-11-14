import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://nscartbackend-5.onrender.com/api/v1';
  
  signup(user: { email: string, password: string, username: string }): Observable<any> {
    return this.http.post<any>('https://nscartbackend-5.onrender.com/api/v1/signup', user);
  }
  


  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth`, { ...credentials, action: 'login' });
  }
}