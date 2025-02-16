import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../SERVICES/MAIN CONTENT/content.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CurrencyConverterPipe } from '../../../PIPES/currency-converter.pipe'; 
import { UserCartService } from '../../../SERVICES/USERCART/user-cart.service';
import { CartStateService } from '../../../SERVICES/SIGNAL-SERVICES/cart-state.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, CurrencyConverterPipe],  
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements OnInit {
  mainContentData: any[] = [];
  categoriesData: any[] = [];
  selectedCurrency: string = 'USD';
  userId!: number;

  constructor(
    private contentService: ContentService,
    private router: Router,
    private userCartService: UserCartService,
    private cartState: CartStateService
  ) {}

  ngOnInit() {
    this.fetchData();
    this.getUserId();
  }

  fetchData() {
    this.contentService.getProduct().subscribe(
      (data: any[]) => {
        this.mainContentData = data;
      },
      (error: any) => {
        console.error("Error fetching:", error);
      }
    );
  }

  navigateToProductDetails(productId: number) {
    const product = this.mainContentData.find(item => item.id === productId);
    if (product) {
      this.router.navigate(['/product', productId], { state: { product: product } });
    }
  }

  toggleCurrency(event: any) {
    this.selectedCurrency = event.target.checked ? 'GEL' : 'USD'; 
    console.log(this.selectedCurrency);
  }

  getUserId() {
    const userInfo = sessionStorage.getItem("user");
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      this.userId = parsedUserInfo.userId;
      console.log('User ID:', this.userId);
    } else {
      console.error('No user info found in session storage.');
    }
  }

  addToCart(product: any) {
    if (!this.userId) {
      console.error('User ID is not available. Please log in.');
      return;
    }

    // Добавляем quantity:1 и userId в объект товара
    const productWithUserId = { ...product, userId: this.userId, quantity: 1 };

    // Отправляем запрос на добавление товара в удалённую базу
    this.userCartService.createProduct(productWithUserId).subscribe(
      (response) => {
        console.log('Product added to cart:', response);
        // После успешного добавления обновляем локальное состояние корзины через сигнал
        this.cartState.addItem(productWithUserId);
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }
}
