import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel'; // Ensure ngx-bootstrap is installed

@Component({
  selector: 'app-home-main',
  standalone: true,
  imports: [CommonModule, RouterLink, CarouselModule],
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {
  products: any[] = []; // Initialize products as an empty array

  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
    // Fetch products from the API service
    this.apiservice.getProducts(); // Make sure this method is correctly defined in ApiService

    // Subscribe to the current products
    this.apiservice.currentProducts.subscribe((data: any) => {
      console.log('Products:', data);
      this.products = data.products || []; // Fallback to an empty array if undefined
    });
  }

  getProductChunks(arr: any[], chunkSize: number): any[][] {
    const result: any[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
}



  getCarouselProducts(): any[][] {
    return this.getProductChunks(this.products.slice(32, 50), 6);
  }
}
