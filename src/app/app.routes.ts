import { Routes } from '@angular/router';
import { MainContentComponent } from './COMPONENTS/MAIN/main-content/main-content.component';

export const routes: Routes = [
  {
    path: '', 
    component: MainContentComponent
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./COMPONENTS/MAIN/product-details/product-details.component')
      .then(m => m.ProductDetailsComponent) 
  },
  {
    path: 'signup',  
    loadComponent: () => import('./COMPONENTS/HEADER/NAV/login-registration/login-registration.component')
      .then(m => m.LoginRegistrationComponent) 
  },
  {
    path: 'user-page',  
    loadComponent: () => import('./COMPONENTS/MAIN/USERPAGE/user-page/user-page.component')
      .then(m => m.UserPageComponent) 
  }


  
];
