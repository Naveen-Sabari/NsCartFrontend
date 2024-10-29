import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-main',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.css'
})
export class HomeMainComponent implements OnInit {

  products:any = [];
  constructor(private apiservice:ApiService){
   
  }
 ngOnInit(): void {
  this.apiservice.getproducts()
  this.apiservice.currentProducts.subscribe((data:any)=>{
    console.log('Products:', data);
    this.products=data.products;
  })
 }
}
