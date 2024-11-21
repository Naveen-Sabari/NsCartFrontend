import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { CartItem } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastrModule,RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  qty = 1;

  constructor(
    private route: ActivatedRoute,
    private apiservice: ApiService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const id: string = data['id'];
   
      
      if (id) {
        this.apiservice.getSingleProduct(id).subscribe(
          (response: any) => {
           
            this.product = response.product;
          },
          (error) => {
            this.toastr.error("Product not found");

          }
        );
      } else {
        this.toastr.error("Invalid product ID");
      }
    });
  }

  increaseQty() {
    this.qty++;
  }

  decreaseQty() {
    if (this.qty > 1) {
      this.qty--;
    }
  }

  addCart() {
    const newCartItem: CartItem = {
      _id: this.product._id,
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      ratings: this.product.ratings,
      images: this.product.images,
      category: this.product.category,
      seller: this.product.seller,
      stock: this.product.stock,
      qty: this.qty 
    };

    this.cartService.additems(newCartItem);
    this.toastr.success(`${this.product.name} has been added to cart`);
  }
}
