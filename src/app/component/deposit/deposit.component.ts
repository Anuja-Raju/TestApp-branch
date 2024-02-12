import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent {
  yesterday: Date;
  expandedProducts: { [key: string]: boolean } = {};
  mainProductDepositSum: any;
  subProductDepositSum: any;

  constructor(private router: Router, private authService: AuthService) {
    // Calculate yesterday's date
    const today = new Date();
    this.yesterday = new Date(today);
    this.yesterday.setDate(today.getDate() - 1);
  }
  ngOnInit(){
    this.fetchDepositSum();
    this.fetchSubDepositSumQuery();
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

  fetchDepositSum() {
    this.authService.getDepositSum().subscribe(
      (data: any) => {
        this.mainProductDepositSum = data;
      },
      (error: any) => {
        console.error('Error fetching products sum:', error);
      }
    );
  }

  fetchSubDepositSumQuery() {
    this.authService.getSubDepositSumQuery().subscribe(
      (data: any) => {
        this.subProductDepositSum = data;
      },
      (error: any) => {
        console.error('Error fetching sub products sum:', error);
      }
    );
  }
}
