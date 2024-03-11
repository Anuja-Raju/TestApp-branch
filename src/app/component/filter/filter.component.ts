import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'] // Corrected styleUrl to styleUrls
})
export class FilterComponent implements OnInit {

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

  ngOnInit(): void {
    this.fetchBranchData();
    this.applyFilters(); // Call applyFilters() on component initialization
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
