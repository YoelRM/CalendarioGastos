import { Component,EventEmitter,OnChanges,Input,Output,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPanel } from '../details-panel/details-panel';
import { Movement, Movement as MovementService } from '../movement';


interface Day {
  dayOfMonth: number;
  dateString: string;
  isCurrentMonth: boolean;
  balance: number | null;
}

@Component({
  selector: 'app-month-view',
  standalone: true,
  imports: [CommonModule, DetailsPanel],
  templateUrl: './month-view.html',
  styleUrl: './month-view.css'
})
export class MonthView implements OnChanges {
  @Input() year!: number;
  @Input() month!: number;
  @Output() backToYear = new EventEmitter<void>();

  monthName = '';
  calendarDays: Day[] = [];
  selectedDate = signal<string | null>(null);

  private monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  constructor(private movementService: MovementService) {}

  ngOnChanges(): void {
    this.generateCalendar();
  }

  generateCalendar() {
    this.monthName = this.monthNames[this.month];
    this.calendarDays = [];
    const firstDay = new Date(this.year, this.month, 1).getDay();
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    const startOffset = (firstDay === 0) ? 6 : firstDay - 1;

    for (let i = 0; i < startOffset; i++) {
      this.calendarDays.push({ dayOfMonth: 0, dateString: '', isCurrentMonth: false, balance: null });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${this.year}-${this.month + 1}-${day}`;
      const movements = this.movementService.getMovementsForDay(dateString);
      let balance: number | null = null;
      if (movements.length > 0) {
        const income = movements.filter(m => m.type === 'income').reduce((sum, m) => sum + m.amount, 0);
        const expense = movements.filter(m => m.type === 'expense').reduce((sum, m) => sum + m.amount, 0);
        balance = income - expense;
      }
      this.calendarDays.push({ dayOfMonth: day, dateString, isCurrentMonth: true, balance });
    }
  }

  selectDay(day: Day) {
    if (day.isCurrentMonth) {
      this.selectedDate.set(day.dateString); // Usamos .set() para actualizar la señal
    }
  }

  goBack() {
    this.backToYear.emit();
  }
}
