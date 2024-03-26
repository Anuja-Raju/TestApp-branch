import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrl: './advance.component.css'
})
export class AdvanceComponent implements OnInit{
  
  yesterday: Date;
  expandedProducts: { [key: string]: boolean } = {};
  mainProductAdvanceSum: any;
  subProductAdvanceSum: any;
  advanceProductNames: any;

  constructor(private authService: AuthService) {
    const today = new Date();
    this.yesterday = new Date(today);
    this.yesterday.setDate(today.getDate() - 1);
  }
  ngOnInit(){
    this.fetchMainProductsAdvance();
    this.fetchSubAdvanceSumQuery();
    this.fetchAdvanceProductNames();
  }
  
  toggleProducts(category: string): void {
    this.expandedProducts[category] = !this.expandedProducts[category];
  }

  isExpanded(category: string): boolean {
    return this.expandedProducts[category];
  }

  fetchMainProductsAdvance() {
    this.authService.getAdvanceSum().subscribe(
      (data: any) => {
        this.mainProductAdvanceSum = data;
      },
      (error: any) => {
        console.error('Error fetching products sum:', error);
      }
    );
  }

  fetchSubAdvanceSumQuery() {
    this.authService.getSubAdvanceSumQuery().subscribe(
      (data: any) => {
        this.subProductAdvanceSum = data;
      },
      (error: any) => {
        console.error('Error fetching sub products sum:', error);
      }
    );
  }

  fetchAdvanceProductNames() {
    this.authService.getAdvanceProductNames().subscribe(
      (data: any) => {
        this.advanceProductNames = data;
      },
      (error: any) => {
        console.error('Error fetching products name:', error);
      }
    );
  }
  
}
