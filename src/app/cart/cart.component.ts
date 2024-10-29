import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink], 
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartCount = 0;
  subTotal = 0;
  estTotal = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.CurrentItem.subscribe(items => {
      console.log('Cart items:', items); 
      this.cartItems = items;
      this.updateCartDetails();
    });
  }

  updateCartDetails(): void {
    this.cartCount = this.cartItems.length;
    this.subTotal = this.cartItems.reduce((acc: number, current: CartItem) => acc + current.qty, 0);
    this.estTotal = this.cartItems.reduce((acc: number, current: CartItem) => acc + (current.price * current.qty), 0);
  }

  increaseQty(index: number): void {
    this.cartItems[index].qty++;
    this.updateCartDetails();
  }

  decreaseQty(index: number): void {
    if (this.cartItems[index].qty > 1) {
      this.cartItems[index].qty--;
      this.updateCartDetails();
    }
  }

  deleteItem(index: number): void {
    this.cartService.removeItem(this.cartItems[index]._id);
  }
}
