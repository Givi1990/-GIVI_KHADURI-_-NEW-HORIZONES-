import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../../INTERFACE/user-cart';

@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  cartItems = signal<CartItem[]>([]);
  
  cartCount = computed(() => this.cartItems().length);

  addItem(item: CartItem): void {
    const currentCart = this.cartItems();
    this.cartItems.set([...currentCart, item]);
  }

  updateItem(updatedItem: CartItem): void {
    const currentCart = this.cartItems();
    const newCart = currentCart.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    this.cartItems.set(newCart);
  }

  removeItem(itemId: number): void {
    const newCart = this.cartItems().filter(item => String(item.id) !== String(itemId));
    this.cartItems.set(newCart);
  }
  
}
