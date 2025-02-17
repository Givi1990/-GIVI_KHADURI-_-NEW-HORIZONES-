import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../../../SERVICES/MAIN CONTENT/content.service';
import { CommonModule } from '@angular/common';
import { UserCartService } from '../../../SERVICES/USERCART/user-cart.service';
import { CartStateService } from '../../../SERVICES/SIGNAL-SERVICES/cart-state.service';

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
  userId!: number;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private contentService: ContentService,
    private userCartService: UserCartService,
    private cartState: CartStateService
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.getUserId();
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

  getParams() {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];  
      this.getProductDetailsData();    
    });
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
  
    const productWithUserId = { ...product, userId: this.userId, quantity: 1 };
  
    this.userCartService.createProduct(productWithUserId).subscribe(
      (response) => {
        console.log('Product added to cart:', response);
        this.cartState.addItem(productWithUserId);
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }
  
  goBack() {
    this.router.navigate(['/']); 
  }
}
