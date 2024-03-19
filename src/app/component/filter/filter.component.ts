import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  branchCheckbox: boolean = false;
  branchName: string = '';
  filteredAdvanceData: any[] = [];
  currentTab: string = 'dailySnapshot';
  branchData: any[] = [];
  branchKeys: string[] = [];
  displayedColumns: string[] = ['BRANCH_NAME','PRODUCT_GRPING','PROD_TYP_DESC', 'OS_FTD', 'CNT_FTD'];
  productFilter: string = ''; 
  branchIdFilter: string = ''; 
  filteredDataMessage!: string;
  allBranches: string[] = [];
  filteredBranches: string[] = [];
  allBranchIds: string[] = [];
  filteredBranchIds: string[] = [];
  filteredProducts: string[] = [];
  allProducts:string[] = [];

  @Output() filterChanged = new EventEmitter<string>();
 
 
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.fetchBranchData(); 
    this.getBranchNames(); 
    this.getBranchIds();
    this.getProducts();
    this.applyFilters();
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

  // Function to fetch branch names from the backend
  getBranchNames(): void {
    this.authService.getBranchNames().subscribe(
      (branches: string[]) => {
        this.allBranches = branches;
        this.filteredBranches = branches.slice(); // Initially, show all branches
      },
      (error: any) => {
        console.error('Error fetching branch names:', error);
        // Handle error
      }
    );
  }

  // Function to filter branches based on user input
  filterBranches(): void {
    if (this.branchName.trim() === '') {
      this.filteredBranches = [];
    } else {
      this.filteredBranches = this.allBranches.filter(branch => branch.toLowerCase().includes(this.branchName.toLowerCase()));
    }
  }

  // Function to handle filter change
  onFilterChange(selectedBranch: string): void {
    this.branchName = selectedBranch;
    this.filterBranches();
    this.filterChanged.emit(selectedBranch);

  }


  getBranchIds(): void {
    this.authService.getBranchIds().subscribe(
      (branchIds: string[]) => {
        this.allBranchIds = branchIds;
        this.filteredBranchIds = branchIds.slice(); // Initially, show all branch IDs
      },
      (error: any) => {
        console.error('Error fetching branch IDs:', error);
        // Handle error
      }
    );
  }
  
  // Function to filter branch IDs based on user input
  filterBranchIds(): void {
    if (this.branchIdFilter.trim() === '') {
      this.filteredBranchIds = [];
    } else {
      this.filteredBranchIds = this.allBranchIds.filter(branchId =>
        branchId.toLowerCase().startsWith(this.branchIdFilter.toLowerCase())
      );
    }
  }
  // Function to handle branch ID filter change
  onBranchIdFilterChange(selectedBranchId: string): void {
    this.branchIdFilter = selectedBranchId;
    this.filterBranchIds();
    this.filterChanged.emit(selectedBranchId);
  }

  getProducts(): void {
    this.authService.getProducts().subscribe(
      (products: string[]) => {
        this.allProducts = products;
        this.filteredProducts = products.slice(); 
      },
      (error: any) => {
        console.error('Error fetching products:', error);
        // Handle error
      }
    );
  }
  
  filterProducts(): void {
    if (this.productFilter.trim() === '') {
      this.filteredProducts = [];
    } else {
      this.filteredProducts = this.allProducts.filter((product: string) =>
        product.toLowerCase().includes(this.productFilter.toLowerCase())
      );
    }
  }
  
  onProductFilterChange(selectedProduct: string): void {
    this.productFilter = selectedProduct;
    this.filterProducts();
    this.filterChanged.emit(selectedProduct);
  }
  

}
