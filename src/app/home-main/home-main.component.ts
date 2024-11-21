import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-home-main',
  standalone: true,
  imports: [CommonModule, RouterLink, CarouselModule],
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css'],
})
export class HomeMainComponent implements OnInit {
  products: any[] = [];  
  totalProducts: number = 0;   
  productsPerPage: number = 6; 
  currentIndex1: number = 32; 
  currentIndex2: number = 44; 
  currentIndex3: number = 56; 
  nextAllowed1: boolean = true;
  nextAllowed2: boolean = true;
  nextAllowed3: boolean = true;

  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
    this.apiservice.getProducts();
    this.apiservice.currentProducts.subscribe((data: any) => {
      this.products = data.products || [];
      this.totalProducts = this.products.length;
    });
  }
  getCarousel1Products(): any[] {
    return this.products.slice(this.currentIndex1, this.currentIndex2);
  }
  getCarousel2Products(): any[] {
    return this.products.slice(this.currentIndex2, this.currentIndex3);
  }

  getCarousel3Products(): any[] {
    return this.products.slice(this.currentIndex3);
  }
  getCarouselProducts(carouselNumber: number): any[] {
    switch (carouselNumber) {
      case 1:
        return this.products.slice(this.currentIndex1, this.currentIndex2);
      case 2:
        return this.products.slice(this.currentIndex2, this.currentIndex3);
      case 3:
        return this.products.slice(this.currentIndex3);
      default:
        return [];
    }
  }

goToNextProduct(carouselNumber: number): void {
  if (carouselNumber === 1 && this.nextAllowed1 && this.currentIndex1 + this.productsPerPage < this.currentIndex2) {
    this.currentIndex1 += this.productsPerPage; 
    this.nextAllowed1 = false; 
  } else if (carouselNumber === 2 && this.nextAllowed2 && this.currentIndex2 + this.productsPerPage < this.currentIndex3) {
    this.currentIndex2 += this.productsPerPage; 
    this.nextAllowed2 = false; 
  } else if (carouselNumber === 3 && this.nextAllowed3 && this.currentIndex3 + this.productsPerPage < this.totalProducts) {
    this.currentIndex3 += this.productsPerPage; 
    this.nextAllowed3 = false; 
  }
}

goToPrevProduct(carouselNumber: number): void {
  if (carouselNumber === 1 && this.currentIndex1 > 32) {
    this.currentIndex1 = Math.max(this.currentIndex1 - this.productsPerPage, 32); // Prevent going below 32
    this.nextAllowed1 = true; 
  } else if (carouselNumber === 2 && this.currentIndex2 > 44) {
    this.currentIndex2 = Math.max(this.currentIndex2 - this.productsPerPage, 44); // Prevent going below 44
    this.nextAllowed2 = true; 
  } else if (carouselNumber === 3 && this.currentIndex3 > 56) {
    this.currentIndex3 = Math.max(this.currentIndex3 - this.productsPerPage, 56); // Prevent going below 56
    this.nextAllowed3 = true; 
  }
}

  canGoNext(carouselNumber: number): boolean {
    if (carouselNumber === 1) {
      return this.nextAllowed1 && this.currentIndex2 < this.currentIndex3;
    } else if (carouselNumber === 2) {
      return this.nextAllowed2 && this.currentIndex3 < this.totalProducts;
    } else if (carouselNumber === 3) {
      return this.currentIndex3 < this.totalProducts;
    }
    return false;
  }
  canGoPrev(carouselNumber: number): boolean {
    if (carouselNumber === 1) {
      return this.currentIndex1 > 32;
    } else if (carouselNumber === 2) {
      return this.currentIndex2 > 44;
    } else if (carouselNumber === 3) {
      return this.currentIndex3 > 56;
    }
    return false;
  }

  getCardProducts(): any[][] {
    return this.getProductChunks(this.products.slice(0, 32), 4); // Cards from the first 32 products
  }

  getProductChunks(arr: any[], chunkSize: number): any[][] {
    const result: any[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }
}
