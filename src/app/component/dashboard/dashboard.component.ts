// dashboard.component.ts
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
  selectedOption: string = '';
  today: string = '';
  totalDepositAmount: number = 0;
  totalAdvanceAmount: number = 0;
  totalBusinessAmount: number = 0;
  filterText: string = '';
  stateFilter: string = '';
  districtFilter: string = '';
  clusterFilter: string = '';
  branchFilter: string = '';
  branchIdFilter: string = '';
  productFilter: string = '';
  filteredDepositData: any[] = [];
  filteredAdvanceData: any[] = [];
  currentTab: string = 'dailySnapshot';

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.updateDate();

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
    console.log('Filter Text:', this.filterText);
    // Implement your logic here to filter or search based on this.filterText
  }

  applyFilters(): void {
    const filters = {
      branch: this.branchFilter,
      branchId: this.branchIdFilter,
      product: this.productFilter
    };

    this.http.post('/filteredAdvanceData', filters)
      .subscribe(
        (data: any) => {
          this.filteredAdvanceData = data;
        },
        (error: any) => {
          console.error('Error applying filters:', error);
        }
      );
  }

  openNav() {
    const sidenav = document.getElementById("mySidenav");
    if (sidenav) {
      sidenav.style.width = "250px";
    }
  }
  
  closeNav() {
    const sidenav = document.getElementById("mySidenav");
    if (sidenav) {
      sidenav.style.width = "0";
    }
  }
  
  logout() {
    this.router.navigate(['/login']);
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  openTab(event: Event, tabName: string) {
    this.currentTab = tabName;
  }
}
