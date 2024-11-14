
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../cart.service';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartCount = 0;
  subTotal = 0;
  estTotal = 0;
  private stripePromise: Promise<Stripe | null>;

  constructor(private cartService: CartService, private http: HttpClient) {
    this.stripePromise = loadStripe('pk_test_51QH4jnRp9ThHgIqtO0EQhJO4s9aAl9KQ9WwISXXqxQZa1UOYPwBEtNzV65sqEzNqPf8UXlTvLlFP1ixuadhBGHfN002zhnXCEM'); 
  }

  ngOnInit(): void {
    this.cartService.CurrentItem.subscribe(items => {
      this.cartItems = items;
      this.updateCartDetails();
    });
  }

  updateCartDetails(): void {
    this.cartCount = this.cartItems.length;
    this.subTotal = this.cartItems.reduce((acc, current) => acc + current.qty, 0);
    this.estTotal = this.cartItems.reduce((acc, current) => acc + (current.price * current.qty), 0);
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
    this.updateCartDetails();
  }

  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.qty,
        image: item.images[0].image 
      }))
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Checkout error:', error);
        return of(null);
      })
    ).subscribe(async (res: any) => {
      if (res) {
        const stripe = await this.stripePromise;
        stripe?.redirectToCheckout({ sessionId: res.id });
      }
    });
  }
}
