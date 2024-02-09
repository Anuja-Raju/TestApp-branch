// login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userId: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';
  captchaLength: number = 6;
  captchaImage: string = '';
  enteredCaptcha: string = '';

  constructor(private router: Router, private authService: AuthService) {
    this.refreshCaptcha();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  login(){
    this.router.navigate(['/dashboard']);
  }

 
  // login() {
  //   // Add validation logic here
  //    if (!this.userId || !this.password || !this.enteredCaptcha) {
  //     this.errorMessage = 'Please fill in all fields.';
  //     return;
  //   }

  //   // Validate the captcha
  //   if (this.enteredCaptcha.toLowerCase() !== this.captchaImage.toLowerCase()) {
  //     this.errorMessage = 'Incorrect captcha. Please try again.';
  //     return;
  //   }

  //   // Your login logic here
  //   this.authService.Login({
  //     "user_id": this.userId,
  //     "password": this.password,
  //     // Other fields if needed
  //   }).subscribe({
  //     next: data => {
  //       console.log('Login successful:', data);
  //       // Navigate to the dashboard after successful login
  //       this.router.navigate(['/dashboard']);
  //     },
  //     error: err => {
  //       console.error('Login failed:', err);
  //       // Handle login error, display error message if needed
  //       this.errorMessage = 'Invalid credentials. Please try again.';
  //     },
  //   });
  // }

  validateCaptcha(): boolean {
    return this.enteredCaptcha.toLowerCase() === this.captchaImage.toLowerCase();
  }

  refreshCaptcha() {
    this.captchaImage = this.generateCaptchaCode(this.captchaLength);
    this.enteredCaptcha = '';
  }

  generateCaptchaCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      captcha += characters[index];
    }
    return captcha;
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}