import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  previousYear: Date = new Date(); // Initialize with some default value
  yesterday: Date = new Date(); // Initialize with some default value

  // Properties to store customer sums
  customerSum: any = {};
  customerSumPrevY: any = {};
  customerSumNew: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Update dates and fetch customer sums
    this.updateDates();
    this.fetchCustomerSum();
    this.fetchPrevCustomerSum();
    this.fetchNewCustomerSumQuery();

    // Add any other initialization logic you may have
  }

  updateDates() {
    const today = new Date();
    this.yesterday = new Date(today);
    this.yesterday.setDate(today.getDate() - 1);

    const previousYear = new Date(today);
    previousYear.setFullYear(today.getFullYear() - 1);
    this.previousYear = previousYear;
  }

  fetchCustomerSum() {
    // Call the service to fetch customer sums
    this.authService.getCustomerSum().subscribe(
      (data: any) => {
        this.customerSum = data;
      },
      (error: any) => {
        console.error('Error fetching customer sum:', error);
      }
    );
  }

  fetchPrevCustomerSum() {
    // Call the service to fetch customer sums for the PRE YEAR
    this.authService.getPrevCustomerSum().subscribe(
      (data: any) => {
        this.customerSumPrevY = data;
      },
      (error: any) => {
        console.error('Error fetching previous year customer sum:', error);
      }
    );
  }

  fetchNewCustomerSumQuery() {
    // Call the service to fetch customer sums for the PRE YEAR
    this.authService.getNewCustomerSumQuery().subscribe(
      (data: any) => {
        this.customerSumNew = data;
      },
      (error: any) => {
        console.error('Error fetching new customer sum of the year :', error);
      }
    );
  }

  // ... (other methods or properties)
}
