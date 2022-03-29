import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopifyService {

  constructor(private http: HttpClient) { }


  getSalesData(): Observable<any>  {
    return this.http.get<any>('assets/data.json').pipe(
      map( e => e.data.sales)
    )
  }

  getOrderData(): Observable<any>  {
    return this.http.get<any>('assets/data.json').pipe(
      map( e => e.data.orders)
    )
  }
}
