import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../SERVICES/MAIN CONTENT/content.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements OnInit { 

  mainContentData: any[] = []; 
  categoriesData: any[] = [];

  constructor(
    private contentService: ContentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchData(this.contentService);
    // this.fetchData(this.contentService, 'categoriesData');
  }

  fetchData(service: any) {
    service.getProduct().subscribe(
      (data: any[]) => {
        this.mainContentData = data
        console.log("Data:", data);
      },
      (error: any) => {
        console.error("Error fetching :", error);
      }
    );
  }


  navigateToProductDetails(productId: number) {
    const product = this.mainContentData.find(item => item.id === productId);
    if (product) {
      this.router.navigate(['/product', productId], { state: { product: product } }); 
    }
  }
  
}
