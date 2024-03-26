import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {
  photos: { url: string }[] = [
    { url: 'assets/esaf.png' },
    { url: 'assets/esaf1.png' },
    { url: 'assets/esaf2.png' },
    { url: 'assets/esaf3.png' }
  ];
  currentIndex = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.showNextSlide();
    }, 3000); 
  }

  showNextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
  }
}
