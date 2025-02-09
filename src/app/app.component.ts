import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './COMPONENTS/HEADER/NAV/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './COMPONENTS/HEADER/NAV/SEARCH/search/search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent,
    CommonModule,
    SearchComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  title = 'MY-GITA-PROJECT';


  
}
