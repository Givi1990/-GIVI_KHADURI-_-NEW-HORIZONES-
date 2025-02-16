import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit, OnChanges {
  isLogin: boolean = false;

  constructor(
    private router: Router,
  ) {} 


  ngOnInit() {
    this.isLoginCheck();
  }

  ngOnChanges() {}

  navigateToSignUp() {
    this.router.navigate(['/signup']); 
  }

  logout() {
      sessionStorage.removeItem('user'); 
      sessionStorage.removeItem('isLogin'); 
      this.router.navigate(['/']); 
      setInterval(()=> window.location.reload(), 200);
  }
  

  navigateToUserPage() {
    if(sessionStorage.getItem('user')){
      this.router.navigate(['/user-page']);
    } else {
      alert("Please Sing Up firth!");
      this.router.navigate(['/signup']); 
    }
  }

  navigateToMainPage(){
    this.router.navigate(['/']);
  }


  isLoginCheck() {
    if(sessionStorage.getItem('isLogin') == "true"){
      this.isLogin = true;
    }
  }
}
