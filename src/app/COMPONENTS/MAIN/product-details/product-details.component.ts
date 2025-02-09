import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../../../SERVICES/MAIN CONTENT/content.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  
  productDetails: any = {}; 
  productId!: number;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private contentService: ContentService  
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];  
      this.getProductDetailsData();    
    });
  }

 
  getProductDetailsData() {
    this.contentService.getProductById(this.productId).subscribe(
      (product) => {
        this.productDetails = product;  
        console.log('Product Details:', this.productDetails);
      },
      (error) => {
        console.error('Error fetching product:', error);  
      }
    );
  }


  addToCart(product: any) {
    console.log('Product added to cart:', product);
  }
  

  goBack() {
    this.router.navigate(['/']);  // Навигация на главную страницу
  }
}
