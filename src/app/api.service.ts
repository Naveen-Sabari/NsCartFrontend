import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment.development'; 
import { of } from 'rxjs';


export interface Product {
  _id: string;
  name: string;
  description: string;
  images: string[];
  price: number;

}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  private productsTmp: Product[] = [];
  

  private productsSource = new BehaviorSubject<Product[]>([]);
  currentProducts = this.productsSource.asObservable();

  constructor(private http: HttpClient) {}


  getProducts() {
    this.http
      .get<Product[]>(`${environment.apiurl}/api/v1/products`)
      .pipe(catchError(this.handleError)) 
      .subscribe((data) => {
        this.productsSource.next(data);
        this.productsTmp = data; 
      });
  }

  searchProducts(searchText: string) {
    this.http
      .get<Product[]>(`${environment.apiurl}/api/v1/products`, {
        params: { keyword: searchText },
      })
      .pipe(catchError(this.handleError)) 
      .subscribe((data) => {
        this.productsSource.next(data);
      });
  }
  clearSearch(searchText: string) {
    if (searchText === '') {
      this.productsSource.next(this.productsTmp); 
    } else {
      
    }
  }

  getSingleProduct(id: string) {
    const url = `${environment.apiurl}/api/v1/products/${id}`;
   
    return this.http.get<Product>(url).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
     
      errorMessage = `Error: ${error.error.message}`;
    } else {
      
      errorMessage = `Error Code: ${error.status},  Message: ${error.message}`;
    }

    return of([]); 
  }
  
}
