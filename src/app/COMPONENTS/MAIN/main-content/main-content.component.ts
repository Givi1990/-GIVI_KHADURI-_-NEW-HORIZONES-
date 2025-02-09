import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../SERVICES/MAIN CONTENT/content.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CurrencyConverterPipe } from '../../../PIPES/currency-converter.pipe'; 

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
  selectedCurrency: string = 'USD'

  constructor(
    private contentService: ContentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchData(this.contentService);
  }

  fetchData(service: any) {
    service.getProduct().subscribe(
      (data: any[]) => {
        this.mainContentData = data;
        console.log("Data:", data);
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

 
}
