import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  productsTmp: any[] = [];
  productsSource = new BehaviorSubject<any[]>([]);
  currentProducts = this.productsSource.asObservable();

  constructor(private http: HttpClient) {}

  getProducts() {
    this.http.get<any[]>(`${environment.apiurl}/api/v1/products`).subscribe((data) => {
      this.productsSource.next(data);
      this.productsTmp = data;
    });
  }

  searchProducts(searchText: string) {
    this.http.get<any[]>(`${environment.apiurl}/api/v1/products`, {
      params: { keyword: searchText }
    }).subscribe((data) => {
      this.productsSource.next(data);
    });
  }

  clearSearch(searchText: string) {
    if (searchText === '') {
      this.productsSource.next(this.productsTmp);
    } else {
      console.log("error in clearing Search");
    }
  }

  getSingleProduct(id: string) {
    const url = `${environment.apiurl}/api/v1/products/${id}`;
    console.log('Fetching product from:', url);  // Log the URL
    return this.http.get(url);
  }
}
