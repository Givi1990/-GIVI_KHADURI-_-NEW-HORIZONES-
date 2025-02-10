import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';  // Ensure Router is imported
import { ContentService } from '../../../../../SERVICES/MAIN CONTENT/content.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';

  constructor(
    private contentService: ContentService, 
    private router: Router  
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
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
        this.filteredProducts = data;  
        console.log('Fetched products:', data);
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
