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

  getProduct(productWithUserId: any): Observable<CartItem[]> {
    return this.http.get<{ [key: string]: CartItem }>(`${this.apiCart}.json`).pipe(
      map((response) => {
        return response ? Object.values(response).filter(item => item.userId === productWithUserId.userId) : [];
      }),
      catchError((error) => {
        console.error('Error fetching cart items:', error);
        throw error;
      })
    );
  }

  createProduct(product: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiCart}.json`, product).pipe(
      catchError((error) => {
        console.error('Error adding product to cart:', error);
        throw error;
      })
    );
  }

  updateQuantity(id: string, userId: string, quantity: string): Observable<CartItem> {
    return this.http.get<{ [key: string]: CartItem }>(`${this.apiCart}.json`).pipe(
      map((response) => {
        const itemKey = Object.keys(response).find(key => String(response[key].id) === String(id) && response[key].userId.toString() === userId);
        if (itemKey) {
          return this.http.patch<CartItem>(`${this.apiCart}/${itemKey}.json`, { quantity });
        } else {
          throw new Error('Product with this id and userId not found');
        }
      }),
      switchMap((observable) => observable), 
      catchError((error) => {
        console.error('Error updating product quantity:', error);
        throw error;
      })
    );
  }

  deleteProduct(id: string, userId: string): Observable<void> {
    return this.http.get<{ [key: string]: CartItem }>(`${this.apiCart}.json`).pipe(
      map((response) => {
        const itemKey = Object.keys(response).find(key => String(response[key].id) === String(id) && response[key].userId.toString() === userId);

        if (itemKey) {
          return this.http.delete<void>(`${this.apiCart}/${itemKey}.json`);
        } else {
          throw new Error('Product with this id and userId not found');
        }
      }),
      switchMap((observable) => observable),  
      catchError((error) => {
        console.error('Error deleting product:', error);
        throw error;
      })
    );
  }
}
