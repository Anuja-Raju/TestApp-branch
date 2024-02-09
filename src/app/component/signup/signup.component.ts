// signup.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  selectedUserType: string = '';
  userId: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  submit() {
    // Check if values are entered
    if (!this.selectedUserType || !this.userId || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    // Reset error message
    this.errorMessage = '';

    // Assuming AuthService.Signup returns an observable
    this.authService.Signup({
      "user_id": this.userId,
      "password": this.password,
      "confirm_password": this.confirmPassword,
      "user_type": this.selectedUserType
    }).subscribe({
      next: data => {
        console.log('User Type:', this.selectedUserType);
        console.log('User ID:', this.userId);
        console.log('Password:', this.password);
        console.log('Confirm Password:', this.confirmPassword);
        console.log('Signup successful:', data);

        // You can perform additional actions after successful signup if needed

        // For example, navigate to the login page
        this.navigateToLogin();
      },
      error: err => {
        console.error('Signup failed:', err);

        // Handle specific error cases if needed
        if (err.status === 400) {
          this.errorMessage = 'User already exists or passwords do not match';
        } else {
          this.errorMessage = 'Signup failed. Please try again.';
        }
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
