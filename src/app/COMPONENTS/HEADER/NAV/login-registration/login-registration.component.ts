import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRegistrationService } from '../../../../SERVICES/LOGIN-REGISTRATION/login-registration.service';
import { UserLogin } from '../../../../INTERFACE/login.interfece';
import { UserRegistration } from '../../../../INTERFACE/registation.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-registration.component.html',
  styleUrl: './login-registration.component.scss' 
})
export class LoginRegistrationComponent {
  isLoginMode: boolean = false; 
  authForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: LoginRegistrationService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      userName: ['', Validators.required], 
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''] 
    });

    this.toggleMode();
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    
    if (this.isLoginMode) {
      this.authForm.removeControl('confirmPassword');
      this.authForm.removeControl('userEmail'); 

    } else {
      this.authForm.addControl('confirmPassword', this.fb.control('', Validators.required));
      this.authForm.addControl('userEmail', this.fb.control('', [Validators.required, Validators.email])); 
    }
  }
  

  onSubmit() {
    if (this.authForm.invalid) return;
  
    const { userName, password, confirmPassword, userEmail } = this.authForm.value;
  
    if (this.isLoginMode) {
      // login
      const loginData: UserLogin = { userName, password };
      this.userService.loginUser(loginData).subscribe(
        (user) => {
          if (user) {
            console.log("Login successful", user);
            sessionStorage.setItem('user', JSON.stringify(user)); 
            sessionStorage.setItem('isLogin', JSON.stringify(true));
            this.router.navigate(['/']);
            setTimeout(() => window.location.reload(), 200);
          } else {
            alert("Invalid username or password!");
          }
        },
        (error) => console.error("Login failed", error)
      );
    } else {
      // registration
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
  
      this.userService.checkUserExists(userName).subscribe(
        (exists) => {
          if (exists) {
            alert("User with this username already exists!");
          } else {
            const userId = this.generateUserId(userName);
            const newUser: UserRegistration = {
              userName,
              password,
              email: userEmail,
              isAdmin: false,
              registrationDate: new Date(),
              userId
            };
  
            this.userService.registerUser(newUser).subscribe(
              (response) => {
                console.log("Registration successful", response);
                this.autoLogin(userName, password);
              },
              (error) => console.error("Registration failed", error)
            );
          }
        },
        (error) => console.error("Error checking user", error)
      );
    }
  }
  
  private generateUserId(userName: string): number {
    const timestamp = Date.now();
    const nameHash = userName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return timestamp + nameHash;
  }
  

  private autoLogin(userName: string, password: string) {
    this.userService.loginUser({ userName, password }).subscribe(
      (user) => {
        if (user) {
          console.log("Auto-login successful", user);
          sessionStorage.setItem('user', JSON.stringify(user)); 
          sessionStorage.setItem('isLogin', JSON.stringify(true));
          this.router.navigate(['/']);
          // setTimeout(() => window.location.reload(), 200);
        } else {
          alert("Auto-login failed!");
        }
      },
      (error) => console.error("Auto-login error", error)
    );
  }
}
