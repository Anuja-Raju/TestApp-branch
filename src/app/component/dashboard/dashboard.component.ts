// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedOption: string = '';
  today: string = '';
  totalDepositAmount: number = 0; // Example value, replace with actual data
  totalAdvanceAmount: number = 0; // Example value, replace with actual data
  totalBusinessAmount: number = 0; // Example value, replace with actual data
  filterText: string = ''; // property to store filter text
  

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.updateDate();

    // Fetch total deposit and total advance amounts
    this.authService.getTotalDeposit().subscribe(
      (      data: { deposit_total: number; }[]) => {
        this.totalDepositAmount = data[0].deposit_total;
      },
      (      error: any) => {
        console.error('Error fetching total deposit:', error);
      }
    );

    this.authService.getTotalAdvance().subscribe(
      (      data: { advance_total: number; }[]) => {
        this.totalAdvanceAmount = data[0].advance_total;
      },
      (      error: any) => {
        console.error('Error fetching total advance:', error);
      }
    );

    this.authService.getTotalDeposit().subscribe(
      (data: { deposit_total: number }[]) => {
        this.totalDepositAmount = data[0].deposit_total;
    
        // After fetching total deposit, fetch total advance
        this.authService.getTotalAdvance().subscribe(
          (advanceData: { advance_total: number }[]) => {
            this.totalAdvanceAmount = advanceData[0].advance_total;
    
            // Calculate totalBusinessAmount
            this.totalBusinessAmount = this.totalDepositAmount + this.totalAdvanceAmount;
          },
          (advanceError: any) => {
            console.error('Error fetching total advance:', advanceError);
          }
        );
      },
      (error: any) => {
        console.error('Error fetching total deposit:', error);
      }
    );

    // Update the date every day at midnight
    setInterval(() => {
      this.updateDate();
    }, 86400000); // 24 hours in milliseconds
  }
  updateDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const options = { month: 'long', day: 'numeric', year: 'numeric' } as Intl.DateTimeFormatOptions;
    this.today = yesterday.toLocaleDateString('en-US', options);
  }

  onSelectChange(): void {
    console.log('Selected Option:', this.selectedOption);
    if (this.selectedOption === 'deposit') {
      console.log('Navigating to deposit');
      this.router.navigate(['/deposit']);
    }
    if (this.selectedOption === 'advance') {
      console.log('Navigating to advance');
      this.router.navigate(['/advance']);
    }
    // Handle other options if needed
  }

  onFilterInputChange(): void {
    // Implement your logic to filter based on the input
    // For example, you can filter an array of items or perform an API request with the filterText
    console.log('Filter Text:', this.filterText);
    // Implement your logic here to filter or search based on this.filterText
  }
  
}

