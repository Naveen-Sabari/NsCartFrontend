import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }


  productsTmp:any=[];
  productsSource= new BehaviorSubject([]);
  currentProducts =this.productsSource.asObservable();

  getproducts(){
   this.http.get(environment.apiurl+'/api/v1/products').subscribe((data:any)=>{
      this.productsSource.next(data)
      this.productsTmp=data;
    })

  }

  searchProducts(searchText:string){
   this.http.get(environment.apiurl+'/api/v1/products',{
      params:{keyword:searchText}
    }).subscribe((data:any)=>{
      this.productsSource.next(data)
    }) 

  }


   // clear text in search
 clearSearch(searchText:string ){ 
   
  if(searchText == ''){
     this.productsSource.next(this.productsTmp)
  }else{  
    console.log("error in clearing Search")
  }
}


getSingleProduct(id:string){
  return this.http.get(environment.apiurl+'/api/v1/products/'+id)
}
}
