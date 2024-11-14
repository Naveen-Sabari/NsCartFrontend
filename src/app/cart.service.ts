import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  ratings: number;
  images: { image: string }[];
  category: string;
  seller: string;
  stock: number;
  qty: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemssource = new BehaviorSubject<CartItem[]>([]);
  CurrentItem = this.itemssource.asObservable();
  private cartItems: CartItem[] = [];

  constructor() {}

  additems(newCartItem: CartItem): void {
    const existingItem = this.cartItems.find(item => item._id === newCartItem._id);
    if (existingItem) {
      existingItem.qty += newCartItem.qty; 
    } else {
      this.cartItems.push(newCartItem);
    }
    this.itemssource.next(this.cartItems); 
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
    this.itemssource.next(this.cartItems);
  }

  removeItem(itemId: string): void {
    this.cartItems = this.cartItems.filter(item => item._id !== itemId);
    this.itemssource.next(this.cartItems);
  }
}
