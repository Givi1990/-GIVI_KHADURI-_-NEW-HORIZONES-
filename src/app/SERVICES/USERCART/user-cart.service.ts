import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { CartItem } from '../../INTERFACE/user-cart';

@Injectable({
  providedIn: 'root'
})
export class UserCartService {
  private apiCart = "https://task4-2d93e-default-rtdb.europe-west1.firebasedatabase.app/userCart";

  constructor(private http: HttpClient) { }

  // Получаем все товары из корзины для определенного пользователя
  getProduct(productWithUserId: any): Observable<CartItem[]> {
    return this.http.get<{ [key: string]: CartItem }>(`${this.apiCart}.json`).pipe(
      map((response) => {
        // Отфильтровываем товары по userId
        return response ? Object.values(response).filter(item => item.userId === productWithUserId.userId) : [];
      }),
      catchError((error) => {
        console.error('Ошибка при получении товаров:', error);
        throw error;
      })
    );
  }

  // Создаем новый товар в корзине
  createProduct(product: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiCart}.json`, product).pipe(
      catchError((error) => {
        console.error('Ошибка при добавлении товара в корзину:', error);
        throw error;
      })
    );
  }

  // Обновляем количество товара в корзине
  updateQuantity(id: string, userId: string, quantity: string): Observable<CartItem> {
    return this.http.get<{ [key: string]: CartItem }>(`${this.apiCart}.json`).pipe(
      map((response) => {
        // Ищем товар с указанным id и userId
        const itemKey = Object.keys(response).find(key => String(response[key].id) === String(id) && response[key].userId.toString() === userId);
        if (itemKey) {
          // Обновляем количество товара
          return this.http.patch<CartItem>(`${this.apiCart}/${itemKey}.json`, { quantity });
        } else {
          throw new Error('Товар с таким id и userId не найден');
        }
      }),
      switchMap((observable) => observable),  // Используем switchMap для обработки вложенного observable
      catchError((error) => {
        console.error('Ошибка при обновлении количества товара:', error);
        throw error;
      })
    );
  }

  // Удаляем товар из корзины
  deleteProduct(id: string, userId: string): Observable<void> {
    return this.http.get<{ [key: string]: CartItem }>(`${this.apiCart}.json`).pipe(
      map((response) => {
        // Ищем товар с указанным id и userId
        const itemKey = Object.keys(response).find(key => String(response[key].id) === String(id) && response[key].userId.toString() === userId);

        if (itemKey) {
          // Удаляем товар
          return this.http.delete<void>(`${this.apiCart}/${itemKey}.json`);
        } else {
          throw new Error('Товар с таким id и userId не найден');
        }
      }),
      switchMap((observable) => observable),  // Разворачиваем вложенное observable
      catchError((error) => {
        console.error('Ошибка при удалении товара:', error);
        throw error;
      })
    );
  }
}
