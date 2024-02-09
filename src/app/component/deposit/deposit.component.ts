import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent {
  yesterday: Date;
  expandedProducts: { [key: string]: boolean } = {};

  constructor(private router: Router) {
    // Calculate yesterday's date
    const today = new Date();
    this.yesterday = new Date(today);
    this.yesterday.setDate(today.getDate() - 1);
  }

  toggleProducts(category: string): void {
    this.expandedProducts[category] = !this.expandedProducts[category];
  }

  isExpanded(category: string): boolean {
    return this.expandedProducts[category];
  }

  goToDashboard(): void {
    // Use the router to navigate back to the dashboard
    this.router.navigate(['/dashboard']); // Replace '/dashboard' with the actual route for your dashboard
  }
}
