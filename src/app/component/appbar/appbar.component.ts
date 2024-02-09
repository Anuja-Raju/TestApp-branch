import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrl: './appbar.component.css'
})
export class AppbarComponent {

   
  constructor(private router: Router) {}

  logout() {
    // Perform any additional logout logic if needed
    // For now, simply navigate to the login page
    this.router.navigate(['/login']);
  }
}
