import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../SERVICES/MAIN CONTENT/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  
  productDetails: any = {};  

  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProductDetailsData();
  }

  getProductDetailsData() {
    const product = history.state.product;
    if (product) {
      this.productDetails = product;
      console.log('Product Details:', this.productDetails);
    } else {
      console.error('No product data available');
    }
  }
  

  addToCart(product: any) {
    console.log('Product added to cart:', product);
  }
  
  goBack() {
    this.router.navigate(['/']); 
  }

}