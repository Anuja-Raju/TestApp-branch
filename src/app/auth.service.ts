// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://192.168.25.106:3000/'; 
  getCustomerSumPrevY: any;
  getProductsForCategory: any;
  getmainProductAdvanceSum:any;
  getmainProductDepositSum:any;

  constructor(private http: HttpClient) {}

  Signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}signup`, data);
  }

  Login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, data);
  }
    // Add methods to fetch total deposit and total advance
    getTotalDeposit(): Observable<any> {
    return this.http.get(`${this.apiUrl}totaldeposit`);
  }

  getTotalAdvance(): Observable<any> {
    return this.http.get(`${this.apiUrl}totalAdvance`);
  }

 
getCustomerSum(): Observable<any> {
  return this.http.get(`${this.apiUrl}customerSum`);
}

getPrevCustomerSum(): Observable<any> {
  return this.http.get(`${this.apiUrl}customerSumPrevY`);
}
getNewCustomerSumQuery(): Observable<any> {
  return this.http.get(`${this.apiUrl}customerSumNew`);
}


getAdvanceSum(): Observable<any> {
  return this.http.get(`${this.apiUrl}mainProductAdvanceSum`);
}

getDepositSum(): Observable<any> {
  return this.http.get(`${this.apiUrl}mainProductDepositSum`);
}

}
 
