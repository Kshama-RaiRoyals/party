// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://ap.greatfuturetechno.com/'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post('https://ap.greatfuturetechno.com/login/', credentials);
  }
}
