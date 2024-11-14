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
  products: any[] = [];  // Array to store all products
  totalProducts: number = 0;    // Total number of products in the array
  productsPerPage: number = 6;  // Number of products to show at a time

  // Indexes for the carousels (independent ranges for each)
  currentIndex1: number = 32;  // Index for the first carousel (start from 32)
  currentIndex2: number = 44;  // Index for the second carousel (start from 44)
  currentIndex3: number = 56;  // Index for the third carousel (start from 56)

  // Flags to control "Next" button state for each carousel
  nextAllowed1: boolean = true;
  nextAllowed2: boolean = true;
  nextAllowed3: boolean = true;

  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
    // Fetch products from the API service
    this.apiservice.getProducts();

    // Subscribe to the current products data stream
    this.apiservice.currentProducts.subscribe((data: any) => {
      this.products = data.products || [];
      this.totalProducts = this.products.length;
    });
  }

  // Method to get the products for Carousel 1 (between 32 and 43)
  getCarousel1Products(): any[] {
    return this.products.slice(this.currentIndex1, this.currentIndex2);
  }

  // Method to get the products for Carousel 2 (between 44 and 55)
  getCarousel2Products(): any[] {
    return this.products.slice(this.currentIndex2, this.currentIndex3);
  }

  // Method to get the products for Carousel 3 (starting from 56 onward)
  getCarousel3Products(): any[] {
    return this.products.slice(this.currentIndex3);
  }

  // General method to get products for any carousel based on their index range
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

  /// Method to go to the next set of products for a carousel
goToNextProduct(carouselNumber: number): void {
  if (carouselNumber === 1 && this.nextAllowed1 && this.currentIndex1 + this.productsPerPage < this.currentIndex2) {
    // Move the index for carousel 1 to the next group of products
    this.currentIndex1 += this.productsPerPage; // Only move the start index of Carousel 1
    this.nextAllowed1 = false; // Disable next for Carousel 1 after clicking
  } else if (carouselNumber === 2 && this.nextAllowed2 && this.currentIndex2 + this.productsPerPage < this.currentIndex3) {
    // Move the index for carousel 2 to the next group of products
    this.currentIndex2 += this.productsPerPage; // Only move the start index of Carousel 2
    this.nextAllowed2 = false; // Disable next for Carousel 2 after clicking
  } else if (carouselNumber === 3 && this.nextAllowed3 && this.currentIndex3 + this.productsPerPage < this.totalProducts) {
    // Move the index for carousel 3 to the next group of products
    this.currentIndex3 += this.productsPerPage; // Only move the start index of Carousel 3
    this.nextAllowed3 = false; // Disable next for Carousel 3 after clicking
  }
}

// Method to go to the previous set of products for a carousel
goToPrevProduct(carouselNumber: number): void {
  if (carouselNumber === 1 && this.currentIndex1 > 32) {
    // Move the index for carousel 1 to the previous group of products
    this.currentIndex1 = Math.max(this.currentIndex1 - this.productsPerPage, 32); // Prevent going below 32
    this.nextAllowed1 = true; // Enable next for Carousel 1 after going back
  } else if (carouselNumber === 2 && this.currentIndex2 > 44) {
    // Move the index for carousel 2 to the previous group of products
    this.currentIndex2 = Math.max(this.currentIndex2 - this.productsPerPage, 44); // Prevent going below 44
    this.nextAllowed2 = true; // Enable next for Carousel 2 after going back
  } else if (carouselNumber === 3 && this.currentIndex3 > 56) {
    // Move the index for carousel 3 to the previous group of products
    this.currentIndex3 = Math.max(this.currentIndex3 - this.productsPerPage, 56); // Prevent going below 56
    this.nextAllowed3 = true; // Enable next for Carousel 3 after going back
  }
}


  // Check if "Next" button should be enabled (for the selected carousel)
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

  // Check if "Previous" button should be enabled (for the selected carousel)
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
