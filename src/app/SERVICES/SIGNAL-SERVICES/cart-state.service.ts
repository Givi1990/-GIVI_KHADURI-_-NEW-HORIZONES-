import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../../INTERFACE/user-cart';

@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  // Сигнал, хранящий массив товаров в корзине
  cartItems = signal<CartItem[]>([]);
  
  // Вычисляемый сигнал для подсчёта количества товаров
  cartCount = computed(() => this.cartItems().length);

  // Добавление товара в корзину
  addItem(item: CartItem): void {
    const currentCart = this.cartItems();
    this.cartItems.set([...currentCart, item]);
  }

  // Обновление товара (например, изменение количества)
  updateItem(updatedItem: CartItem): void {
    const currentCart = this.cartItems();
    const newCart = currentCart.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    this.cartItems.set(newCart);
  }

  // Удаление товара из корзины
  removeItem(itemId: number): void {
    const newCart = this.cartItems().filter(item => String(item.id) !== String(itemId));
    this.cartItems.set(newCart);
  }
  
}
