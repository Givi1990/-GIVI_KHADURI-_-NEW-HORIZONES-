import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { RouterModule, Router } from '@angular/router';
=======
import { RouterModule, Router } from '@angular/router'; 
>>>>>>> c4d982e97cf7668da421c176dfecd0d6cb292157
import { ContentService } from '../../../../../SERVICES/MAIN CONTENT/content.service';
import { CartStateService } from '../../../../../SERVICES/SIGNAL-SERVICES/cart-state.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';

  constructor(
    private contentService: ContentService, 
    private router: Router,
    private cartStateService: CartStateService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  // Геттер для отображения количества товаров в корзине
  get cartItems(): number {
    return this.cartStateService.cartCount();
  }

  navigateToProductDetails(productId: number): void {
    const product = this.products.find(item => item.id === productId);
    if (product) {
      this.router.navigate(['/product', productId], { state: { product: product } });
      this.searchTerm = '';
    }
  }

  fetchProducts(): void {
    this.contentService.getProduct().subscribe(
      (data: any[]) => {
        this.products = data;
<<<<<<< HEAD
        this.filteredProducts = data;  // Изначально показываем все товары
=======
        this.filteredProducts = data;  
        console.log('Fetched products:', data);
>>>>>>> c4d982e97cf7668da421c176dfecd0d6cb292157
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      this.filteredProducts = this.products.filter(product => 
        product.title.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
}
