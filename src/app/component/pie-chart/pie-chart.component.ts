import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements AfterViewInit {

  @ViewChild('pieChartCanvas')
  pieChartCanvas!: ElementRef;

  ngAfterViewInit() {
    this.drawPieChart();
  }

  drawPieChart() {
    const canvas = this.pieChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    const data = [30, 40, 20, 10]; // Example data for the pie chart
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']; // Example colors for the pie chart
    const total = data.reduce((acc, value) => acc + value, 0);
    let startAngle = 0;

    for (let i = 0; i < data.length; i++) {
      const sliceAngle = (2 * Math.PI * data[i]) / total;
      ctx.fillStyle = colors[i];
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();
      startAngle += sliceAngle;
    }
  }

}
