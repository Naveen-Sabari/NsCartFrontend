 import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { clear } from 'node:console';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  products:CartItem[]=[];


  constructor(private apiService:ApiService){
 
  }
  ngOnInit(): void {

    this.apiService.getproducts();
     
    this.apiService.currentProducts.subscribe((data:any)=>{
          this.products=data.products;
          
    })}


  
}
