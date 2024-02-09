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

  constructor(private authService: AuthService) {
    // Calculate yesterday's date
    const today = new Date();
    this.yesterday = new Date(today);
    this.yesterday.setDate(today.getDate() - 1);
    // this.getAdvanceDataSum()
  }
  ngOnInit(){
    this.fetchMainProductsAdvance();
  }
  

  toggleProducts(category: string): void {
    this.expandedProducts[category] = !this.expandedProducts[category];
  }

  isExpanded(category: string): boolean {
    return this.expandedProducts[category];
  }

  // getAdvanceDataSum(){
  //   this.authService.getAdvanceDataSum().subscribe(
  //     {
  //       next:data=>{
  //         console.log(data)
  //       }
  //     }
  //   )
  // }

  fetchMainProductsAdvance() {
    this.authService.getAdvanceSum().subscribe(
      (data: any) => {
        this.mainProductAdvanceSum = data;
      },
      (error: any) => {
        console.error('Error fetching customer sum:', error);
      }
    );
  }


}
