import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../../INTERFACE/user';
import { CommonModule } from '@angular/common';
import { UserCartService } from '../../../../SERVICES/USERCART/user-cart.service';
import { CartItem } from '../../../../INTERFACE/user-cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
  user: User | null = null;
  cartArray: CartItem[] = [];
  private cartSubscription: Subscription = new Subscription();

  constructor(private userCartService: UserCartService) {}

  ngOnInit(): void {
    this.getUser();
    this.getCart();  
  }

  totalPrice(): number {
    return this.cartArray.reduce((total, item) => total + (item.price * item.quantity), 0);  
  }

  getUser() {
    const userInfo = sessionStorage.getItem("user");
    if (userInfo) {
      this.user = JSON.parse(userInfo);
    } else {
      this.user = null;
    }
  }

  getCart() {
    if (this.user) {
      this.cartSubscription = this.userCartService.getProduct({ userId: this.user.userId }).subscribe(
        (data: CartItem[]) => {
          this.cartArray = data;
        },
        (error) => {
          console.error('Ошибка при получении данных корзины', error);
        }
      );
    }
  }

  // Update updateQuantity method:
updateQuantity(item: CartItem, event: Event): void {
  const input = event.target as HTMLInputElement;
  const updatedQuantity = Number(input.value);

  if (updatedQuantity > 0 && !isNaN(updatedQuantity)) {
    item.quantity = updatedQuantity;

    // Pass updatedQuantity as a string
    this.userCartService.updateQuantity(item.id, item.userId.toString(), updatedQuantity.toString()).subscribe(
      (response) => {
        console.log('Количество товара обновлено:', response);
      },
      (error) => {
        console.error('Ошибка при обновлении товара:', error);
      }
    );
  } else {
    console.error('Некорректное количество');
  }
}

// Update removeUserItem method:
removeUserItem(id: string): void {
  if (!this.user) {
    console.error('Пользователь не авторизован.');
    return;
  }

  const itemToRemove = this.cartArray.find(item => item.id === id && item.userId === this.user?.userId);

  if (itemToRemove) {
    // Pass itemToRemove.userId as string (which is already the correct type)
    this.userCartService.deleteProduct(itemToRemove.id, itemToRemove.userId.toString()).subscribe(
      () => {
        console.log('Товар удален из корзины');
        this.cartArray = this.cartArray.filter(item => item.id !== id);
      },
      (error) => {
        console.error('Ошибка при удалении товара из корзины:', error);
      }
    );
  } else {
    console.error('Товар не найден или не принадлежит текущему пользователю.');
  }
}


  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
