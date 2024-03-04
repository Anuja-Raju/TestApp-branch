// Import necessary modules and services
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Define necessary variables
  selectedOption: string = '';
  today: string = '';
  totalDepositAmount: number = 0;
  totalAdvanceAmount: number = 0;
  totalBusinessAmount: number = 0;
  branchName: string = '';
  filteredAdvanceData: any[] = [];
  currentTab: string = 'dailySnapshot';
  branchData: any[] = [];
  branchKeys: string[] = [];
  displayedColumns: string[] = ['BRANCH_NAME','PRODUCT_GRPING','PROD_TYP_DESC', 'OS_FTD', 'CNT_FTD']; // Define columns to display in the table
  productFilter: string = ''; 
  branchIdFilter: string = ''; 
  filteredDataMessage!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.updateDate();
    this.fetchBranchData();
    // Fetch total deposit and total advance amounts
    this.authService.getTotalDeposit().subscribe(
      (data: { deposit_total: number; }[]) => {
        this.totalDepositAmount = data[0].deposit_total;
      },
      (error: any) => {
        console.error('Error fetching total deposit:', error);
      }
    );

    this.authService.getTotalAdvance().subscribe(
      (data: { advance_total: number; }[]) => {
        this.totalAdvanceAmount = data[0].advance_total;
      },
      (error: any) => {
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

  // Function to handle applying filters
  applyFilters(): void {
    const filters = {
      branchName: this.branchName,
      branchId: this.branchIdFilter,
      product: this.productFilter
    };

    this.authService.filteredAdvanceData(filters).subscribe(
      (data: any[]) => {
        this.filteredAdvanceData = data; 
        this.filteredDataMessage = data.length === 0 ? 'No data found.' : '';
      },
      (error: any) => {
        console.error('Error applying filters:', error);
        // Handle error
      }
    );
  }

  // Function to open navigation sidebar
  openNav() {
    const sidenav = document.getElementById("mySidenav");
    if (sidenav) {
      sidenav.style.width = "250px";
    }
  }

  // Function to close navigation sidebar
  closeNav() {
    const sidenav = document.getElementById("mySidenav");
    if (sidenav) {
      sidenav.style.width = "0";
    }
  }

  // Function to logout
  logout() {
    this.router.navigate(['/login']);
  }

  // Function to navigate to dashboard
  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  // Function to switch tabs
  openTab(event: Event, tabName: string) {
    this.currentTab = tabName;
  }

  // Function to fetch mock branch data
  fetchBranchData() {
    // Mocking branch data
    this.branchData = [
      // Your branch data here
    ];

    // Extracting keys dynamically
    if (this.branchData.length > 0) {
      this.branchKeys = Object.keys(this.branchData[0]);
    }
  }
}