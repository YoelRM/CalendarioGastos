import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { YearView } from './year-view/year-view';
import { MonthView } from './month-view/month-view';


@Component ({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, YearView, MonthView],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
   currentView: 'year' | 'month' = 'year';
  selectedYear = 2025;
  selectedMonth = 0; // Enero por defecto

  isDarkMode = false;

  ngOnInit(): void {
    // Intenta cargar el tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-theme');
    } else {
      this.isDarkMode = false;
      document.body.classList.remove('dark-theme');
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme', this.isDarkMode);

    // Guarda la preferencia en localStorage
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  showMonth(month: number) {
    this.selectedMonth = month;
    this.currentView = 'month';
  }

  showYear() {
    this.currentView = 'year';
  }
}
