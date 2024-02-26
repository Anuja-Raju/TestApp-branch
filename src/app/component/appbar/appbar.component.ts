import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css'] // Corrected property name to styleUrls
})
export class AppbarComponent {

  constructor(private router: Router) {}
  
  logout() {
    this.router.navigate(['/login']);
  }

}
