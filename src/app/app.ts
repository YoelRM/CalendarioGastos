import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { YearView } from './year-view/year-view';
import { MonthView } from './month-view/month-view';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, YearView, MonthView],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
   currentView: 'year' | 'month' = 'year';
  selectedYear = 2025;
  selectedMonth = 0; // Enero por defecto

  showMonth(month: number) {
    this.selectedMonth = month;
    this.currentView = 'month';
  }

  showYear() {
    this.currentView = 'year';
  }
}
