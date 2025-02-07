import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegistrationService } from '../../../../SERVICES/LOGIN-REGISTRATION/login-registration.service';
import { UserLogin } from '../../../../INTERFACE/login.interfece';
import { UserRegistration } from '../../../../INTERFACE/registation.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-registration',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login-registration.component.html',
  styleUrl: './login-registration.component.scss'
})
export class LoginRegistrationComponent {
  toggleFormVar: boolean = true;

  loginData: UserLogin = {
    email: '',
    password: ''
  };

  registerData = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '' 
  };

  constructor(
    private userService: LoginRegistrationService,
    private router: Router,
  ) {}

  toggleForm() {
    this.toggleFormVar = !this.toggleFormVar;
  }

  // Вход
  onLogin() {
    this.userService.loginUser(this.loginData).subscribe(
      (user) => {
        if (user) {
          console.log("Login successful", user);
          sessionStorage.setItem('user', JSON.stringify(user)); 
          sessionStorage.setItem('isLogin', JSON.stringify(true));
          this.router.navigate(['/']);
          setTimeout(() => window.location.reload(), 200);
        } else {
          alert("Invalid email or password!");
        }
      },
      (error) => {
        console.error("Login failed", error);
      }
    );
  }

  // Регистрация
  onRegister() {
    if (!this.registerData.userName || !this.registerData.email || !this.registerData.password || !this.registerData.confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    this.userService.checkUserExists(this.registerData.email).subscribe(
      (exists) => {
        if (exists) {
          alert("User with this email already exists!");
        } else {
          const newUser: UserRegistration = {
            userName: this.registerData.userName,
            email: this.registerData.email,
            password: this.registerData.password,
            isAdmin: false, 
            registrationDate: new Date(),
            userId: 0 
          };

          this.userService.registerUser(newUser).subscribe(
            (response) => {
              console.log("Registration successful", response);
              this.autoLogin(newUser.email, newUser.password);
            },
            (error) => {
              console.error("Registration failed", error);
            }
          );
        }
      },
      (error) => {
        console.error("Error checking user", error);
      }
    );
  }

  // Автоматический вход после регистрации
  private autoLogin(email: string, password: string) {
    this.userService.loginUser({ email, password }).subscribe(
      (user) => {
        if (user) {
          console.log("Auto-login successful", user);
          sessionStorage.setItem('user', JSON.stringify(user)); 
          sessionStorage.setItem('isLogin', JSON.stringify(true));
          this.router.navigate(['/']);
          setTimeout(() => window.location.reload(), 200);
        } else {
          alert("Auto-login failed!");
        }
      },
      (error) => {
        console.error("Auto-login error", error);
      }
    );
  }
}
