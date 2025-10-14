import { Component,EventEmitter,Input,OnChanges,Output,SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Movement, MovementService } from '../movement.service';

@Component({
  selector: 'app-details-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details-panel.html',
  styleUrl: './details-panel.css'
})
export class DetailsPanel implements OnChanges {
   @Input() selectedDate: string | null = null;
  @Output() movementAdded = new EventEmitter<void>();

  movements: Movement[] = [];
  totalExpenses = 0;
  formattedDate = '';

  private monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  constructor(private movementService: MovementService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] && this.selectedDate) {
      this.loadMovements();
      const date = new Date(this.selectedDate.replace(/-/g, '/'));
      this.formattedDate = `${date.getDate()} de ${this.monthNames[date.getMonth()]}`;
    }
  }

  loadMovements() {
    if (this.selectedDate) {
      this.movements = this.movementService.getMovementsForDay(this.selectedDate);
      this.totalExpenses = this.movements
        .filter(m => m.type === 'expense')
        .reduce((sum, m) => sum + m.amount, 0);
    }
  }

  addMovement(form: NgForm, movementType: 'income' | 'expense') {
    if (form.invalid || !this.selectedDate) return;

    const newMovement: Movement = {
      description: form.value.description,
      amount: form.value.amount,
      type: movementType
    };

    this.movementService.addMovement(this.selectedDate, newMovement);
    this.loadMovements();
    this.movementAdded.emit(); // Avisa al padre que se actualice
    form.resetForm();
  }
}
