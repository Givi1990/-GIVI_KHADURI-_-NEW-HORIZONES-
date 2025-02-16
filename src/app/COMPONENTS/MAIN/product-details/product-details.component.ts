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
<<<<<<< HEAD
  productDetails: any = {};  
=======
  
  productDetails: any = {}; 
>>>>>>> c4d982e97cf7668da421c176dfecd0d6cb292157
  productId!: number;
  userId!: number;
  successMessage: string = '';

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
<<<<<<< HEAD
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
=======
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
>>>>>>> c4d982e97cf7668da421c176dfecd0d6cb292157
        console.log('Product Details:', this.productDetails);
      },
      (error) => {
        console.error('Error fetching product:', error);  
      }
    );
  }

<<<<<<< HEAD
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
=======
>>>>>>> c4d982e97cf7668da421c176dfecd0d6cb292157

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
        this.successMessage = 'Product successfully added to cart!';  // Success message
      },
      (error) => {
        console.error('Error adding product to cart:', error);
        this.successMessage = 'Error adding product to cart. Please try again.';  // Error message
      }
    );
  }
  
<<<<<<< HEAD
  goBack() {
    this.router.navigate(['/']); 
=======

  goBack() {
    this.router.navigate(['/']);  
>>>>>>> c4d982e97cf7668da421c176dfecd0d6cb292157
  }
}
