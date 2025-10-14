import { Component,EventEmitter,Input,Output } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-year-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './year-view.html',
  styleUrl: './year-view.css'
})
export class YearView {
 @Input() year!: number;
  @Output() monthSelected = new EventEmitter<number>();

  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  selectMonth(monthIndex: number) {
    this.monthSelected.emit(monthIndex);
  }
}
