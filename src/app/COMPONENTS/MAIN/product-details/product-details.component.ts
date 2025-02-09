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
  
  productDetails: any = {};  // Для хранения данных продукта
  productId!: number;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private contentService: ContentService  // Сервис для получения данных о продукте
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];  // Получаем ID из параметров маршрута
      this.getProductDetailsData();    // Загружаем данные о продукте
    });
  }

  // Метод для получения данных о продукте с API
  getProductDetailsData() {
    this.contentService.getProductById(this.productId).subscribe(
      (product) => {
        this.productDetails = product;  // Устанавливаем данные продукта
        console.log('Product Details:', this.productDetails);
      },
      (error) => {
        console.error('Error fetching product:', error);  // Обработка ошибок
      }
    );
  }

  // Добавление товара в корзину
  addToCart(product: any) {
    console.log('Product added to cart:', product);
  }
  
  // Возврат на предыдущую страницу
  goBack() {
    this.router.navigate(['/']);  // Навигация на главную страницу
  }
}
