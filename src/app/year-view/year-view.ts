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

  // Convertimos el array de strings a un array de objetos
  months = [
    { name: "Enero", icon: "assets/Enero.png" },
    { name: "Febrero", icon: "assets/Febrero.png" }, 
    { name: "Marzo", icon: "assets/Marzo.png" },
    { name: "Abril", icon: "assets/Abril.png" },
    { name: "Mayo", icon: "assets/Mayo.png" },
    { name: "Junio", icon: "assets/Junio.png" },
    { name: "Julio", icon: "assets/Julio.png" },
    { name: "Agosto", icon: "assets/Agosto.png" },
    { name: "Septiembre", icon: "assets/Septiembre.png" },
    { name: "Octubre", icon: "assets/Octubre.png" },
    { name: "Noviembre", icon: "assets/Noviembre.png" },
    { name: "Diciembre", icon: "assets/Diciembre.png" }
  ];

  selectMonth(monthIndex: number) {
    this.monthSelected.emit(monthIndex);
  }
}
