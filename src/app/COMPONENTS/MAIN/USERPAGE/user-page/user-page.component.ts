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
          console.error('Error fetching cart data', error);
        }
      );
    }
  }

  updateQuantity(item: CartItem, event: Event): void {
    const input = event.target as HTMLInputElement;
    const updatedQuantity = Number(input.value);

    if (updatedQuantity > 0 && !isNaN(updatedQuantity)) {
      item.quantity = updatedQuantity;

      this.userCartService.updateQuantity(item.id, item.userId.toString(), updatedQuantity.toString()).subscribe(
        (response) => {
          console.log('Item quantity updated:', response);
        },
        (error) => {
          console.error('Error updating item:', error);
        }
      );
    } else {
      console.error('Invalid quantity');
    }
  }

  removeUserItem(id: string): void {
    if (!this.user) {
      console.error('User is not authenticated.');
      return;
    }

    const itemToRemove = this.cartArray.find(item => item.id === id && item.userId === this.user?.userId);

    if (itemToRemove) {
      this.userCartService.deleteProduct(itemToRemove.id, itemToRemove.userId.toString()).subscribe(
        () => {
          console.log('Item removed from cart');
          this.cartArray = this.cartArray.filter(item => item.id !== id);
        },
        (error) => {
          console.error('Error removing item from cart:', error);
        }
      );
    } else {
      console.error('Item not found or does not belong to the current user.');
    }
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
